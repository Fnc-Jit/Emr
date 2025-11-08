# Activating New Mockup Data for Volunteers Panel

## What Changed

1. **Updated test-data-seed.sql** - Now includes a DELETE statement to clear old test data
2. **Enhanced HomePage.tsx** - Added auto-refresh every 30 seconds to always show fresh data from database

## Step-by-Step Instructions

### Step 1: Run the SQL Script in Supabase

1. Open **Supabase Dashboard** for your project
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New Query** button
4. Copy the entire content of `/Users/jit/emr/Emr/test-data-seed.sql`
5. Paste it into the SQL editor
6. Click the **Run** button (or press Ctrl+Enter)

**Expected Output:**
```
Column status updated successfully

15 rows deleted from emergency_reports
5 rows inserted into emergency_reports
5 rows selected
```

### Step 2: Verify Data Was Inserted

The SQL script includes a verification query at the end. You should see output showing:

| case_id | need_type | priority | status | location_address | created_at |
|---------|-----------|----------|--------|------------------|-----------|
| CASE-2024-TEST-001 | water | high | submitted | District 5, North Ward | ... |
| CASE-2024-TEST-002 | medical | high | submitted | Central Hospital Area | ... |
| CASE-2024-TEST-003 | food | medium | queued | Relief Camp, Riverside | ... |
| CASE-2024-TEST-004 | shelter | high | submitted | East Market District | ... |
| CASE-2024-TEST-005 | medical | medium | submitted | Slum Area, South End | ... |

### Step 3: Refresh the Volunteer Dashboard

1. Go to your running application (http://localhost:3006/Emr/)
2. **Login as a volunteer** (if not already logged in)
3. Click the **Refresh** button in the "Reports to Verify" section
4. The dashboard will now show the 3-5 new test reports (pending verifications)

### Step 4: Auto-Refresh Enabled

The application now:
- ✅ Auto-refreshes data every 30 seconds
- ✅ Clears old cached reports on volunteer login
- ✅ Forces fresh fetch from Supabase database
- ✅ Shows most recent data without manual refresh needed

## New Test Data Details

### Report 1: Water Crisis (HIGH PRIORITY)
- **Case ID**: CASE-2024-TEST-001
- **Description**: Critical water shortage in residential area. Multiple families unable to access clean drinking water for past 3 days. Children and elderly at risk of dehydration.
- **Location**: District 5, North Ward
- **Dependents**: 8
- **Status**: Submitted

### Report 2: Medical Emergency (HIGH PRIORITY)
- **Case ID**: CASE-2024-TEST-002
- **Description**: Pregnant woman in labor needs immediate medical attention. No transportation available. Requires emergency ambulance and hospital admission.
- **Location**: Central Hospital Area
- **Dependents**: 3
- **Status**: Submitted

### Report 3: Food Shortage (MEDIUM PRIORITY)
- **Case ID**: CASE-2024-TEST-003
- **Description**: Displaced family with young children in temporary shelter. No access to food for 48 hours. Urgent need for nutrition and basic supplies.
- **Location**: Relief Camp, Riverside
- **Dependents**: 6
- **Status**: Queued

### Report 4: Shelter Emergency (HIGH PRIORITY)
- **Case ID**: CASE-2024-TEST-004
- **Description**: Entire apartment building evacuated due to structural damage. 12 families need emergency shelter and protective equipment. Weather conditions worsening.
- **Location**: East Market District
- **Dependents**: 45
- **Status**: Submitted

### Report 5: Medical Urgency (MEDIUM PRIORITY)
- **Case ID**: CASE-2024-TEST-005
- **Description**: Young child suffering from severe respiratory infection and fever. Parents unable to afford treatment. Need urgent medical evaluation and prescribed medications.
- **Location**: Slum Area, South End
- **Dependents**: 4
- **Status**: Submitted

## Troubleshooting

### Old Data Still Showing?

**Solution:** The SQL script now includes a DELETE statement that clears old data. Make sure to run the complete script again.

### Reports Not Appearing?

**Solution:** 
1. Check browser console for errors (F12 → Console)
2. Verify you're logged in as a volunteer user
3. Click "Refresh" button to force data fetch
4. Wait 30 seconds for auto-refresh

### Database Connection Issues?

**Solution:**
1. Check that Supabase project is online
2. Verify RLS (Row Level Security) policies allow data access
3. Check network tab in browser DevTools to see if queries are being sent

## Updating Test Data Again

To modify the test data in the future:

1. Edit `/Users/jit/emr/Emr/test-data-seed.sql` with new report details
2. Run the updated script in Supabase SQL Editor
3. Click Refresh or wait for auto-refresh (30 seconds)

That's it! Your volunteer dashboard will now display the updated, active data from your Supabase database.
