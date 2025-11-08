# Complete Setup Guide: Get Volunteers Viewing Reports

## What's Fixed

✅ **Volunteer Permissions** - Volunteers can now view reports  
✅ **Test Data** - New realistic mockup reports added  
✅ **Auto-Refresh** - Dashboard auto-refreshes every 30 seconds  
✅ **Database Sync** - Always pulling fresh data from Supabase  

## Complete Step-by-Step Setup

### Step 1: Fix Volunteer Permissions (5 minutes)

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Click **New Query**
3. Copy entire contents of: `QUICK_FIX_VOLUNTEER_PERMISSIONS.sql`
4. Paste into the editor
5. Click **Run** button
6. You should see output with policy names

**What this does:**
- Updates RLS policies to allow pending volunteers to view reports
- Allows pending volunteers to create verifications
- Removes approval requirement for testing

### Step 2: Add Test Data (5 minutes)

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Click **New Query**
3. Copy entire contents of: `test-data-seed.sql`
4. Paste into the editor
5. Click **Run** button
6. You should see "5 rows inserted" message

**What this does:**
- Deletes old test data (prevents duplicates)
- Inserts 5 new realistic emergency reports:
  - Water shortage (HIGH priority)
  - Medical emergency (HIGH priority)
  - Food shortage (MEDIUM priority)
  - Shelter emergency (HIGH priority)
  - Medical urgency (MEDIUM priority)

### Step 3: Refresh Application (2 minutes)

1. Go to your app: `http://localhost:3006/Emr/`
2. **Hard refresh**: Press `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
3. Clear browser storage (optional):
   - Press `F12` → **Application** tab
   - Click **Storage** → **Local Storage**
   - Click your domain and **Delete All**
4. **Login as a volunteer user**

### Step 4: Verify Reports Display

You should now see:

✅ **Pending Verifications** card shows **5** (or 3 if some were already reviewed)  
✅ **Reports to Verify** section displays:
   - Water crisis report
   - Medical emergency report  
   - Food shortage report
   - Shelter emergency report
   - Medical urgency report

## File Reference

| File | Purpose |
|------|---------|
| `QUICK_FIX_VOLUNTEER_PERMISSIONS.sql` | Quick SQL to fix RLS policies (run first) |
| `test-data-seed.sql` | Seed 5 test reports (run second) |
| `FIX_VOLUNTEER_PERMISSIONS.sql` | Detailed fix script with explanations |
| `VOLUNTEER_PERMISSIONS_FIX.md` | Full documentation |
| `ACTIVATE_MOCKUP_DATA.md` | How to activate and manage test data |

## What Each New Test Report Shows

### 1. Water Crisis 💧
- **Priority**: HIGH (Urgent Attention)
- **Location**: District 5, North Ward
- **Dependents**: 8
- **Description**: Critical water shortage in residential area for 3 days

### 2. Medical Emergency 🏥
- **Priority**: HIGH (Urgent Attention)
- **Location**: Central Hospital Area
- **Dependents**: 3
- **Description**: Pregnant woman in labor needing emergency ambulance

### 3. Food Shortage 🍽️
- **Priority**: MEDIUM
- **Location**: Relief Camp, Riverside
- **Dependents**: 6
- **Description**: Displaced family with no food for 48 hours

### 4. Shelter Emergency 🏢
- **Priority**: HIGH (Urgent Attention)
- **Location**: East Market District
- **Dependents**: 45
- **Description**: 12 families evacuated from damaged building

### 5. Medical Urgency 🤒
- **Priority**: MEDIUM
- **Location**: Slum Area, South End
- **Dependents**: 4
- **Description**: Child with severe respiratory infection needing treatment

## Troubleshooting

### "Still showing old data"
- Hard refresh: `Cmd+Shift+R`
- Wait 30 seconds for auto-refresh
- Check that test data was inserted (run verification query)

### "No reports appearing"
- Check browser console (F12) for errors
- Verify you're logged in as volunteer
- Click "Refresh" button manually
- Confirm volunteer record exists in database

### "Getting error when running SQL"
- Copy the ENTIRE script (check for missing parts)
- Paste into NEW query (don't append to existing)
- Click Run
- Check for syntax errors in output

### "Volunteer can't see reports"
- Go to Supabase → Table Editor → volunteers
- Check your record has `is_active = true`
- Run permission fix script again
- Hard refresh browser

## After Setup

The system will:
- ✅ Auto-refresh reports every 30 seconds
- ✅ Always pull fresh data from Supabase
- ✅ Show real-time updates as reports are verified
- ✅ Clear old reports when verified
- ✅ Display pending verifications count

## Production Notes

When ready for production:

1. **Restrict volunteer access** by uncommenting verification check:
   ```sql
   AND verification_status = 'approved'
   ```

2. **Implement role-based access** for different volunteer types

3. **Add audit logging** to track who verifies which reports

4. **Enable RLS on all tables** for security

5. **Test all permission scenarios** before deployment

---

**Need help?** Check the detailed docs:
- `VOLUNTEER_PERMISSIONS_FIX.md` - Permission details
- `ACTIVATE_MOCKUP_DATA.md` - Test data management  
- `QUICK_START.md` - General setup
