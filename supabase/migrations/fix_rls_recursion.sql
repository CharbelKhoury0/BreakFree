-- Fix infinite recursion in profiles RLS policies

-- Drop the problematic admin policy that causes recursion
DROP POLICY IF EXISTS "Admins can update any profile" ON profiles;

-- Create a safer admin policy that doesn't cause recursion
-- This policy uses auth.jwt() to check the role from the JWT token instead of querying the profiles table
CREATE POLICY "Admins can update any profile"
  ON profiles
  FOR ALL
  TO authenticated
  USING (
    -- Check if user is admin using JWT metadata instead of profiles table query
    ((auth.jwt() ->> 'user_metadata')::json ->> 'role' = 'admin')
    OR
    -- Allow users to manage their own profile
    (auth.uid() = id)
  )
  WITH CHECK (
    -- Same check for WITH CHECK clause
    ((auth.jwt() ->> 'user_metadata')::json ->> 'role' = 'admin')
    OR
    (auth.uid() = id)
  );

-- Also fix the blogs admin policy to prevent potential recursion
DROP POLICY IF EXISTS "Admins can manage all blogs" ON blogs;

CREATE POLICY "Admins can manage all blogs"
  ON blogs
  FOR ALL
  TO authenticated
  USING (
    -- Check admin status from JWT instead of profiles table
    ((auth.jwt() ->> 'user_metadata')::json ->> 'role' = 'admin')
    OR
    -- Allow authors to manage their own blogs
    (author_id = auth.uid())
  )
  WITH CHECK (
    ((auth.jwt() ->> 'user_metadata')::json ->> 'role' = 'admin')
    OR
    (author_id = auth.uid())
  );