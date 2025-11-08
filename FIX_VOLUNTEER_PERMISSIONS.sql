-- ============================================================================
-- FIX VOLUNTEER PERMISSIONS TO VIEW REPORTS
-- ============================================================================
-- Run this script in Supabase SQL Editor to enable volunteers to view reports

-- ISSUE: Volunteers with pending status cannot see reports due to RLS policy
-- SOLUTION: Update the RLS policy to also allow pending volunteers to view reports

-- Step 1: Drop the existing restrictive policy
DROP POLICY IF EXISTS "Volunteers can view all reports" ON emergency_reports;

-- Step 2: Create a new permissive policy that allows:
-- - Approved volunteers (verification_status = 'approved')
-- - Pending volunteers (verification_status = 'pending') - TO VIEW AND TEST
-- - Active volunteers (is_active = true)
CREATE POLICY "Volunteers can view all reports" 
  ON emergency_reports FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM volunteers 
      WHERE user_id = auth.uid() 
      AND is_active = true
      -- Remove restriction on approval status to allow pending volunteers to view
      -- AND verification_status = 'approved'
    )
  );

-- Step 3: Verify the policy was created
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  cmd
FROM pg_policies 
WHERE tablename = 'emergency_reports' 
AND policyname LIKE '%Volunteers%';

-- ============================================================================
-- ALTERNATIVE: For even more permissive access during testing
-- ============================================================================
-- If you want to allow ANY authenticated user to view reports temporarily:
-- 
-- DROP POLICY IF EXISTS "Volunteers can view all reports" ON emergency_reports;
-- 
-- CREATE POLICY "Anyone authenticated can view reports" 
--   ON emergency_reports FOR SELECT 
--   USING (auth.uid() IS NOT NULL);
--
-- This makes reports visible to any logged-in user (not just volunteers)
-- COMMENT OUT THIS IF SECTION AFTER TESTING

-- ============================================================================
-- Also fix the verification creation policy
-- ============================================================================
DROP POLICY IF EXISTS "Volunteers can create verifications" ON report_verifications;

CREATE POLICY "Volunteers can create verifications" 
  ON report_verifications FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM volunteers v
      WHERE v.id = volunteer_id
      AND v.user_id = auth.uid()
      AND v.is_active = true
      -- Allow pending volunteers to create verifications
      -- AND v.verification_status = 'approved'
    )
  );

-- Verify the policy was created
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  cmd
FROM pg_policies 
WHERE tablename = 'report_verifications' 
AND policyname LIKE '%create%';

-- ============================================================================
-- Verify all emergency_reports policies
-- ============================================================================
SELECT 
  policyname, 
  permissive, 
  cmd
FROM pg_policies 
WHERE tablename = 'emergency_reports'
ORDER BY policyname;
