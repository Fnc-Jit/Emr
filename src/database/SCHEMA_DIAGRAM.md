# Database Schema Diagram

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          EMERGENCY RESPONSE DATABASE                            │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────┐
│           USERS                 │
│─────────────────────────────────│
│ id (PK)                   UUID  │
│ email                     TEXT  │◄─────┐
│ phone_number             TEXT   │      │
│ full_name                TEXT   │      │
│ profile_picture_url      TEXT   │      │
│ user_type                TEXT   │      │ One-to-Many
│ is_verified              BOOL   │      │
│ is_active                BOOL   │      │
│ preferred_language       TEXT   │      │
│ number_of_dependents     INT    │      │
│ vulnerable_tags          TEXT[] │      │
│ privacy_settings         JSONB  │      │
│ created_at               TIME   │      │
│ updated_at               TIME   │      │
└───────────┬─────────────────────┘      │
            │                            │
            │ One-to-One                 │
            │                            │
            ▼                            │
┌─────────────────────────────────┐      │
│        VOLUNTEERS               │      │
│─────────────────────────────────│      │
│ id (PK)                   UUID  │      │
│ user_id (FK) (UNIQUE)     UUID  ├──────┘
│ volunteer_id (UNIQUE)     TEXT  │
│ organization              TEXT  │
│ certification_url         TEXT  │
│ verification_status       TEXT  │
│ verified_by               UUID  │
│ verified_at               TIME  │
│ total_verifications       INT   │
│ reputation_score          INT   │
│ is_active                 BOOL  │
│ created_at                TIME  │
│ updated_at                TIME  │
└───────────┬─────────────────────┘
            │
            │ One-to-Many
            │
            ▼
┌─────────────────────────────────┐
│    REPORT_VERIFICATIONS         │
│─────────────────────────────────│      ┌─────────────────────────────────┐
│ id (PK)                   UUID  │      │    EMERGENCY_REPORTS            │
│ report_id (FK)            UUID  ├──────┤─────────────────────────────────│
│ volunteer_id (FK)         UUID  │      │ id (PK)                   UUID  │
│ verification_type         TEXT  │      │ case_id (UNIQUE)          TEXT  │
│ verification_status       TEXT  │      │ user_id (FK) (NULLABLE)   UUID  ├──┐
│ notes                     TEXT  │      │ need_type                 TEXT  │  │
│ photo_urls                TEXT[]│      │ description               TEXT  │  │
│ created_at                TIME  │      │ priority                  TEXT  │  │
│ updated_at                TIME  │      │ location_type             TEXT  │  │
└─────────────────────────────────┘      │ location_address          TEXT  │  │
                                         │ location_coords           JSONB │  │
                                         │ geohash                   TEXT  │  │
                                         │ number_of_dependents      INT   │  │
                                         │ vulnerable_tags           TEXT[]│  │
                                         │ photo_urls                TEXT[]│  │
                                         │ is_anonymous              BOOL  │  │
                                         │ share_with_responders     BOOL  │  │
                                         │ share_precise_location    BOOL  │  │
                                         │ status                    TEXT  │  │
                                         │ verification_count        INT   │  │
                                         │ is_duplicate              BOOL  │  │
                                         │ duplicate_of (FK)         UUID  │  │
                                         │ submission_channel        TEXT  │  │
                                         │ is_offline_submission     BOOL  │  │
                                         │ created_at                TIME  │  │
                                         │ updated_at                TIME  │  │
                                         │ resolved_at               TIME  │  │
                                         └───────────┬─────────────────────┘  │
                                                     │                        │
                                                     │ Self-Referencing       │
                                                     │ (duplicate_of)         │
                                                     └────────────────────────┘
                                                     
                                                     │
                                                     │ One-to-Many
                                                     │ (user_id → users.id)
                                                     │
┌─────────────────────────────────┐                 │
│      SAFETY_CHECK_INS           │                 │
│─────────────────────────────────│                 │
│ id (PK)                   UUID  │                 │
│ user_id (FK)              UUID  ├─────────────────┘
│ status                    TEXT  │
│ location_coords           JSONB │
│ location_address          TEXT  │
│ notes                     TEXT  │
│ created_at                TIME  │
└─────────────────────────────────┘
                                    
┌─────────────────────────────────┐
│       NOTIFICATIONS             │
│─────────────────────────────────│
│ id (PK)                   UUID  │
│ user_id (FK)              UUID  ├─────────────────┐
│ notification_type         TEXT  │                 │
│ title                     TEXT  │                 │
│ message                   TEXT  │                 │
│ related_entity_id         UUID  │                 │
│ related_entity_type       TEXT  │                 │
│ is_read                   BOOL  │                 │
│ is_sent                   BOOL  │                 │
│ sent_via                  TEXT  │                 │
│ created_at                TIME  │                 │
│ read_at                   TIME  │                 │
└─────────────────────────────────┘                 │
                                                    │
                                                    │
┌─────────────────────────────────┐                 │
│       OFFLINE_QUEUE             │                 │
│─────────────────────────────────│                 │
│ id (PK)                   UUID  │                 │
│ user_id (FK) (NULLABLE)   UUID  ├─────────────────┘
│ action_type               TEXT  │
│ payload                   JSONB │
│ status                    TEXT  │
│ retry_count               INT   │
│ last_error                TEXT  │
│ created_at                TIME  │
│ synced_at                 TIME  │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│      AI_CHAT_HISTORY            │
│─────────────────────────────────│
│ id (PK)                   UUID  │
│ user_id (FK)              UUID  ├─────────────────┘
│ session_id                UUID  │
│ role                      TEXT  │
│ message                   TEXT  │
│ created_at                TIME  │
└─────────────────────────────────┘
```

## Relationships Summary

### One-to-One Relationships
- `users` ↔ `volunteers` (One user can be one volunteer)

### One-to-Many Relationships
- `users` → `emergency_reports` (One user can create many reports)
- `users` → `safety_check_ins` (One user can have many check-ins)
- `users` → `notifications` (One user can receive many notifications)
- `users` → `offline_queue` (One user can have many queued items)
- `users` → `ai_chat_history` (One user can have many chat messages)
- `volunteers` → `report_verifications` (One volunteer can verify many reports)
- `emergency_reports` → `report_verifications` (One report can have many verifications)

### Self-Referencing
- `emergency_reports.duplicate_of` → `emergency_reports.id` (A report can be duplicate of another report)

### Nullable Foreign Keys
- `emergency_reports.user_id` - NULL for anonymous reports
- `offline_queue.user_id` - NULL for anonymous queued items

## Indexes

### Primary Indexes (Automatic)
All `id` fields are primary keys with automatic indexes.

### Secondary Indexes

#### Users Table
```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_users_created_at ON users(created_at);
```

#### Volunteers Table
```sql
CREATE INDEX idx_volunteers_user_id ON volunteers(user_id);
CREATE INDEX idx_volunteers_verification_status ON volunteers(verification_status);
CREATE INDEX idx_volunteers_volunteer_id ON volunteers(volunteer_id);
```

#### Emergency Reports Table
```sql
CREATE INDEX idx_reports_case_id ON emergency_reports(case_id);
CREATE INDEX idx_reports_user_id ON emergency_reports(user_id);
CREATE INDEX idx_reports_need_type ON emergency_reports(need_type);
CREATE INDEX idx_reports_priority ON emergency_reports(priority);
CREATE INDEX idx_reports_status ON emergency_reports(status);
CREATE INDEX idx_reports_created_at ON emergency_reports(created_at DESC);
CREATE INDEX idx_reports_geohash ON emergency_reports USING GIST(geohash);
```

#### Report Verifications Table
```sql
CREATE INDEX idx_verifications_report_id ON report_verifications(report_id);
CREATE INDEX idx_verifications_volunteer_id ON report_verifications(volunteer_id);
CREATE INDEX idx_verifications_created_at ON report_verifications(created_at DESC);
```

#### Other Tables
```sql
-- Safety Check-ins
CREATE INDEX idx_checkins_user_id ON safety_check_ins(user_id);
CREATE INDEX idx_checkins_created_at ON safety_check_ins(created_at DESC);
CREATE INDEX idx_checkins_status ON safety_check_ins(status);

-- Notifications
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- Offline Queue
CREATE INDEX idx_queue_user_id ON offline_queue(user_id);
CREATE INDEX idx_queue_status ON offline_queue(status);
CREATE INDEX idx_queue_created_at ON offline_queue(created_at);

-- AI Chat History
CREATE INDEX idx_chat_user_id ON ai_chat_history(user_id);
CREATE INDEX idx_chat_session_id ON ai_chat_history(session_id);
CREATE INDEX idx_chat_created_at ON ai_chat_history(created_at);
```

## Constraints

### Unique Constraints
- `users.email` - Each email must be unique
- `volunteers.user_id` - One user can only have one volunteer profile
- `volunteers.volunteer_id` - Each volunteer ID is unique
- `emergency_reports.case_id` - Each case ID is unique
- `report_verifications(report_id, volunteer_id)` - One volunteer can only verify a report once

### Check Constraints

#### Users
```sql
CHECK (user_type IN ('citizen', 'volunteer', 'responder'))
CHECK (preferred_language IN ('en', 'hi', 'kn', 'ml'))
CHECK (default_location_sharing IN ('coarse', 'precise', 'none'))
```

#### Volunteers
```sql
CHECK (verification_status IN ('pending', 'approved', 'rejected'))
CHECK (reputation_score >= 0 AND reputation_score <= 100)
```

#### Emergency Reports
```sql
CHECK (need_type IN ('water', 'medical', 'shelter', 'food', 'other'))
CHECK (priority IN ('low', 'medium', 'high', 'critical'))
CHECK (location_type IN ('coarse', 'precise'))
CHECK (status IN ('queued', 'submitted', 'verified', 'in_progress', 'resolved', 'duplicate', 'false'))
CHECK (submission_channel IN ('web', 'sms', 'whatsapp', 'ivr'))
```

#### Report Verifications
```sql
CHECK (verification_type IN ('witness', 'photo', 'location', 'duplicate_check'))
CHECK (verification_status IN ('confirmed', 'disputed', 'needs_info'))
```

#### Other Tables
```sql
-- Safety Check-ins
CHECK (status IN ('safe', 'need_help', 'emergency'))

-- Notifications
CHECK (notification_type IN ('report_status', 'verification', 'emergency_alert', 'check_in_reminder', 'system'))
CHECK (sent_via IN ('push', 'sms', 'email'))

-- Offline Queue
CHECK (action_type IN ('create_report', 'update_report', 'create_verification', 'create_checkin'))
CHECK (status IN ('pending', 'syncing', 'synced', 'failed'))

-- AI Chat History
CHECK (role IN ('user', 'assistant'))
```

## Triggers

### Auto-Update Timestamps
All tables with `updated_at` field have triggers:

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Applied to:
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_volunteers_updated_at 
  BEFORE UPDATE ON volunteers 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at 
  BEFORE UPDATE ON emergency_reports 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_verifications_updated_at 
  BEFORE UPDATE ON report_verifications 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Data Flow Examples

### Anonymous Report Submission
```
1. User submits report → emergency_reports (user_id = null, is_anonymous = true)
2. System generates case_id → Returns to user
3. User saves case_id for tracking
```

### Citizen Report Submission
```
1. User authenticates → users table lookup
2. User submits report → emergency_reports (user_id = <user_id>)
3. Report saved → notifications created for user
4. User can track via previous_reports page → Query by user_id
```

### Volunteer Verification
```
1. Volunteer authenticates → users + volunteers table lookup
2. Volunteer views reports → emergency_reports WHERE status = 'submitted'
3. Volunteer verifies → report_verifications INSERT
4. Trigger updates → emergency_reports.verification_count += 1
5. Trigger updates → volunteers.total_verifications += 1
6. Notification sent → notifications INSERT for report author
```

### Offline Sync
```
1. User offline → Report stored in offline_queue (status = 'pending')
2. Connection restored → offline_queue items processed
3. For each item → Call appropriate service method
4. On success → Update offline_queue (status = 'synced')
5. On failure → Update offline_queue (status = 'failed', retry_count += 1)
```

## Query Patterns

### Common Queries

#### Get User Reports
```sql
SELECT * FROM emergency_reports
WHERE user_id = $1
ORDER BY created_at DESC
LIMIT 50;
```

#### Get Reports Needing Verification
```sql
SELECT * FROM emergency_reports
WHERE status = 'submitted'
  AND verification_count < 2
ORDER BY priority DESC, created_at ASC;
```

#### Get Volunteer Stats
```sql
SELECT 
  v.total_verifications,
  v.reputation_score,
  COUNT(rv.id) as recent_verifications
FROM volunteers v
LEFT JOIN report_verifications rv 
  ON v.id = rv.volunteer_id 
  AND rv.created_at > NOW() - INTERVAL '7 days'
WHERE v.id = $1
GROUP BY v.id;
```

#### Check for Duplicate Reports
```sql
SELECT * FROM emergency_reports
WHERE 
  location_address ILIKE $1
  AND need_type = $2
  AND created_at > NOW() - INTERVAL '24 hours'
  AND status != 'resolved';
```

## Storage Buckets

### Bucket Structure

```
supabase-storage/
├── report-photos/
│   ├── {user_id}/
│   │   ├── {report_id}/
│   │   │   ├── photo1.jpg
│   │   │   └── photo2.jpg
│   └── anonymous/
│       └── {report_id}/
│           └── photo1.jpg
│
├── verification-photos/
│   └── {volunteer_id}/
│       └── {verification_id}/
│           └── photo1.jpg
│
└── profile-pictures/
    └── {user_id}/
        └── avatar.jpg
```

### Storage Policies

All buckets have RLS policies:
- Users can upload to their own folders
- Public read access for all photos (emergency context)
- Users can delete their own uploads

## Performance Considerations

### Query Optimization
- All foreign keys have indexes
- Composite indexes for common query patterns
- Geospatial index (GIST) for location queries
- Descending indexes on timestamp fields

### Scalability
- Partitioning strategy for large tables:
  - `emergency_reports` by created_at (monthly)
  - `ai_chat_history` by session_id
- Archiving strategy for resolved reports (>6 months)

### Caching Strategy
- Client-side caching with React Query
- Redis cache for frequently accessed data (future)
- Supabase Realtime for live updates

---

**For implementation details, see:**
- `/database/schema.ts` - TypeScript definitions
- `/database/README.md` - Complete documentation
- `/database/SETUP.md` - Setup instructions
