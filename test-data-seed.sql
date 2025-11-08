-- Test Data Seed for Emergency Reports
-- Run this script in Supabase SQL Editor to populate test data

-- IMPORTANT: Clear old test data first to avoid duplicates
DELETE FROM emergency_reports 
WHERE case_id LIKE 'CASE-2024-TEST-%' 
   OR description LIKE 'I am Agam%'
   OR description LIKE 'Jitraj%';

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
  'Critical water shortage in residential area. Multiple families unable to access clean drinking water for past 3 days. Children and elderly at risk of dehydration.',
  'high',
  'coarse',
  'District 5, North Ward',
  '{"lat": 12.9716, "lng": 77.5946}',
  8,
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
  'Pregnant woman in labor needs immediate medical attention. No transportation available. Requires emergency ambulance and hospital admission.',
  'high',
  'coarse',
  'Central Hospital Area',
  '{"lat": 12.9800, "lng": 77.6000}',
  3,
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
  'Displaced family with young children in temporary shelter. No access to food for 48 hours. Urgent need for nutrition and basic supplies.',
  'medium',
  'coarse',
  'Relief Camp, Riverside',
  '{"lat": 12.9750, "lng": 77.5950}',
  6,
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
  'Entire apartment building evacuated due to structural damage. 12 families need emergency shelter and protective equipment. Weather conditions worsening.',
  'high',
  'coarse',
  'East Market District',
  '{"lat": 12.9650, "lng": 77.5900}',
  45,
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
  'Young child suffering from severe respiratory infection and fever. Parents unable to afford treatment. Need urgent medical evaluation and prescribed medications.',
  'medium',
  'coarse',
  'Slum Area, South End',
  '{"lat": 12.9680, "lng": 77.5920}',
  4,
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
