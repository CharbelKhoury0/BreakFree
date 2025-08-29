-- Fix missing INSERT policy for profiles table
-- The handle_new_user() trigger function needs permission to insert new profiles

-- Add INSERT policy for profiles table to allow new user registration
CREATE POLICY "Allow profile creation during signup"
  ON profiles
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Grant necessary permissions to ensure the trigger function works
GRANT INSERT ON profiles TO authenticated;
GRANT INSERT ON profiles TO anon;

-- Ensure the handle_new_user function has proper permissions
GRANT EXECUTE ON FUNCTION handle_new_user() TO authenticated;
GRANT EXECUTE ON FUNCTION handle_new_user() TO anon;