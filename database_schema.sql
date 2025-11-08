-- ============================================================================
-- Emergency Response App - Complete Database Schema
-- ============================================================================
-- Run this entire file in Supabase SQL Editor to create all tables
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Note: PostGIS extension is optional - only needed if using spatial queries
-- CREATE EXTENSION IF NOT EXISTS postgis;

-- ============================================================================
-- USERS TABLE
-- ============================================================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  full_name VARCHAR(255) NOT NULL,
  profile_picture_url TEXT,
  user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('citizen', 'volunteer', 'responder')),
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE,
  
  preferred_language VARCHAR(2) DEFAULT 'en' CHECK (preferred_language IN ('en', 'hi', 'kn', 'ml')),
  number_of_dependents INTEGER DEFAULT 0,
  vulnerable_tags TEXT[],
  
  default_anonymous_reporting BOOLEAN DEFAULT FALSE,
  default_location_sharing VARCHAR(20) DEFAULT 'coarse' CHECK (default_location_sharing IN ('coarse', 'precise', 'none')),
  share_with_responders BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_users_created_at ON users(created_at);

-- ============================================================================
-- VOLUNTEERS TABLE
-- ============================================================================

CREATE TABLE volunteers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  volunteer_id VARCHAR(50) UNIQUE NOT NULL,
  organization VARCHAR(255),
  certification_url TEXT,
  verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  verified_by UUID REFERENCES users(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  total_verifications INTEGER DEFAULT 0,
  reputation_score INTEGER DEFAULT 0 CHECK (reputation_score >= 0 AND reputation_score <= 100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id)
);

CREATE INDEX idx_volunteers_user_id ON volunteers(user_id);
CREATE INDEX idx_volunteers_verification_status ON volunteers(verification_status);
CREATE INDEX idx_volunteers_volunteer_id ON volunteers(volunteer_id);

-- ============================================================================
-- EMERGENCY REPORTS TABLE
-- ============================================================================

CREATE TABLE emergency_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  
  need_type VARCHAR(20) NOT NULL CHECK (need_type IN ('water', 'medical', 'shelter', 'food', 'other')),
  description TEXT NOT NULL,
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  
  location_type VARCHAR(20) CHECK (location_type IN ('coarse', 'precise')),
  location_address TEXT,
  location_coords JSONB,
  geohash VARCHAR(12),
  
  number_of_dependents INTEGER DEFAULT 0,
  vulnerable_tags TEXT[],
  photo_urls TEXT[],
  
  is_anonymous BOOLEAN DEFAULT FALSE,
  share_with_responders BOOLEAN DEFAULT TRUE,
  share_precise_location BOOLEAN DEFAULT FALSE,
  
  status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('queued', 'submitted', 'verified', 'in_progress', 'resolved', 'duplicate', 'false')),
  verification_count INTEGER DEFAULT 0,
  is_duplicate BOOLEAN DEFAULT FALSE,
  duplicate_of UUID REFERENCES emergency_reports(id),
  
  submission_channel VARCHAR(20) DEFAULT 'web' CHECK (submission_channel IN ('web', 'sms', 'whatsapp', 'ivr')),
  is_offline_submission BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_reports_case_id ON emergency_reports(case_id);
CREATE INDEX idx_reports_user_id ON emergency_reports(user_id);
CREATE INDEX idx_reports_need_type ON emergency_reports(need_type);
CREATE INDEX idx_reports_priority ON emergency_reports(priority);
CREATE INDEX idx_reports_status ON emergency_reports(status);
CREATE INDEX idx_reports_created_at ON emergency_reports(created_at DESC);
CREATE INDEX idx_reports_geohash ON emergency_reports(geohash);

-- ============================================================================
-- REPORT VERIFICATIONS TABLE
-- ============================================================================

CREATE TABLE report_verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID NOT NULL REFERENCES emergency_reports(id) ON DELETE CASCADE,
  volunteer_id UUID NOT NULL REFERENCES volunteers(id) ON DELETE CASCADE,
  
  verification_type VARCHAR(20) NOT NULL CHECK (verification_type IN ('witness', 'photo', 'location', 'duplicate_check')),
  verification_status VARCHAR(20) NOT NULL CHECK (verification_status IN ('confirmed', 'disputed', 'needs_info')),
  notes TEXT,
  photo_urls TEXT[],
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(report_id, volunteer_id)
);

CREATE INDEX idx_verifications_report_id ON report_verifications(report_id);
CREATE INDEX idx_verifications_volunteer_id ON report_verifications(volunteer_id);
CREATE INDEX idx_verifications_created_at ON report_verifications(created_at DESC);

-- ============================================================================
-- SAFETY CHECK-INS TABLE
-- ============================================================================

CREATE TABLE safety_check_ins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  status VARCHAR(20) NOT NULL CHECK (status IN ('safe', 'need_help', 'emergency')),
  location_coords JSONB,
  location_address TEXT,
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_checkins_user_id ON safety_check_ins(user_id);
CREATE INDEX idx_checkins_created_at ON safety_check_ins(created_at DESC);
CREATE INDEX idx_checkins_status ON safety_check_ins(status);

-- ============================================================================
-- NOTIFICATIONS TABLE
-- ============================================================================

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  notification_type VARCHAR(30) NOT NULL CHECK (notification_type IN ('report_status', 'verification', 'emergency_alert', 'check_in_reminder', 'system')),
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  related_entity_id UUID,
  related_entity_type VARCHAR(20) CHECK (related_entity_type IN ('report', 'verification', 'check_in')),
  
  is_read BOOLEAN DEFAULT FALSE,
  is_sent BOOLEAN DEFAULT FALSE,
  sent_via VARCHAR(20) CHECK (sent_via IN ('push', 'sms', 'email')),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- ============================================================================
-- OFFLINE QUEUE TABLE
-- ============================================================================

CREATE TABLE offline_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  action_type VARCHAR(30) NOT NULL CHECK (action_type IN ('create_report', 'update_report', 'create_verification', 'create_checkin')),
  payload JSONB NOT NULL,
  
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'syncing', 'synced', 'failed')),
  retry_count INTEGER DEFAULT 0,
  last_error TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  synced_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_queue_user_id ON offline_queue(user_id);
CREATE INDEX idx_queue_status ON offline_queue(status);
CREATE INDEX idx_queue_created_at ON offline_queue(created_at);

-- ============================================================================
-- AI CHAT HISTORY TABLE
-- ============================================================================

CREATE TABLE ai_chat_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_id UUID NOT NULL,
  
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
  message TEXT NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_chat_user_id ON ai_chat_history(user_id);
CREATE INDEX idx_chat_session_id ON ai_chat_history(session_id);
CREATE INDEX idx_chat_created_at ON ai_chat_history(created_at);

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================================

-- Create trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to tables with updated_at column
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_volunteers_updated_at 
  BEFORE UPDATE ON volunteers 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at 
  BEFORE UPDATE ON emergency_reports 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_verifications_updated_at 
  BEFORE UPDATE ON report_verifications 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE offline_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_history ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" 
  ON users FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON users FOR UPDATE 
  USING (auth.uid() = id);

-- Emergency reports policies
CREATE POLICY "Anyone can create reports" 
  ON emergency_reports FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view own reports" 
  ON emergency_reports FOR SELECT 
  USING (user_id = auth.uid() OR is_anonymous = true);

CREATE POLICY "Users can update own reports" 
  ON emergency_reports FOR UPDATE 
  USING (user_id = auth.uid());

CREATE POLICY "Volunteers can view all reports" 
  ON emergency_reports FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM volunteers 
      WHERE user_id = auth.uid() 
      AND is_active = true
      AND verification_status = 'approved'
    )
  );

-- Report verifications policies
-- Note: In WITH CHECK, unqualified column names refer to the row being inserted
-- We check that the user is an approved volunteer AND the volunteer_id matches
CREATE POLICY "Volunteers can create verifications" 
  ON report_verifications FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM volunteers v
      WHERE v.id = volunteer_id  -- volunteer_id refers to report_verifications.volunteer_id being inserted
      AND v.user_id = auth.uid()
      AND v.verification_status = 'approved'
    )
  );

CREATE POLICY "Anyone can view verifications" 
  ON report_verifications FOR SELECT 
  USING (true);

-- Safety check-ins policies
CREATE POLICY "Users can create own check-ins" 
  ON safety_check_ins FOR INSERT 
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view own check-ins" 
  ON safety_check_ins FOR SELECT 
  USING (user_id = auth.uid());

-- Notifications policies
CREATE POLICY "Users can view own notifications" 
  ON notifications FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications" 
  ON notifications FOR UPDATE 
  USING (user_id = auth.uid());

-- AI Chat policies
CREATE POLICY "Users can view own chat" 
  ON ai_chat_history FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Users can create chat messages" 
  ON ai_chat_history FOR INSERT 
  WITH CHECK (user_id = auth.uid());

-- Offline queue policies
CREATE POLICY "Users can manage own queue" 
  ON offline_queue FOR ALL 
  USING (user_id = auth.uid() OR user_id IS NULL);

-- ============================================================================
-- HELPER FUNCTION: Increment verification count
-- ============================================================================

CREATE OR REPLACE FUNCTION increment_verification_count(report_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE emergency_reports
  SET verification_count = verification_count + 1
  WHERE id = report_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- AUTO-SYNC TRIGGER: Auth Users → Public Users
-- ============================================================================
-- Automatically creates a record in public.users when a new user is added
-- to auth.users (via dashboard, API, or app registration)
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
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- COMPLETE!
-- ============================================================================
-- All tables, indexes, triggers, and RLS policies have been created.
-- The auth user sync trigger will automatically create public.users records
-- when new users are added to auth.users (via dashboard, API, or app).
-- You can now use the application with Supabase!
-- ============================================================================

