# How to Run the Updated Test Data

## Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy the entire contents of `test-data-seed.sql`
5. Paste it into the SQL editor
6. Click **Run** button
7. You should see "Success" message showing records inserted

## Option 2: Using Supabase CLI

```bash
# If you have Supabase CLI installed
supabase db push
```

## After Running the Script

- Volunteers will see the updated test reports in their dashboard
- The reports will show realistic emergency scenarios
- Reports are ordered by priority (high priority first) and then by time (most recent first)

## Test Data Summary

| Case ID | Type | Priority | Location | Dependents |
|---------|------|----------|----------|------------|
| CASE-2024-TEST-001 | Water | High | District 5, North Ward | 8 |
| CASE-2024-TEST-002 | Medical | High | Central Hospital Area | 3 |
| CASE-2024-TEST-003 | Food | Medium | Relief Camp, Riverside | 6 |
| CASE-2024-TEST-004 | Shelter | High | East Market District | 45 |
| CASE-2024-TEST-005 | Medical | Medium | Slum Area, South End | 4 |

## Verify Data Was Inserted

After running the script, you should see output from the verification query showing all 5 test cases.

### If you need to clear old test data first:

```sql
DELETE FROM emergency_reports 
WHERE case_id LIKE 'CASE-2024-TEST-%';
```

Then run the seed script again.
