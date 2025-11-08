# Database Setup Guide

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create Supabase Project (2 min)

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign in with GitHub/Google
4. Click "New Project"
5. Fill in:
   - **Name:** emergency-response-app
   - **Database Password:** (save this securely!)
   - **Region:** (choose closest to users)
6. Click "Create new project"
7. Wait for project to initialize (~2 minutes)

### Step 2: Get Your Credentials (30 sec)

1. In Supabase dashboard, go to **Settings** > **API**
2. Copy these values:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon public key:** `eyJhbGci...`

### Step 3: Configure Environment (30 sec)

Create `.env.local` in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

**⚠️ Important:** Add to `.gitignore`:
```
.env.local
.env*.local
```

### Step 4: Install Dependencies (30 sec)

```bash
npm install @supabase/supabase-js
```

### Step 5: Run Database Migrations (2 min)

1. Open Supabase dashboard
2. Go to **SQL Editor**
3. Click "New Query"
4. Copy entire content from `/database/schema.ts` > `createAllTables`
5. Click "Run"
6. ✅ Success! All tables created

### Step 6: Set Up Row Level Security (30 sec)

1. In SQL Editor, create new query
2. Copy content from `/database/schema.ts` > `setupRowLevelSecurity`
3. Click "Run"
4. ✅ Security policies enabled!

### Step 7: Create Storage Buckets (1 min)

1. Go to **Storage** in Supabase dashboard
2. Click "New Bucket"
3. Create these buckets:

   **Bucket 1: report-photos**
   - Name: `report-photos`
   - Public: ✅ Yes
   - Click "Create Bucket"

   **Bucket 2: verification-photos**
   - Name: `verification-photos`
   - Public: ✅ Yes
   - Click "Create Bucket"

   **Bucket 3: profile-pictures**
   - Name: `profile-pictures`
   - Public: ✅ Yes
   - Click "Create Bucket"

### Step 8: Test Connection (30 sec)

Create a test file `test-db.ts`:

```typescript
import { supabase } from './database/config';

async function testConnection() {
  const { data, error } = await supabase
    .from('users')
    .select('count')
    .limit(1);
  
  if (error) {
    console.error('❌ Connection failed:', error);
  } else {
    console.log('✅ Database connected successfully!');
  }
}

testConnection();
```

Run:
```bash
npx ts-node test-db.ts
```

## ✅ Setup Complete!

You're ready to integrate the database. Next:
- Follow `/DATABASE_INTEGRATION_GUIDE.md` to replace mock data
- Test each user flow
- Deploy!

---

## 🔧 Detailed Setup

### Creating Test Users

In SQL Editor, run:

```sql
-- Create a test citizen user
INSERT INTO users (email, full_name, user_type, is_verified, preferred_language)
VALUES ('citizen@test.com', 'Test Citizen', 'citizen', true, 'en');

-- Create a test volunteer user
INSERT INTO users (email, full_name, user_type, is_verified, preferred_language)
VALUES ('volunteer@test.com', 'Test Volunteer', 'volunteer', true, 'en');

-- Get the volunteer's user_id for next step
SELECT id FROM users WHERE email = 'volunteer@test.com';

-- Create volunteer profile (replace USER_ID_HERE with actual ID)
INSERT INTO volunteers (user_id, volunteer_id, verification_status, total_verifications, reputation_score)
VALUES ('USER_ID_HERE', 'VOL-2024-0001', 'approved', 10, 85);
```

### Setting Up Authentication

1. In Supabase dashboard, go to **Authentication** > **Providers**
2. Enable **Email** provider
3. Configure settings:
   - Enable email confirmations: ✅ (optional)
   - Secure email change: ✅
   - Secure password change: ✅

Create test users with auth:

```sql
-- In SQL Editor
-- Note: Password must be set through Supabase Auth API
```

Or use Supabase dashboard:
1. Go to **Authentication** > **Users**
2. Click "Add User"
3. Enter email and password
4. User will be created in `auth.users` table

### Connecting App Users to Auth Users

When a user signs up via your app:

```typescript
import { supabase } from '@/database/config';
import { UserService } from '@/database/services';

async function handleSignUp(email: string, password: string, fullName: string) {
  // 1. Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (authError) {
    console.error('Auth error:', authError);
    return;
  }
  
  // 2. Create user profile
  const { data: userData, error: userError } = await UserService.createUser({
    id: authData.user!.id,  // Use same ID from auth
    email,
    full_name: fullName,
    user_type: 'citizen',
    is_verified: false,
    preferred_language: 'en',
  });
  
  if (!userError) {
    console.log('✅ User created successfully!');
  }
}
```

### Configuring Realtime (Optional)

For real-time updates on reports:

1. Go to **Database** > **Replication**
2. Enable replication for:
   - ✅ emergency_reports
   - ✅ notifications
   - ✅ report_verifications
3. Click "Save"

Subscribe in your app:

```typescript
import { supabase } from '@/database/config';

const subscription = supabase
  .channel('reports')
  .on(
    'postgres_changes',
    {
      event: '*',  // INSERT, UPDATE, DELETE
      schema: 'public',
      table: 'emergency_reports',
    },
    (payload) => {
      console.log('Change received!', payload);
      // Update your UI
    }
  )
  .subscribe();

// Clean up
subscription.unsubscribe();
```

### Storage Security Rules

For profile pictures bucket:

```sql
-- Go to Storage > Policies > New Policy

-- Allow authenticated users to upload their own profile picture
CREATE POLICY "Users can upload own profile picture"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow public read access
CREATE POLICY "Anyone can view profile pictures"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-pictures');

-- Allow users to update their own profile picture
CREATE POLICY "Users can update own profile picture"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to delete their own profile picture
CREATE POLICY "Users can delete own profile picture"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);
```

Repeat similar policies for `report-photos` and `verification-photos`.

### Backup Configuration

1. Go to **Settings** > **Database**
2. Under "Backups":
   - **Point in Time Recovery:** Enable (paid feature)
   - **Daily Backups:** Automatically enabled
3. Download a backup:
   - Click "Download backup"
   - Save `.sql` file securely

### Monitoring Setup

1. Go to **Logs** in Supabase dashboard
2. Available logs:
   - **API:** All API requests
   - **Postgres:** Database queries
   - **Auth:** Authentication events
   - **Realtime:** Realtime connections
   - **Storage:** File operations

Set up alerts:
1. Go to **Settings** > **Integrations**
2. Connect to services like:
   - Slack
   - Discord
   - Webhook endpoints

### Performance Optimization

Run these in SQL Editor:

```sql
-- Analyze tables for query optimization
ANALYZE users;
ANALYZE emergency_reports;
ANALYZE volunteers;

-- Check index usage
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan;

-- Find slow queries
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

## 🧪 Testing Your Setup

### Test 1: Create a Report

```typescript
import { ReportService } from '@/database/services';

async function testCreateReport() {
  const { data, error } = await ReportService.createReport({
    need_type: 'water',
    description: 'Test emergency report',
    priority: 'high',
    location_address: 'Test Location',
    is_anonymous: false,
    share_with_responders: true,
    status: 'submitted',
  });
  
  if (error) {
    console.error('❌ Error:', error);
  } else {
    console.log('✅ Report created:', data.case_id);
  }
}
```

### Test 2: Fetch Reports

```typescript
import { ReportService } from '@/database/services';

async function testFetchReports() {
  const { data, error } = await ReportService.getAllReports({
    limit: 10,
  });
  
  if (error) {
    console.error('❌ Error:', error);
  } else {
    console.log(`✅ Found ${data.length} reports`);
  }
}
```

### Test 3: Create Verification

```typescript
import { VolunteerService } from '@/database/services';

async function testVerification() {
  const { data, error } = await VolunteerService.createVerification({
    report_id: 'REPORT_ID_HERE',
    volunteer_id: 'VOLUNTEER_ID_HERE',
    verification_type: 'witness',
    verification_status: 'confirmed',
    notes: 'Test verification',
  });
  
  if (error) {
    console.error('❌ Error:', error);
  } else {
    console.log('✅ Verification created');
  }
}
```

## 🔍 Troubleshooting

### Error: "relation does not exist"
**Solution:** Run the table creation SQL in SQL Editor

### Error: "permission denied"
**Solution:** Check RLS policies are set up correctly

### Error: "invalid API key"
**Solution:** Verify `.env.local` has correct credentials

### Error: "connection refused"
**Solution:** Check Supabase project is running (not paused)

### Slow Queries
**Solution:** 
1. Check indexes exist
2. Add indexes for frequently queried fields
3. Use EXPLAIN ANALYZE to debug

### Storage Upload Fails
**Solution:**
1. Check bucket exists
2. Verify bucket is public or has correct policies
3. Check file size limits (default 50MB)

## 📚 Additional Resources

- **Supabase Docs:** https://supabase.com/docs
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Row Level Security:** https://supabase.com/docs/guides/auth/row-level-security
- **Storage Policies:** https://supabase.com/docs/guides/storage/security/access-control

## ✅ Post-Setup Checklist

- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Dependencies installed
- [ ] Database tables created
- [ ] RLS policies enabled
- [ ] Storage buckets created
- [ ] Test connection successful
- [ ] Test users created
- [ ] Authentication configured
- [ ] Backup strategy in place
- [ ] Monitoring set up
- [ ] Ready to integrate!

---

**Need Help?** Check:
1. This file for setup issues
2. `/database/README.md` for database docs
3. `/DATABASE_INTEGRATION_GUIDE.md` for integration help
4. Supabase documentation
