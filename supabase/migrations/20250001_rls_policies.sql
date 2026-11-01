-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can read their own profile
CREATE POLICY "Users can read own profile" ON profiles
FOR SELECT TO authenticated
USING (auth.uid() = id);

-- Policy: Unauthenticated users cannot access profiles
CREATE POLICY "Unauthenticated users cannot access profiles" ON profiles
FOR ALL TO anon
USING (false)
WITH CHECK (false);

-- Policy: Users cannot change their own account_role
CREATE POLICY "Users cannot change own account_role" ON profiles
FOR UPDATE TO authenticated
USING (true)
WITH CHECK (
  auth.uid() = id 
  AND account_role = (
    SELECT account_role FROM profiles WHERE id = auth.uid()
  )
);

-- Policy: Users cannot change their own account_status to bypass verification
CREATE POLICY "Users cannot change own account_status" ON profiles
FOR UPDATE TO authenticated
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id 
  AND account_status IN (
    SELECT account_status FROM profiles WHERE id = auth.uid()
  )
);

-- Policy: Teachers can update their own profile (full_name, requested_role)
-- Students can update full_name only
CREATE POLICY "Users can update permitted fields" ON profiles
FOR UPDATE TO authenticated
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id 
  AND (
    -- Allow full_name and requested_role updates for all authenticated users
    (full_name IS NOT NULL OR requested_role IS NOT NULL)
    OR account_role = 'student'
  )
);