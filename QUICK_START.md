# Quick Start: Get Reports Showing on Volunteer Dashboard

## The Problem
Volunteer dashboard shows "No reports to verify" because there's no test data in Supabase.

## The Fix (2 Steps)

### Step 1: Add Test Data to Supabase
```
1. Go to: https://app.supabase.com
2. Open your Emr project
3. Go to: Database → SQL Editor
4. Copy entire content from: /Users/jit/emr/Emr/test-data-seed.sql
5. Paste it in the SQL Editor
6. Click "Run"
7. You should see 5 test reports inserted
```

### Step 2: Restart App and Login as Volunteer
```bash
cd /Users/jit/emr/Emr
npm run dev
```

Then:
1. Log in as a volunteer user
2. Go to home page
3. You should see 5 reports in "Reports to Verify" section

## What Was Changed in Code

### File: `src/components/pages/HomePage.tsx`
- ✅ Removed mock data for demo accounts
- ✅ Made volunteer record check optional (don't fail if volunteer record doesn't exist)
- ✅ Generate temporary volunteerId for volunteers without database record
- ✅ All volunteers now strictly fetch from Supabase

### File: `src/database/services/reportService.ts`
- ✅ Added new method `getUnansweredReports()` that fetches reports with status 'submitted' or 'queued'
- ✅ Sorted by priority (urgent first) then by date (newest first)

### File: `test-data-seed.sql` (NEW)
- Contains 5 sample reports ready to be inserted
- All have status 'submitted' or 'queued'
- Mix of different need types and priorities

## Verify It's Working

Open browser console (F12) and you should see:
```
loadReports called
Current userMode: volunteer
Starting to load reports for volunteer...
Fetching unanswered reports from Supabase...
getUnansweredReports called with filters: {limit: 50}
✓ getUnansweredReports result: {dataCount: 5, hasError: false, count: 5}
Loaded 5 unanswered reports from Supabase
```

## Troubleshooting

**Still no reports?**
- Check if test data was inserted: Supabase Dashboard → Table → emergency_reports (should show 5 new rows)
- Verify Supabase connection is working
- Check browser console for errors
- Try refreshing the page

**Getting "Volunteer account not found" error?**
- This is fixed - you don't need a volunteer database record to view reports
- If error persists, clear localStorage and log in again

## Files Modified
```
✅ src/components/pages/HomePage.tsx
✅ src/database/services/reportService.ts
✅ test-data-seed.sql (NEW)
✅ FIX_SUMMARY.md (NEW - detailed documentation)
```

## Build Status
✅ Build passes without errors
✅ Ready to deploy
