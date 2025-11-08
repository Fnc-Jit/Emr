-- Test Data Seed for Emergency Reports
-- Run this script in Supabase SQL Editor to populate test data

-- Insert test reports with status 'submitted' or 'queued' for volunteers to verify

INSERT INTO emergency_reports (
  case_id,
  user_id,
  need_type,
  description,
  priority,
  location_type,
  location_address,
  location_coords,
  number_of_dependents,
  is_anonymous,
  share_with_responders,
  share_precise_location,
  status,
  verification_count,
  is_duplicate,
  submission_channel,
  is_offline_submission,
  created_at,
  updated_at
) VALUES
-- Test Report 1: Water - High Priority
(
  'CASE-2024-TEST-001',
  NULL,
  'water',
  'Urgent water supply needed for 5 families in the area. Immediate assistance required.',
  'high',
  'coarse',
  'Demo Location 1, City Center',
  '{"lat": 12.9716, "lng": 77.5946}',
  5,
  false,
  true,
  false,
  'submitted',
  0,
  false,
  'web',
  false,
  NOW(),
  NOW()
),
-- Test Report 2: Medical - High Priority
(
  'CASE-2024-TEST-002',
  NULL,
  'medical',
  'Elderly person needs medication and medical attention. Family unable to reach hospital.',
  'high',
  'coarse',
  'Demo Location 2, City',
  '{"lat": 12.9800, "lng": 77.6000}',
  2,
  false,
  true,
  false,
  'submitted',
  0,
  false,
  'web',
  false,
  NOW() - INTERVAL '1 hour',
  NOW() - INTERVAL '1 hour'
),
-- Test Report 3: Food - Medium Priority
(
  'CASE-2024-TEST-003',
  NULL,
  'food',
  'Family of 4 needs food supplies. Children haven''t eaten in 2 days.',
  'medium',
  'coarse',
  'Demo Location 3, City',
  '{"lat": 12.9750, "lng": 77.5950}',
  4,
  false,
  true,
  false,
  'queued',
  0,
  false,
  'web',
  false,
  NOW() - INTERVAL '2 hours',
  NOW() - INTERVAL '2 hours'
),
-- Test Report 4: Shelter - High Priority
(
  'CASE-2024-TEST-004',
  NULL,
  'shelter',
  'Family lost their home. Need temporary shelter and basic supplies.',
  'high',
  'coarse',
  'Demo Location 4, City',
  '{"lat": 12.9650, "lng": 77.5900}',
  3,
  false,
  true,
  false,
  'submitted',
  0,
  false,
  'web',
  false,
  NOW() - INTERVAL '3 hours',
  NOW() - INTERVAL '3 hours'
),
-- Test Report 5: Medical - Medium Priority
(
  'CASE-2024-TEST-005',
  NULL,
  'medical',
  'Child with fever needs medical consultation and medicine.',
  'medium',
  'coarse',
  'Demo Location 5, City',
  '{"lat": 12.9680, "lng": 77.5920}',
  1,
  true,
  true,
  false,
  'submitted',
  0,
  false,
  'web',
  false,
  NOW() - INTERVAL '30 minutes',
  NOW() - INTERVAL '30 minutes'
);

-- Verify the data was inserted
SELECT 
  case_id,
  need_type,
  priority,
  status,
  location_address,
  created_at
FROM emergency_reports
WHERE case_id LIKE 'CASE-2024-TEST-%'
ORDER BY priority DESC, created_at DESC;
