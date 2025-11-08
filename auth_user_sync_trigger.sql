-- ============================================================================
-- AUTO-SYNC TRIGGER: Auth Users → Public Users
-- ============================================================================
-- This trigger automatically creates a record in public.users table
-- whenever a new user is added to auth.users (via dashboard, API, or app)
-- ============================================================================
-- Run this in Supabase SQL Editor to enable automatic user syncing
-- ============================================================================

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_type_value VARCHAR(20) := 'citizen'; -- Default to citizen
  full_name_value VARCHAR(255);
  phone_number_value VARCHAR(20);
BEGIN
  -- Extract user_type from raw_user_meta_data, default to 'citizen'
  IF NEW.raw_user_meta_data->>'user_type' IS NOT NULL THEN
    user_type_value := NEW.raw_user_meta_data->>'user_type';
  END IF;
  
  -- Extract full_name from raw_user_meta_data or email
  full_name_value := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    SPLIT_PART(NEW.email, '@', 1) -- Fallback to email username
  );
  
  -- Extract phone_number from raw_user_meta_data
  phone_number_value := NEW.raw_user_meta_data->>'phone_number';
  
  -- Insert into public.users table with the SAME UUID
  INSERT INTO public.users (
    id,  -- Use the same UUID from auth.users
    email,
    phone_number,
    full_name,
    user_type,
    is_verified,
    is_active,
    preferred_language,
    number_of_dependents,
    default_anonymous_reporting,
    default_location_sharing,
    share_with_responders
  ) VALUES (
    NEW.id,  -- Same UUID as auth.users
    NEW.email,
    phone_number_value,
    full_name_value,
    user_type_value,
    COALESCE(NEW.email_confirmed_at IS NOT NULL, false), -- Verified if email confirmed
    true, -- Active by default
    COALESCE(NEW.raw_user_meta_data->>'preferred_language', 'en'),
    0, -- Default dependents
    false, -- Default anonymous reporting
    'coarse', -- Default location sharing
    true -- Share with responders by default
  )
  ON CONFLICT (id) DO NOTHING; -- Prevent errors if user already exists
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users
-- This fires AFTER a new user is inserted into auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- VERIFICATION: Check if trigger is working
-- ============================================================================
-- After running the above, you can test by:
-- 1. Creating a new user in Supabase Dashboard → Authentication → Users
-- 2. Check if a corresponding record appears in public.users table
-- 3. Verify the UUID matches between auth.users and public.users
-- ============================================================================

-- ============================================================================
-- BACKFILL: For existing auth users without public.users records
-- ============================================================================
-- Run this ONCE to create public.users records for existing auth users
-- ============================================================================

INSERT INTO public.users (
  id,
  email,
  phone_number,
  full_name,
  user_type,
  is_verified,
  is_active,
  preferred_language,
  number_of_dependents,
  default_anonymous_reporting,
  default_location_sharing,
  share_with_responders
)
SELECT 
  au.id,  -- Same UUID from auth.users
  au.email,
  au.raw_user_meta_data->>'phone_number',
  COALESCE(
    au.raw_user_meta_data->>'full_name',
    au.raw_user_meta_data->>'name',
    SPLIT_PART(au.email, '@', 1)
  ) as full_name,
  COALESCE(au.raw_user_meta_data->>'user_type', 'citizen') as user_type,
  COALESCE(au.email_confirmed_at IS NOT NULL, false) as is_verified,
  true as is_active,
  COALESCE(au.raw_user_meta_data->>'preferred_language', 'en') as preferred_language,
  0 as number_of_dependents,
  false as default_anonymous_reporting,
  'coarse' as default_location_sharing,
  true as share_with_responders
FROM auth.users au
WHERE NOT EXISTS (
  SELECT 1 FROM public.users u 
  WHERE u.id = au.id OR u.email = au.email
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- DONE!
-- ============================================================================
-- The trigger is now active. Any new user added to auth.users (via dashboard,
-- API, or your app) will automatically get a corresponding record in
-- public.users with the SAME UUID.
-- ============================================================================

