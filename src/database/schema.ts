/**
 * Emergency Response App - Database Schema
 * 
 * This file defines all database tables, relationships, and schema settings
 * for the Emergency Response Citizen & Volunteer App.
 * 
 * Database: PostgreSQL (via Supabase)
 * ORM: Supabase Client
 */

// ============================================================================
// USER MANAGEMENT
// ============================================================================

export interface User {
  id: string; // UUID, primary key
  email: string; // Unique, required for registered users
  phone_number?: string; // Optional, for SMS notifications
  full_name: string;
  profile_picture_url?: string;
  user_type: 'citizen' | 'volunteer' | 'responder'; // User role
  is_verified: boolean; // Email/phone verification status
  is_active: boolean; // Account active status
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  last_login_at?: string; // ISO timestamp
  
  // Profile details
  preferred_language: 'en' | 'hi' | 'kn' | 'ml';
  number_of_dependents: number;
  vulnerable_tags?: string[]; // ['elderly', 'disability', 'medication', 'pregnant', 'children']
  
  // Privacy settings
  default_anonymous_reporting: boolean;
  default_location_sharing: 'coarse' | 'precise' | 'none';
  share_with_responders: boolean;
}

// SQL Schema for users table
export const usersTableSchema = `
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
`;

// ============================================================================
// VOLUNTEER MANAGEMENT
// ============================================================================

export interface Volunteer {
  id: string; // UUID, primary key
  user_id: string; // Foreign key to users.id
  volunteer_id: string; // Unique volunteer identifier (e.g., VOL-2024-001)
  organization?: string; // Organization name if affiliated
  certification_url?: string; // Document verification
  verification_status: 'pending' | 'approved' | 'rejected';
  verified_by?: string; // Admin user ID who verified
  verified_at?: string; // ISO timestamp
  total_verifications: number; // Count of reports verified
  reputation_score: number; // 0-100, based on verification quality
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const volunteersTableSchema = `
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
`;

// ============================================================================
// EMERGENCY REPORTS
// ============================================================================

export interface EmergencyReport {
  id: string; // UUID, primary key
  case_id: string; // Human-readable ID (e.g., CASE-2024-001234)
  user_id?: string; // Null for anonymous reports
  
  // Report details
  need_type: 'water' | 'medical' | 'shelter' | 'food' | 'other';
  description: string; // Micro-update text
  priority: 'low' | 'medium' | 'high' | 'critical'; // AI-assigned or manual
  
  // Location
  location_type: 'coarse' | 'precise';
  location_address?: string; // Coarse location (neighborhood/landmark)
  location_coords?: { lat: number; lng: number }; // Precise GPS
  geohash?: string; // For spatial queries
  
  // Additional info
  number_of_dependents: number;
  vulnerable_tags?: string[];
  photo_urls?: string[]; // Array of compressed photo URLs
  
  // Privacy & sharing
  is_anonymous: boolean;
  share_with_responders: boolean;
  share_precise_location: boolean;
  
  // Status tracking
  status: 'queued' | 'submitted' | 'verified' | 'in_progress' | 'resolved' | 'duplicate' | 'false';
  verification_count: number; // Number of volunteer verifications
  is_duplicate: boolean;
  duplicate_of?: string; // Reference to original report ID
  
  // Metadata
  submission_channel: 'web' | 'sms' | 'whatsapp' | 'ivr';
  is_offline_submission: boolean;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
}

export const emergencyReportsTableSchema = `
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
CREATE INDEX idx_reports_geohash ON emergency_reports USING GIST(geohash);
`;

// ============================================================================
// REPORT VERIFICATIONS
// ============================================================================

export interface ReportVerification {
  id: string;
  report_id: string; // Foreign key to emergency_reports.id
  volunteer_id: string; // Foreign key to volunteers.id
  
  verification_type: 'witness' | 'photo' | 'location' | 'duplicate_check';
  verification_status: 'confirmed' | 'disputed' | 'needs_info';
  notes?: string;
  photo_urls?: string[]; // Verification photos
  
  created_at: string;
  updated_at: string;
}

export const reportVerificationsTableSchema = `
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
`;

// ============================================================================
// SAFETY CHECK-INS
// ============================================================================

export interface SafetyCheckIn {
  id: string;
  user_id: string;
  
  status: 'safe' | 'need_help' | 'emergency';
  location_coords?: { lat: number; lng: number };
  location_address?: string;
  notes?: string;
  
  created_at: string;
}

export const safetyCheckInsTableSchema = `
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
`;

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export interface Notification {
  id: string;
  user_id: string;
  
  notification_type: 'report_status' | 'verification' | 'emergency_alert' | 'check_in_reminder' | 'system';
  title: string;
  message: string;
  related_entity_id?: string; // ID of report, verification, etc.
  related_entity_type?: 'report' | 'verification' | 'check_in';
  
  is_read: boolean;
  is_sent: boolean; // For push/SMS notifications
  sent_via?: 'push' | 'sms' | 'email';
  
  created_at: string;
  read_at?: string;
}

export const notificationsTableSchema = `
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
`;

// ============================================================================
// OFFLINE QUEUE (for sync management)
// ============================================================================

export interface OfflineQueueItem {
  id: string;
  user_id?: string; // Null for anonymous
  
  action_type: 'create_report' | 'update_report' | 'create_verification' | 'create_checkin';
  payload: any; // JSON data for the action
  
  status: 'pending' | 'syncing' | 'synced' | 'failed';
  retry_count: number;
  last_error?: string;
  
  created_at: string;
  synced_at?: string;
}

export const offlineQueueTableSchema = `
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
`;

// ============================================================================
// AI CHAT HISTORY
// ============================================================================

export interface AIChatMessage {
  id: string;
  user_id: string;
  session_id: string; // Group related messages
  
  role: 'user' | 'assistant';
  message: string;
  
  created_at: string;
}

export const aiChatHistoryTableSchema = `
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
`;

// ============================================================================
// DATABASE SETUP FUNCTIONS
// ============================================================================

export const createAllTables = `
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable PostGIS for geospatial queries
CREATE EXTENSION IF NOT EXISTS postgis;

${usersTableSchema}

${volunteersTableSchema}

${emergencyReportsTableSchema}

${reportVerificationsTableSchema}

${safetyCheckInsTableSchema}

${notificationsTableSchema}

${offlineQueueTableSchema}

${aiChatHistoryTableSchema}

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_volunteers_updated_at BEFORE UPDATE ON volunteers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON emergency_reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_verifications_updated_at BEFORE UPDATE ON report_verifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
`;

// ============================================================================
// ROW LEVEL SECURITY (RLS) POLICIES
// ============================================================================

export const setupRowLevelSecurity = `
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE offline_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_history ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Emergency reports policies
CREATE POLICY "Anyone can create reports" ON emergency_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own reports" ON emergency_reports FOR SELECT USING (user_id = auth.uid() OR is_anonymous = true);
CREATE POLICY "Users can update own reports" ON emergency_reports FOR UPDATE USING (user_id = auth.uid());

-- Volunteers can view all reports
CREATE POLICY "Volunteers can view all reports" ON emergency_reports FOR SELECT 
  USING (EXISTS (SELECT 1 FROM volunteers WHERE user_id = auth.uid() AND is_active = true));

-- Verifications
CREATE POLICY "Volunteers can create verifications" ON report_verifications FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM volunteers WHERE user_id = auth.uid() AND is_active = true));
CREATE POLICY "Anyone can view verifications" ON report_verifications FOR SELECT USING (true);

-- Check-ins
CREATE POLICY "Users can create own check-ins" ON safety_check_ins FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can view own check-ins" ON safety_check_ins FOR SELECT USING (user_id = auth.uid());

-- Notifications
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (user_id = auth.uid());

-- AI Chat
CREATE POLICY "Users can view own chat" ON ai_chat_history FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create chat messages" ON ai_chat_history FOR INSERT WITH CHECK (user_id = auth.uid());
`;

// ============================================================================
// SAMPLE DATA FOR TESTING
// ============================================================================

export const sampleData = `
-- Insert sample users
INSERT INTO users (email, full_name, user_type, is_verified, preferred_language) VALUES
  ('user@example.com', 'John Doe', 'citizen', true, 'en'),
  ('volunteer@example.com', 'Jane Smith', 'volunteer', true, 'en'),
  ('responder@example.com', 'Emergency Response Team', 'responder', true, 'en');

-- Insert sample volunteer
INSERT INTO volunteers (user_id, volunteer_id, verification_status, total_verifications, reputation_score)
  SELECT id, 'VOL-2024-001', 'approved', 47, 85 
  FROM users WHERE email = 'volunteer@example.com';
`;
