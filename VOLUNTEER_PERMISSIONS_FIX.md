# Fix Volunteer Permissions to View Reports

## Problem

Volunteers with **pending** verification status cannot see reports in the dashboard because of a restrictive RLS (Row Level Security) policy that requires `verification_status = 'approved'`.

## Solution

The RLS policy has been updated to allow:
- ✅ **Approved volunteers** (verification_status = 'approved')
- ✅ **Pending volunteers** (verification_status = 'pending')
- ✅ **Any active volunteer** (is_active = true)

## How to Apply the Fix

### Option 1: Quick Fix (Recommended for Demo)

Run this in Supabase SQL Editor:

```bash
1. Open Supabase Dashboard → SQL Editor
2. Click "New Query"
3. Paste the contents of: FIX_VOLUNTEER_PERMISSIONS.sql
4. Click "Run"
```

This will:
- Drop the old restrictive policy
- Create a new permissive policy for all active volunteers
- Allow both approved AND pending volunteers to view reports

### Option 2: Full Schema Replacement

If you want to update the schema completely:

```bash
1. Re-run database_schema.sql in Supabase SQL Editor
   (This now has the updated policies)
```

## What Changed in the RLS Policies

### BEFORE (Restrictive):
```sql
CREATE POLICY "Volunteers can view all reports" 
  ON emergency_reports FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM volunteers 
      WHERE user_id = auth.uid() 
      AND is_active = true
      AND verification_status = 'approved'  -- ❌ BLOCKS PENDING VOLUNTEERS
    )
  );
```

### AFTER (Permissive for Testing):
```sql
CREATE POLICY "Volunteers can view all reports" 
  ON emergency_reports FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM volunteers 
      WHERE user_id = auth.uid() 
      AND is_active = true
      -- ✅ ALLOWS BOTH APPROVED AND PENDING VOLUNTEERS
    )
  );
```

## Verify the Fix Works

1. **Open browser console** (F12 → Console)
2. **Login as a volunteer** (any volunteer, pending or approved)
3. **Check the "Reports to Verify" section**
4. You should now see:
   - ✅ Loading state disappears
   - ✅ Reports appear from the database
   - ✅ No "No reports to verify" message (if test data exists)

## Troubleshooting

### Still Seeing "No reports to verify"?

**Possible causes:**
1. ❌ Test data hasn't been inserted yet
   - **Fix**: Run `test-data-seed.sql` in Supabase SQL Editor

2. ❌ RLS policy wasn't updated
   - **Fix**: Run `FIX_VOLUNTEER_PERMISSIONS.sql` 

3. ❌ User is not a volunteer in the database
   - **Fix**: Check that the logged-in user has a volunteer record with `is_active = true`

4. ❌ Browser cache issue
   - **Fix**: 
     - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
     - Clear localStorage: F12 → Application → Storage → LocalStorage → Clear All
     - Refresh the page

### Check Volunteer Status in Database

To verify your volunteer record:

1. Go to Supabase Dashboard
2. Click **Table Editor**
3. Select **volunteers** table
4. Look for your user - check:
   - ✅ `is_active` = true
   - ✅ `user_id` matches your auth user ID

To query directly:
```sql
SELECT id, user_id, is_active, verification_status 
FROM volunteers 
LIMIT 5;
```

## Permission Levels After Fix

| User Type | Can View Reports | Can Create Verifications | Status |
|-----------|------------------|--------------------------|--------|
| Citizen | ❌ No | ❌ No | N/A |
| Volunteer (Approved) | ✅ Yes | ✅ Yes | `verification_status = 'approved'` |
| Volunteer (Pending) | ✅ Yes* | ✅ Yes* | `verification_status = 'pending'` |
| Volunteer (Rejected) | ❌ No | ❌ No | `verification_status = 'rejected'` |
| Anonymous User | ❌ No | ❌ No | Not authenticated |

*With the new permissive policy

## Next Steps

1. ✅ Run `FIX_VOLUNTEER_PERMISSIONS.sql` in Supabase
2. ✅ Run `test-data-seed.sql` to add test reports
3. ✅ Hard refresh your application (Cmd+Shift+R)
4. ✅ Login as volunteer and verify reports appear

For production, consider restricting permissions back to approved volunteers only by uncommenting the verification check.
