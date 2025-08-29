# Blog CMS System - Complete Documentation

This document provides comprehensive information about the BreakFree Blog CMS system to enable building a separate dashboard project.

## 1. Database Schema

### 1.1 Tables Structure

#### Profiles Table
```sql
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

#### Blogs Table
```sql
CREATE TABLE blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  slug text UNIQUE NOT NULL,
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  published boolean DEFAULT false,
  featured_image text,
  tags text[] DEFAULT '{}',
  meta_title text,
  meta_description text,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 1.2 Database Functions

#### Auto-update Timestamp
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';
```

#### User Registration Handler
```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;
```

#### View Count Increment
```sql
CREATE OR REPLACE FUNCTION increment_blog_views(blog_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE blogs SET view_count = view_count + 1 WHERE id = blog_id;
END;
$$ language 'plpgsql';
```

#### Slug Generation
```sql
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
```

### 1.3 Indexes
```sql
CREATE INDEX idx_blogs_author_id ON blogs(author_id);
CREATE INDEX idx_blogs_published ON blogs(published);
CREATE INDEX idx_blogs_created_at ON blogs(created_at DESC);
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_tags ON blogs USING GIN(tags);
CREATE INDEX idx_profiles_role ON profiles(role);
```

## 2. Row Level Security (RLS) Policies

### 2.1 Profiles Policies
```sql
-- Users can view all profiles
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT TO authenticated USING (true);

-- Users can update own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Admins can update any profile
CREATE POLICY "Admins can update any profile"
  ON profiles FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
```

### 2.2 Blogs Policies
```sql
-- Anyone can view published blogs
CREATE POLICY "Anyone can view published blogs"
  ON blogs FOR SELECT TO anon, authenticated USING (published = true);

-- Authors can view their own blogs
CREATE POLICY "Authors can view their own blogs"
  ON blogs FOR SELECT TO authenticated USING (author_id = auth.uid());

-- Authenticated users can create blogs
CREATE POLICY "Authenticated users can create blogs"
  ON blogs FOR INSERT TO authenticated WITH CHECK (author_id = auth.uid());

-- Authors can update their own blogs
CREATE POLICY "Authors can update their own blogs"
  ON blogs FOR UPDATE TO authenticated
  USING (author_id = auth.uid()) WITH CHECK (author_id = auth.uid());

-- Authors can delete their own blogs
CREATE POLICY "Authors can delete their own blogs"
  ON blogs FOR DELETE TO authenticated USING (author_id = auth.uid());

-- Admins can manage all blogs
CREATE POLICY "Admins can manage all blogs"
  ON blogs FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
```

## 3. TypeScript Types and Interfaces

### 3.1 Database Types
```typescript
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: 'user' | 'admin';
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: 'user' | 'admin';
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: 'user' | 'admin';
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      blogs: {
        Row: {
          id: string;
          title: string;
          content: string;
          excerpt: string | null;
          author_id: string;
          published: boolean;
          featured_image: string | null;
          tags: string[];
          meta_title: string | null;
          meta_description: string | null;
          view_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          excerpt?: string | null;
          author_id: string;
          published?: boolean;
          featured_image?: string | null;
          tags?: string[];
          meta_title?: string | null;
          meta_description?: string | null;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          excerpt?: string | null;
          author_id?: string;
          published?: boolean;
          featured_image?: string | null;
          tags?: string[];
          meta_title?: string | null;
          meta_description?: string | null;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Functions: {
      increment_blog_views: {
        Args: { blog_id: string };
        Returns: void;
      };
    };
  };
}

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Blog = Database['public']['Tables']['blogs']['Row'];
export type BlogInsert = Database['public']['Tables']['blogs']['Insert'];
export type BlogUpdate = Database['public']['Tables']['blogs']['Update'];

export interface BlogWithAuthor extends Blog {
  profiles: Profile;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface BlogFilters {
  published?: boolean;
  authorId?: string;
  tags?: string[];
  search?: string;
}
```

## 4. API Endpoints and Service Methods

### 4.1 Blog Service Class

#### Create Blog
```typescript
static async createBlog(blogData: Omit<BlogInsert, 'author_id'>): Promise<{ data: Blog | null; error: any }>
```
**Usage:**
```typescript
const result = await BlogService.createBlog({
  title: "My Blog Post",
  content: "Blog content here...",
  excerpt: "Brief description",
  published: false,
  tags: ["tech", "programming"],
  meta_title: "SEO Title",
  meta_description: "SEO Description"
});
```

#### Update Blog
```typescript
static async updateBlog(id: string, updates: BlogUpdate): Promise<{ data: Blog | null; error: any }>
```
**Usage:**
```typescript
const result = await BlogService.updateBlog(blogId, {
  title: "Updated Title",
  published: true
});
```

#### Delete Blog
```typescript
static async deleteBlog(id: string): Promise<{ error: any }>
```
**Usage:**
```typescript
const result = await BlogService.deleteBlog(blogId);
```

#### Get Blog by ID
```typescript
static async getBlogById(id: string, incrementViews = false): Promise<{ data: BlogWithAuthor | null; error: any }>
```
**Usage:**
```typescript
const result = await BlogService.getBlogById(blogId, true); // true to increment views
```

#### Get Paginated Blogs
```typescript
static async getBlogs(
  page = 1,
  pageSize = 10,
  filters: BlogFilters = {}
): Promise<{ data: PaginatedResponse<BlogWithAuthor> | null; error: any }>
```
**Usage:**
```typescript
const result = await BlogService.getBlogs(1, 10, {
  published: true,
  search: "react",
  tags: ["programming"],
  authorId: "user-uuid"
});
```

#### Get User's Blogs
```typescript
static async getUserBlogs(
  page = 1,
  pageSize = 10
): Promise<{ data: PaginatedResponse<BlogWithAuthor> | null; error: any }>
```

#### Get Published Blogs (Public)
```typescript
static async getPublishedBlogs(
  page = 1,
  pageSize = 10,
  search?: string,
  tags?: string[]
): Promise<{ data: PaginatedResponse<BlogWithAuthor> | null; error: any }>
```

#### Get All Tags
```typescript
static async getAllTags(): Promise<{ data: string[] | null; error: any }>
```

#### Search Blogs
```typescript
static async searchBlogs(
  query: string,
  page = 1,
  pageSize = 10
): Promise<{ data: PaginatedResponse<BlogWithAuthor> | null; error: any }>
```

### 4.2 Authentication Service

#### Sign Up
```typescript
static async signUp(email: string, password: string, fullName?: string): Promise<AuthResponse>
```

#### Sign In
```typescript
static async signIn(email: string, password: string): Promise<AuthResponse>
```

#### Sign Out
```typescript
static async signOut(): Promise<{ error: any }>
```

#### Get Current User
```typescript
static async getCurrentUser(): Promise<{ user: User | null; error: any }>
```

#### Get User Profile
```typescript
static async getUserProfile(userId?: string): Promise<ProfileResponse>
```

#### Update Profile
```typescript
static async updateProfile(updates: Partial<Profile>): Promise<ProfileResponse>
```

#### Check Admin Status
```typescript
static async isAdmin(): Promise<{ isAdmin: boolean; error: any }>
```

## 5. Component Architecture

### 5.1 BlogEditor Component

**Props:**
```typescript
interface BlogEditorProps {
  blog?: Blog;
  onSave?: (blog: Blog) => void;
  onCancel?: () => void;
}
```

**Features:**
- Rich text editing with preview mode
- SEO fields (meta title, meta description)
- Tag management with add/remove functionality
- Featured image URL input
- Draft/Publish workflow
- Auto-save functionality
- Form validation
- Error handling and success notifications

**Key Form Fields:**
- Title (required)
- Content (required, textarea with 15 rows)
- Excerpt (optional)
- Featured Image URL
- Tags (array, add with Enter key)
- Meta Title (SEO)
- Meta Description (SEO)
- Published status (boolean)

### 5.2 BlogList Component

**Props:**
```typescript
interface BlogListProps {
  showActions?: boolean;
  onEdit?: (blog: BlogWithAuthor) => void;
  onDelete?: (blog: BlogWithAuthor) => void;
  onCreate?: () => void;
}
```

**Features:**
- Paginated blog listing
- Search functionality
- Tag filtering
- Author information display
- View count display
- Admin actions (edit/delete)
- Responsive design
- Loading states

### 5.3 BlogManagement Page

**Features:**
- Three view states: list, create, edit
- Navigation between views
- Authentication checks
- Admin permission validation
- Integrated BlogEditor and BlogList components

## 6. Authentication and Authorization

### 6.1 User Roles
- **user**: Can create, edit, and delete their own blogs
- **admin**: Can manage all blogs and user profiles

### 6.2 Permission Checks
```typescript
// Check if user can edit blog
const isOwner = blog.author_id === user.id;
const isAdmin = userProfile.data?.role === 'admin';
const canEdit = isOwner || isAdmin;
```

### 6.3 Protected Routes
- Blog creation/editing requires authentication
- Admin functions require admin role
- RLS policies enforce database-level security

## 7. SEO and Metadata

### 7.1 SEO Fields
- **meta_title**: Custom SEO title (defaults to blog title)
- **meta_description**: SEO description for search engines
- **slug**: URL-friendly identifier (auto-generated from title)
- **featured_image**: Social media and preview image

### 7.2 URL Structure
- Blog detail: `/blog/{slug}`
- Blog list: `/blog`
- Admin management: `/admin/blogs`

## 8. File Upload and Image Management

### 8.1 Current Implementation
- Featured images via URL input
- No direct file upload (can be extended with Supabase Storage)

### 8.2 Extension Options
```typescript
// Supabase Storage integration example
const uploadImage = async (file: File) => {
  const { data, error } = await supabase.storage
    .from('blog-images')
    .upload(`${Date.now()}-${file.name}`, file);
  
  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from('blog-images')
    .getPublicUrl(data.path);
  
  return publicUrl;
};
```

## 9. Search and Filtering

### 9.1 Search Implementation
- Full-text search across title, content, and excerpt
- Case-insensitive matching
- PostgreSQL `ilike` operator

### 9.2 Filter Options
- **Published status**: Draft vs Published
- **Author**: Filter by specific author
- **Tags**: Multiple tag filtering with overlap
- **Search query**: Text-based search

### 9.3 Search Query Example
```sql
SELECT * FROM blogs 
WHERE title ILIKE '%search%' 
   OR content ILIKE '%search%' 
   OR excerpt ILIKE '%search%'
   AND published = true
   AND tags && ARRAY['tag1', 'tag2'];
```

## 10. Pagination System

### 10.1 Pagination Response
```typescript
interface PaginatedResponse<T> {
  data: T[];           // Current page items
  count: number;       // Total items
  page: number;        // Current page
  pageSize: number;    // Items per page
  totalPages: number;  // Total pages
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
```

### 10.2 Implementation
```typescript
const from = (page - 1) * pageSize;
const to = from + pageSize - 1;

const { data, error, count } = await supabase
  .from('blogs')
  .select('*', { count: 'exact' })
  .range(from, to)
  .order('created_at', { ascending: false });
```

## 11. View Tracking System

### 11.1 Implementation
- View count stored in `view_count` column
- Incremented via `increment_blog_views()` function
- Only counts views on published blogs
- Called when blog is viewed with `incrementViews: true`

### 11.2 Usage
```typescript
// Increment views when blog is read
const blog = await BlogService.getBlogById(id, true);
```

## 12. Draft/Publish Workflow

### 12.1 States
- **Draft**: `published: false` - Only visible to author and admins
- **Published**: `published: true` - Publicly visible

### 12.2 Workflow Actions
- **Save Draft**: Save without publishing
- **Publish**: Make blog publicly available
- **Unpublish**: Revert to draft state

## 13. Tag System

### 13.1 Implementation
- Tags stored as PostgreSQL array (`text[]`)
- Case-insensitive tag matching
- GIN index for efficient tag queries
- Tag filtering with array overlap operator

### 13.2 Tag Management
```typescript
// Add tag
const addTag = (newTag: string) => {
  if (!formData.tags?.includes(newTag.toLowerCase())) {
    setFormData(prev => ({
      ...prev,
      tags: [...(prev.tags || []), newTag.toLowerCase()]
    }));
  }
};

// Remove tag
const removeTag = (tagToRemove: string) => {
  setFormData(prev => ({
    ...prev,
    tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
  }));
};
```

## 14. Error Handling

### 14.1 Service Layer
- All service methods return `{ data, error }` pattern
- Consistent error handling across all operations
- Authentication checks before operations
- Permission validation

### 14.2 UI Error Handling
- Form validation errors
- Network error handling
- User-friendly error messages
- Loading states during operations

## 15. Security Considerations

### 15.1 Database Security
- Row Level Security (RLS) enabled
- Policies enforce user permissions
- SQL injection prevention via parameterized queries
- Automatic user profile creation

### 15.2 Authentication Security
- Supabase Auth handles password hashing
- JWT tokens for session management
- Automatic token refresh
- Secure password reset flow

### 15.3 Content Security
- Input sanitization for blog content
- XSS prevention (framework-level)
- CSRF protection via Supabase

## 16. Performance Optimization

### 16.1 Database Optimization
- Strategic indexes on frequently queried columns
- Pagination to limit data transfer
- Efficient tag queries with GIN indexes
- View count optimization with dedicated function

### 16.2 Frontend Optimization
- Lazy loading of blog content
- Debounced search queries
- Optimistic UI updates
- Efficient re-rendering with React keys

## 17. Deployment Configuration

### 17.1 Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 17.2 Supabase Configuration
- Database migrations in `supabase/migrations/`
- RLS policies configured
- Auth settings configured
- API rate limiting (if needed)

## 18. Extension Points for Dashboard

### 18.1 Analytics Dashboard
- Blog view statistics
- Popular tags analysis
- Author performance metrics
- Content engagement tracking

### 18.2 Content Management
- Bulk operations (publish/unpublish)
- Content moderation tools
- SEO analysis and suggestions
- Content scheduling

### 18.3 User Management
- Role assignment interface
- User activity tracking
- Permission management
- Author onboarding

### 18.4 Advanced Features
- Rich text editor (WYSIWYG)
- Image upload and management
- Content versioning
- Comment system
- Social media integration
- Email notifications

This documentation provides all the necessary information to build a comprehensive blog CMS dashboard, including database schema, API endpoints, authentication, security, and extension points for advanced features.