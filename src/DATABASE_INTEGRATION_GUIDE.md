# Database Integration Guide

## Overview

This guide explains how the Emergency Response App integrates with the database and the proper login/routing hierarchy.

## Application Flow

```
┌─────────────────┐
│   LoginPage     │ ← Entry Point (Always shown first)
└────────┬────────┘
         │
         ├─── Anonymous Mode → Quick Report (No login required)
         │                     └── Direct access to emergency reporting
         │
         ├─── User Login → HomePage (Citizen View)
         │                 └── Full features: Reports, Tracking, AI Chat
         │
         └─── Volunteer Login → HomePage (Volunteer View)
                                └── Report verification & assistance
```

## Login Hierarchy

### 1. **Entry Point: LoginPage** (`/components/pages/LoginPage.tsx`)

The LoginPage is ALWAYS the first screen shown when `!isAuthenticated`. It provides three modes:

#### Mode 1: Quick Report (Anonymous)
- **No login required**
- **No database account needed**
- Direct access to emergency reporting
- Reports are stored with `user_id = null` and `is_anonymous = true`
- Limited to basic reporting features

**Flow:**
```typescript
localStorage.setItem("userMode", "anonymous");
setIsAuthenticated(true); // Allows access to HomePage
// HomePage detects anonymous mode and shows simplified interface
```

#### Mode 2: User Login (Citizen)
- **Requires account** in `users` table
- **user_type = 'citizen'**
- Full access to:
  - Emergency reporting
  - Report tracking (Previous Reports)
  - AI Assistant
  - Safety check-ins
  - Notifications
  - Profile settings

**Flow:**
```typescript
// Authenticate via Supabase Auth
const { data, error } = await supabase.auth.signInWithPassword({
  email, password
});

if (!error) {
  localStorage.setItem("userMode", "user");
  localStorage.setItem("userId", data.user.id);
  setIsAuthenticated(true);
}
```

#### Mode 3: Volunteer Login
- **Requires account** in `users` table with `user_type = 'volunteer'`
- **Additional record** in `volunteers` table
- **verification_status = 'approved'**
- Access to:
  - All reports (not just own)
  - Report verification tools
  - Volunteer dashboard
  - Reports Reviewed page
  - Statistics and reputation

**Flow:**
```typescript
// Authenticate via Supabase Auth
const { data, error } = await supabase.auth.signInWithPassword({
  email, password
});

if (!error) {
  // Check if user is approved volunteer
  const { data: volunteer } = await supabase
    .from('volunteers')
    .select('*')
    .eq('user_id', data.user.id)
    .eq('verification_status', 'approved')
    .single();
  
  if (volunteer) {
    localStorage.setItem("userMode", "volunteer");
    localStorage.setItem("userId", data.user.id);
    localStorage.setItem("volunteerId", volunteer.id);
    setIsAuthenticated(true);
  }
}
```

## Database-Friendly Architecture

### Current State vs. Database-Connected State

#### Current: Mock Data (Frontend Only)
```typescript
// HomePage.tsx - Current mock approach
const mockReports: ReportData[] = [
  {
    id: "1",
    caseId: "CASE-2024-001",
    needType: "water",
    // ... mock data
  }
];
```

#### Future: Database-Connected
```typescript
// HomePage.tsx - Database approach
import { ReportService } from '@/database/services';

useEffect(() => {
  async function fetchReports() {
    const userId = localStorage.getItem('userId');
    const { data, error } = await ReportService.getUserReports(userId, {
      limit: 10,
      offset: 0
    });
    
    if (!error) {
      setReports(data);
    }
  }
  
  fetchReports();
}, []);
```

### Key Integration Points

#### 1. **Authentication** (`LoginPage.tsx`)

Replace mock authentication:

```typescript
// Before (Mock)
const handleUserLogin = () => {
  if (username && password) {
    localStorage.setItem("userMode", "user");
    onLogin();
  }
};

// After (Database)
import { supabase } from '@/database/config';
import { UserService } from '@/database/services';

const handleUserLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password
  });
  
  if (!error && data.user) {
    // Update last login
    await UserService.updateLastLogin(data.user.id);
    
    localStorage.setItem("userMode", "user");
    localStorage.setItem("userId", data.user.id);
    onLogin();
  } else {
    toast.error("Invalid credentials");
  }
};
```

#### 2. **Report Submission** (`HomePage.tsx`)

Replace mock report submission:

```typescript
// Before (Mock)
const handleSubmitReport = () => {
  const newReport = {
    id: `CASE-${Date.now()}`,
    needType: selectedNeed,
    microUpdate: microUpdate,
    // ...
  };
  toast.success("Report submitted!");
};

// After (Database)
import { ReportService } from '@/database/services';

const handleSubmitReport = async () => {
  const userId = localStorage.getItem('userId');
  const userMode = localStorage.getItem('userMode');
  
  const { data, error } = await ReportService.createReport({
    user_id: userMode === 'anonymous' ? null : userId,
    need_type: selectedNeed,
    description: microUpdate,
    location_address: location,
    number_of_dependents: parseInt(dependents),
    vulnerable_tags: vulnerableTags,
    is_anonymous: userMode === 'anonymous' || reportAnonymously,
    share_with_responders: shareWithResponders,
    share_precise_location: sharePreciseCoords,
    priority: 'medium', // AI can calculate this
    status: 'submitted'
  });
  
  if (!error) {
    toast.success(`Report submitted! Case ID: ${data.case_id}`);
    // Reset form
  } else {
    toast.error("Failed to submit report");
  }
};
```

#### 3. **Fetching Reports** (`PreviousReportsPage.tsx`)

Replace mock data fetching:

```typescript
// Before (Mock)
const mockReports = [/* ... */];
const [reports, setReports] = useState(mockReports);

// After (Database)
import { ReportService } from '@/database/services';

const [reports, setReports] = useState<EmergencyReport[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function loadReports() {
    const userId = localStorage.getItem('userId');
    const { data, error } = await ReportService.getUserReports(userId, {
      limit: 50,
      offset: 0
    });
    
    if (!error) {
      setReports(data);
    }
    setLoading(false);
  }
  
  loadReports();
}, []);
```

#### 4. **Volunteer Verification** (`HomePage.tsx` - Volunteer mode)

```typescript
import { VolunteerService } from '@/database/services';

const handleSubmitVerification = async () => {
  const volunteerId = localStorage.getItem('volunteerId');
  
  const { data, error } = await VolunteerService.createVerification({
    report_id: selectedReport.id,
    volunteer_id: volunteerId,
    verification_type: 'witness',
    verification_status: 'confirmed',
    notes: verificationNotes,
    photo_urls: verificationPhoto ? [verificationPhoto] : []
  });
  
  if (!error) {
    toast.success("Verification submitted!");
  }
};
```

#### 5. **Profile Updates** (`SettingsPage.tsx`)

```typescript
import { UserService } from '@/database/services';

const handleSaveProfile = async () => {
  const userId = localStorage.getItem('userId');
  
  const { data, error } = await UserService.updateUser(userId, {
    full_name: name,
    preferred_language: language,
    number_of_dependents: parseInt(dependents)
  });
  
  if (!error) {
    toast.success("Profile updated!");
  }
};
```

## Offline-First Support

The database architecture supports offline operation:

### 1. **Offline Queue**

```typescript
import { supabase } from '@/database/config';

// When offline
if (!navigator.onLine) {
  // Store in local queue
  const queue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
  queue.push({
    action: 'create_report',
    payload: reportData,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('offlineQueue', JSON.stringify(queue));
  
  toast.info("Report queued - will send when online");
}

// When back online
window.addEventListener('online', async () => {
  const queue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
  
  for (const item of queue) {
    if (item.action === 'create_report') {
      await ReportService.createReport(item.payload);
    }
  }
  
  localStorage.setItem('offlineQueue', '[]');
  toast.success("All queued reports synced!");
});
```

### 2. **IndexedDB for Cached Data**

Consider using IndexedDB for larger offline datasets:

```typescript
import { openDB } from 'idb';

const db = await openDB('emergency-response-db', 1, {
  upgrade(db) {
    db.createObjectStore('reports', { keyPath: 'id' });
    db.createObjectStore('notifications', { keyPath: 'id' });
  },
});

// Cache reports
await db.put('reports', report);

// Retrieve from cache
const cachedReports = await db.getAll('reports');
```

## Environment Setup

### 1. Install Dependencies

```bash
npm install @supabase/supabase-js
npm install idb  # For IndexedDB support
```

### 2. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Database Setup

1. Create Supabase project
2. Run SQL from `/database/schema.ts`
3. Enable RLS policies
4. Create storage buckets for photos
5. Test connection

### 4. Update Imports

Update all component files to import services:

```typescript
import { UserService, ReportService, VolunteerService } from '@/database/services';
import { supabase } from '@/database/config';
```

## Testing Database Integration

### 1. **Test User Creation**

```typescript
import { UserService } from '@/database/services';

const testUser = await UserService.createUser({
  email: 'test@example.com',
  full_name: 'Test User',
  user_type: 'citizen',
  is_verified: true,
  preferred_language: 'en',
});

console.log('Created user:', testUser);
```

### 2. **Test Report Creation**

```typescript
import { ReportService } from '@/database/services';

const testReport = await ReportService.createReport({
  user_id: userId,
  need_type: 'water',
  description: 'Test emergency report',
  priority: 'high',
  location_address: 'Test location',
});

console.log('Created report:', testReport);
```

### 3. **Test Volunteer Verification**

```typescript
import { VolunteerService } from '@/database/services';

const testVerification = await VolunteerService.createVerification({
  report_id: reportId,
  volunteer_id: volunteerId,
  verification_type: 'witness',
  verification_status: 'confirmed',
});

console.log('Created verification:', testVerification);
```

## Migration Checklist

- [ ] Set up Supabase project
- [ ] Run database migrations
- [ ] Configure environment variables
- [ ] Install dependencies
- [ ] Update LoginPage authentication
- [ ] Update HomePage report submission
- [ ] Update PreviousReportsPage data fetching
- [ ] Update SettingsPage profile updates
- [ ] Implement offline queue handling
- [ ] Test all user flows
- [ ] Test volunteer flows
- [ ] Test anonymous reporting
- [ ] Set up error logging
- [ ] Configure backup strategy

## Security Considerations

1. **Never commit `.env.local`** - Add to `.gitignore`
2. **Use RLS policies** - Enforce at database level
3. **Validate all inputs** - Client and server
4. **Sanitize user content** - Prevent XSS
5. **Rate limit API calls** - Prevent abuse
6. **Use HTTPS only** - No plain HTTP
7. **Implement CSRF protection** - For forms
8. **Regular security audits** - Review access patterns

## Performance Tips

1. **Use indexes** - All foreign keys and frequently queried fields
2. **Limit result sets** - Paginate large queries
3. **Cache frequently accessed data** - Use React Query
4. **Optimize images** - Compress before upload
5. **Use real-time sparingly** - Only for critical updates
6. **Monitor query performance** - Use Supabase dashboard
7. **Clean up old data** - Archive resolved reports

## Support Resources

- Supabase Documentation: https://supabase.com/docs
- Database Schema: `/database/schema.ts`
- Service Layer: `/database/services/`
- Configuration: `/database/config.ts`
- README: `/database/README.md`
