# Emergency Response App - Database Documentation

## Overview

This directory contains the complete database schema, configuration, and service layers for the Emergency Response Citizen & Volunteer App.

## Database Technology

- **Database**: PostgreSQL (via Supabase)
- **ORM**: Supabase Client
- **Real-time**: Supabase Realtime subscriptions
- **Storage**: Supabase Storage for photos
- **Authentication**: Supabase Auth

## Directory Structure

```
/database
├── schema.ts           # Complete database schema with all tables
├── config.ts           # Supabase client configuration
├── services/           # Database service layers
│   ├── index.ts
│   ├── userService.ts
│   ├── reportService.ts
│   └── volunteerService.ts
└── README.md          # This file
```

## Database Tables

### 1. **users**
Core user accounts for citizens, volunteers, and responders.
- Primary key: `id` (UUID)
- Unique fields: `email`
- Relationships: One-to-many with reports, check-ins, notifications

### 2. **volunteers**
Extended profile for verified volunteers.
- Primary key: `id` (UUID)
- Foreign key: `user_id` → `users.id`
- Unique fields: `volunteer_id`, `user_id`

### 3. **emergency_reports**
Main table for emergency reports submitted by citizens.
- Primary key: `id` (UUID)
- Unique fields: `case_id`
- Foreign key: `user_id` → `users.id` (nullable for anonymous)
- Supports offline submission and geospatial queries

### 4. **report_verifications**
Volunteer verifications of emergency reports.
- Primary key: `id` (UUID)
- Foreign keys: `report_id`, `volunteer_id`
- Unique constraint: (`report_id`, `volunteer_id`)

### 5. **safety_check_ins**
User safety status check-ins during emergencies.
- Primary key: `id` (UUID)
- Foreign key: `user_id` → `users.id`

### 6. **notifications**
Push, SMS, and in-app notifications.
- Primary key: `id` (UUID)
- Foreign key: `user_id` → `users.id`

### 7. **offline_queue**
Queue for syncing offline submissions.
- Primary key: `id` (UUID)
- Foreign key: `user_id` → `users.id` (nullable)

### 8. **ai_chat_history**
AI assistant conversation history.
- Primary key: `id` (UUID)
- Foreign key: `user_id` → `users.id`

## Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key

### 2. Set Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Database Migrations

In your Supabase SQL editor, run the following scripts in order:

1. **Create all tables**:
```sql
-- Copy and paste the content from schema.ts > createAllTables
```

2. **Set up Row Level Security**:
```sql
-- Copy and paste the content from schema.ts > setupRowLevelSecurity
```

3. **Insert sample data** (optional):
```sql
-- Copy and paste the content from schema.ts > sampleData
```

### 4. Enable Realtime (Optional)

For real-time updates on reports and notifications:

1. Go to Database > Replication in Supabase dashboard
2. Enable replication for:
   - `emergency_reports`
   - `notifications`
   - `report_verifications`

### 5. Set up Storage Buckets

For photo uploads:

1. Go to Storage in Supabase dashboard
2. Create buckets:
   - `report-photos` (public)
   - `verification-photos` (public)
   - `profile-pictures` (public)

## Usage Examples

### Creating a Report

```typescript
import { ReportService } from '@/database/services';

const report = await ReportService.createReport({
  user_id: currentUser.id,
  need_type: 'water',
  description: 'Urgent need for drinking water',
  priority: 'high',
  location_address: 'Downtown area',
  number_of_dependents: 3,
  is_anonymous: false,
  share_with_responders: true,
});
```

### Fetching User Reports

```typescript
import { ReportService } from '@/database/services';

const { data: reports, count } = await ReportService.getUserReports(userId, {
  status: 'submitted',
  limit: 10,
  offset: 0,
});
```

### Creating Verification (Volunteer)

```typescript
import { VolunteerService } from '@/database/services';

const verification = await VolunteerService.createVerification({
  report_id: reportId,
  volunteer_id: volunteerId,
  verification_type: 'witness',
  verification_status: 'confirmed',
  notes: 'Verified on-site. Family needs immediate assistance.',
});
```

### Updating User Profile

```typescript
import { UserService } from '@/database/services';

const updatedUser = await UserService.updateUser(userId, {
  full_name: 'John Doe',
  preferred_language: 'en',
  number_of_dependents: 2,
});
```

## Row Level Security (RLS)

All tables have RLS enabled with the following policies:

- **Users**: Can only read/update their own profile
- **Reports**: Anyone can create, users can view their own, volunteers can view all
- **Verifications**: Only volunteers can create, anyone can view
- **Check-ins**: Users can only create/view their own
- **Notifications**: Users can only view/update their own

## Offline Support

The app supports offline operation with automatic sync:

1. Reports created offline are stored in `offline_queue`
2. When connection returns, queue items are processed
3. Use `ReportService` methods - offline handling is automatic

## Real-time Subscriptions

Subscribe to real-time changes:

```typescript
import { supabase } from '@/database/config';

// Subscribe to new reports
const subscription = supabase
  .channel('reports')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'emergency_reports',
    },
    (payload) => {
      console.log('New report:', payload.new);
    }
  )
  .subscribe();
```

## Performance Optimization

### Indexes

All critical fields have indexes:
- User lookups: `email`, `user_type`
- Report queries: `case_id`, `status`, `priority`, `created_at`
- Geospatial: `geohash` with GIST index

### Caching

Consider implementing:
- React Query for client-side caching
- Supabase Realtime for instant updates
- Service Worker for offline data

## Security Best Practices

1. **Never expose anon key in public repos**
2. **Use RLS policies** - never bypass them
3. **Validate all inputs** on client and server
4. **Sanitize user-generated content**
5. **Use parameterized queries** (Supabase client does this automatically)
6. **Limit data exposure** - only select needed fields
7. **Implement rate limiting** for API endpoints

## Monitoring & Maintenance

### Regular Tasks

- Monitor database size and performance
- Review and optimize slow queries
- Archive old resolved reports (>6 months)
- Clean up orphaned offline queue items
- Update volunteer reputation scores

### Backup Strategy

Supabase provides automatic backups. Additional recommendations:

- Weekly full database backups
- Daily incremental backups
- Store backups in separate region
- Test restore procedures monthly

## Troubleshooting

### Connection Issues

```typescript
import { checkDatabaseConnection } from '@/database/config';

const isConnected = await checkDatabaseConnection();
if (!isConnected) {
  console.error('Database connection failed');
}
```

### Query Debugging

Enable verbose logging:

```typescript
// In development only
if (process.env.NODE_ENV === 'development') {
  supabase.from('users').select('*').then(console.log);
}
```

## Migration Guide

When updating schema:

1. Create migration file in Supabase dashboard
2. Test in development environment
3. Run migration in production during low-traffic period
4. Update TypeScript interfaces in `schema.ts`
5. Update service layer methods if needed

## Support

For issues or questions:
- Check Supabase documentation: https://supabase.com/docs
- Review this README
- Check application logs in Supabase dashboard
