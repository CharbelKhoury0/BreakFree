-- Fix permissions for profiles table
-- Grant necessary permissions to anon and authenticated roles

-- Grant INSERT permission to authenticated users for profiles table
GRANT INSERT ON profiles TO authenticated;

-- Grant SELECT permission to authenticated users for profiles table
GRANT SELECT ON profiles TO authenticated;

-- Grant UPDATE permission to authenticated users for profiles table
GRANT UPDATE ON profiles TO authenticated;

-- Grant DELETE permission to authenticated users for profiles table
GRANT DELETE ON profiles TO authenticated;

-- Grant permissions for blogs table
GRANT ALL PRIVILEGES ON blogs TO authenticated;

-- Grant SELECT permission to anon users for published blogs
GRANT SELECT ON blogs TO anon;

-- Grant usage on sequences (if any)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Ensure the trigger function has proper permissions
GRANT EXECUTE ON FUNCTION handle_new_user() TO authenticated;
GRANT EXECUTE ON FUNCTION generate_slug(text) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_blog_views(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_blog_views(uuid) TO anon;

-- Check current permissions (for debugging)
-- SELECT grantee, table_name, privilege_type 
-- FROM information_schema.role_table_grants 
-- WHERE table_schema = 'public' 
-- AND grantee IN ('anon', 'authenticated') 
-- ORDER BY table_name, g