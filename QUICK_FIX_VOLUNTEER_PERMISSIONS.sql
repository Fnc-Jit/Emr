-- QUICK FIX: Copy and paste this entire script into Supabase SQL Editor and click Run

-- Drop old restrictive policy
DROP POLICY IF EXISTS "Volunteers can view all reports" ON emergency_reports;

-- Create new policy that allows both approved and pending volunteers
CREATE POLICY "Volunteers can view all reports" 
  ON emergency_reports FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM volunteers 
      WHERE user_id = auth.uid() 
      AND is_active = true
    )
  );

-- Drop old verification policy
DROP POLICY IF EXISTS "Volunteers can create verifications" ON report_verifications;

-- Create new policy for volunteers to create verifications
CREATE POLICY "Volunteers can create verifications" 
  ON report_verifications FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM volunteers v
      WHERE v.id = volunteer_id
      AND v.user_id = auth.uid()
      AND v.is_active = true
    )
  );

-- Verify policies were updated
SELECT policyname, cmd FROM pg_policies WHERE tablename IN ('emergency_reports', 'report_verifications') ORDER BY tablename, policyname;
