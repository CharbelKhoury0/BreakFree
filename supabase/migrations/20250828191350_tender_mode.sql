/*
  # Complete BreakFree Database Setup

  1. New Tables
    - `profiles` - User profile information linked to Supabase auth
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text, optional)
      - `role` (text, default 'user', check constraint for 'user'|'admin')
      - `avatar_url` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `blogs` - Blog posts with full CMS features
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `excerpt` (text, optional)
      - `slug` (text, unique)
      - `author_id` (uuid, references profiles)
      - `published` (boolean, default false)
      - `featured_image` (text, optional)
      - `tags` (text array)
      - `meta_title` (text, optional)
      - `meta_description` (text, optional)
      - `view_count` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Functions
    - `update_updated_at_column()` - Trigger function for automatic timestamp updates
    - `handle_new_user()` - Trigger function for automatic profile creation
    - `generate_slug()` - Function to generate URL-friendly slugs
    - `increment_blog_views()` - Function to safely increment view counts

  3. Security
    - Enable RLS on all tables
    - Profiles: Users can read all, update own, admins can update any
    - Blogs: Public can read published, authors can manage own, admins can manage all

  4. Triggers
    - Auto-update timestamps on row changes
    - Auto-create profile on user signup
*/

-- Create update_updated_at_column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create handle_new_user function for automatic profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Create generate_slug function
CREATE OR REPLACE FUNCTION generate_slug(title text)
RETURNS text AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(
        regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
        '\s+', '-', 'g'
      ),
      '-+', '-', 'g'
    )
  );
END;
$$ language 'plpgsql';

-- Create increment_blog_views function
CREATE OR REPLACE FUNCTION increment_blog_views(blog_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE blogs 
  SET view_count = view_count + 1 
  WHERE id = blog_id;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  slug text UNIQUE NOT NULL,
  author_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  published boolean DEFAULT false,
  featured_image text,
  tags text[] DEFAULT '{}',
  meta_title text,
  meta_description text,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_blogs_author_id ON blogs(author_id);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_tags ON blogs USING gin(tags);

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can update any profile"
  ON profiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for blogs
CREATE POLICY "Anyone can view published blogs"
  ON blogs
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE POLICY "Authors can view their own blogs"
  ON blogs
  FOR SELECT
  TO authenticated
  USING (author_id = auth.uid());

CREATE POLICY "Authenticated users can create blogs"
  ON blogs
  FOR INSERT
  TO authenticated
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Authors can update their own blogs"
  ON blogs
  FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Authors can delete their own blogs"
  ON blogs
  FOR DELETE
  TO authenticated
  USING (author_id = auth.uid());

CREATE POLICY "Admins can manage all blogs"
  ON blogs
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();