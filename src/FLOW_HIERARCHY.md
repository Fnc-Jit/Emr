# Application Flow & Hierarchy

## Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          APPLICATION START                              │
│                                                                         │
│                         App.tsx Initializes                             │
│                    ┌─────────────────────────┐                          │
│                    │   isAuthenticated?      │                          │
│                    └───────────┬─────────────┘                          │
│                                │                                         │
│                    ┌───────────▼────────────┐                           │
│                    │    NO  │  YES          │                           │
│                    │        │               │                           │
└────────────────────┼────────┼───────────────┼───────────────────────────┘
                     │        │               │
                     │        │               │
┌────────────────────▼────────┘               └──────────────────────────┐
│                                                                         │
│                      LOGIN PAGE                                         │
│            (Always First - Entry Point)                                 │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                 │   │
│  │   ┌─────────────────────────────────────────────────────────┐  │   │
│  │   │           OPTION 1: Quick Report (Anonymous)            │  │   │
│  │   ├─────────────────────────────────────────────────────────┤  │   │
│  │   │  • No login required                                    │  │   │
│  │   │  • No database account needed                           │  │   │
│  │   │  • Click "Quick Report" button                          │  │   │
│  │   │  • Sets: userMode = "anonymous"                         │  │   │
│  │   └──────────────────────┬──────────────────────────────────┘  │   │
│  │                          │                                      │   │
│  │                          ▼                                      │   │
│  │   ┌─────────────────────────────────────────────────────────┐  │   │
│  │   │           OPTION 2: User Login (Citizen)                │  │   │
│  │   ├─────────────────────────────────────────────────────────┤  │   │
│  │   │  • Enter username/email                                 │  │   │
│  │   │  • Enter password                                       │  │   │
│  │   │  • Authenticate via Supabase Auth                       │  │   │
│  │   │  • Check users table: user_type = 'citizen'             │  │   │
│  │   │  • Sets: userMode = "user", userId = <user_id>          │  │   │
│  │   └──────────────────────┬──────────────────────────────────┘  │   │
│  │                          │                                      │   │
│  │                          ▼                                      │   │
│  │   ┌─────────────────────────────────────────────────────────┐  │   │
│  │   │          OPTION 3: Volunteer Login                      │  │   │
│  │   ├─────────────────────────────────────────────────────────┤  │   │
│  │   │  • Enter username/email                                 │  │   │
│  │   │  • Enter password                                       │  │   │
│  │   │  • Authenticate via Supabase Auth                       │  │   │
│  │   │  • Check users table: user_type = 'volunteer'           │  │   │
│  │   │  • Check volunteers table: verification = 'approved'    │  │   │
│  │   │  • Sets: userMode = "volunteer", userId, volunteerId    │  │   │
│  │   └──────────────────────┬──────────────────────────────────┘  │   │
│  │                          │                                      │   │
│  └──────────────────────────┼──────────────────────────────────────┘   │
│                             │                                           │
└─────────────────────────────┼───────────────────────────────────────────┘
                              │
                              │ setIsAuthenticated(true)
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       AUTHENTICATED STATE                               │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                         Header Component                          │ │
│  │  • Shows greeting with username                                   │ │
│  │  • Hamburger menu with navigation                                 │ │
│  │  • Different menu items based on userMode                         │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                        Main Content Area                          │ │
│  │                    (Renders based on userMode)                    │ │
│  └──────────────────────────┬────────────────────────────────────────┘ │
│                             │                                           │
└─────────────────────────────┼───────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
         │                    │                    │
┌────────▼─────────┐  ┌──────▼──────┐  ┌─────────▼──────────┐
│   ANONYMOUS      │  │   CITIZEN   │  │    VOLUNTEER       │
│     MODE         │  │    MODE     │  │      MODE          │
└──────────────────┘  └─────────────┘  └────────────────────┘
         │                    │                    │
         │                    │                    │
         ▼                    ▼                    ▼
```

## Anonymous Mode Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    ANONYMOUS USER                           │
│                  (userMode = "anonymous")                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  HomePage:                                                  │
│  ┌────────────────────────────────────────────────────┐    │
│  │  • Quick Report Form (3-step)                      │    │
│  │    1. Select need type                             │    │
│  │    2. Add details & location                       │    │
│  │    3. Privacy settings                             │    │
│  │                                                     │    │
│  │  • NO previous reports access                      │    │
│  │  • NO AI chat assistant                            │    │
│  │  • NO profile settings                             │    │
│  │  • NO notifications                                │    │
│  │                                                     │    │
│  │  • Reports saved with:                             │    │
│  │    - user_id = null                                │    │
│  │    - is_anonymous = true                           │    │
│  │    - Basic tracking via case_id only               │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  Hamburger Menu:                                            │
│  • Settings (limited - language, theme only)                │
│  • Help & Support                                           │
│  • Switch to User Login                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Citizen Mode Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   CITIZEN USER                              │
│                  (userMode = "user")                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  HomePage:                                                  │
│  ┌────────────────────────────────────────────────────┐    │
│  │  • Quick Report Form (3-step) - FULL FEATURED      │    │
│  │    1. Select need type                             │    │
│  │    2. Add details, location, dependents, photos    │    │
│  │    3. Privacy & consent settings                   │    │
│  │                                                     │    │
│  │  • AI Chat Assistant (bottom of page)              │    │
│  │    - Ask questions about emergency reporting       │    │
│  │    - Get safety tips                               │    │
│  │    - Learn how to use the app                      │    │
│  │                                                     │    │
│  │  • Reports saved with:                             │    │
│  │    - user_id = <current_user_id>                   │    │
│  │    - Full tracking & updates                       │    │
│  │    - Can be anonymous if chosen                    │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  Previous Reports Page:                                     │
│  • View all submitted reports                               │
│  • Search by case ID                                        │
│  • Filter by status, need type                              │
│  • Edit/delete reports                                      │
│  • Track status updates                                     │
│                                                             │
│  Settings Page:                                             │
│  • Profile management                                       │
│  • Privacy controls                                         │
│  • Notification preferences                                 │
│  • Language & theme                                         │
│  • Offline settings                                         │
│                                                             │
│  Hamburger Menu:                                            │
│  • Quick Report (Home)                                      │
│  • Previous Reports                                         │
│  • Safety Check-ins                                         │
│  • Public Dashboard                                         │
│  • Notifications                                            │
│  • Settings                                                 │
│  • Help & Support                                           │
│  • Logout                                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Volunteer Mode Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  VOLUNTEER USER                             │
│                (userMode = "volunteer")                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  HomePage:                                                  │
│  ┌────────────────────────────────────────────────────┐    │
│  │  • Volunteer Dashboard                             │    │
│  │    - Statistics cards (verified, pending, etc.)    │    │
│  │    - Reputation score                              │    │
│  │    - Activity streak                               │    │
│  │                                                     │    │
│  │  • Nearby Reports Needing Verification             │    │
│  │    - Prioritized list                              │    │
│  │    - Sortable by distance, urgency                 │    │
│  │    - Quick view details                            │    │
│  │    - Verify button                                 │    │
│  │                                                     │    │
│  │  • NO AI Chat (volunteer-specific, not needed)     │    │
│  │                                                     │    │
│  │  • Verification Actions:                           │    │
│  │    - View report details                           │    │
│  │    - Add verification notes                        │    │
│  │    - Upload verification photos                    │    │
│  │    - Confirm/dispute/request more info             │    │
│  │    - Check for duplicates                          │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  Reports Reviewed Page:                                     │
│  • All reports this volunteer has reviewed                  │
│  • Verification history                                     │
│  • Status of verified reports                               │
│  • Performance metrics                                      │
│                                                             │
│  Previous Reports Page (Optional):                          │
│  • Volunteers can also submit their own reports             │
│  • Acts as citizen when submitting                          │
│                                                             │
│  Settings Page:                                             │
│  • Same as citizen + volunteer-specific settings            │
│  • Notification preferences for verification requests       │
│  • Availability status                                      │
│                                                             │
│  Hamburger Menu:                                            │
│  • Volunteer Dashboard (Home)                               │
│  • Reports Reviewed                                         │
│  • My Reports (own submissions)                             │
│  • Previous Reports (all reports - view only)               │
│  • Public Dashboard                                         │
│  • Notifications                                            │
│  • Settings                                                 │
│  • Help & Support                                           │
│  • Logout                                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Database Interaction Points

### For ALL Modes

```typescript
// App starts
const userMode = localStorage.getItem("userMode");
const userId = localStorage.getItem("userId");

// Check authentication
if (userId) {
  // Verify session with Supabase
  const { data: session } = await supabase.auth.getSession();
  if (session) {
    setIsAuthenticated(true);
  }
}
```

### Anonymous Mode
```typescript
// Creating a report
const { data, error } = await ReportService.createReport({
  user_id: null,  // ← No user ID
  is_anonymous: true,
  need_type: selectedNeed,
  description: microUpdate,
  // ... other fields
});

// Case ID is returned, user can save it to track
toast.success(`Report submitted! Save this Case ID: ${data.case_id}`);
```

### Citizen Mode
```typescript
// Creating a report
const userId = localStorage.getItem("userId");
const { data, error } = await ReportService.createReport({
  user_id: userId,  // ← With user ID
  is_anonymous: reportAnonymously,  // User choice
  need_type: selectedNeed,
  description: microUpdate,
  // ... other fields
});

// Fetching user's reports
const { data: reports } = await ReportService.getUserReports(userId);

// AI Chat (citizen only)
const { data: chatHistory } = await supabase
  .from('ai_chat_history')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: true });
```

### Volunteer Mode
```typescript
// Fetching all reports (not just own)
const { data: allReports } = await ReportService.getAllReports({
  status: 'submitted',  // Need verification
  limit: 20
});

// Creating verification
const volunteerId = localStorage.getItem("volunteerId");
const { data, error } = await VolunteerService.createVerification({
  report_id: selectedReport.id,
  volunteer_id: volunteerId,
  verification_type: 'witness',
  verification_status: 'confirmed',
  notes: verificationNotes
});

// Fetching volunteer stats
const stats = await VolunteerService.getVolunteerStats(volunteerId);
// { total_verifications, reputation_score, verified_this_week }
```

## Navigation State Management

```typescript
// App.tsx
const [currentPage, setCurrentPage] = useState("home");

// Routing based on userMode
const renderPage = () => {
  const userMode = localStorage.getItem("userMode");
  
  switch (currentPage) {
    case "home":
      return <HomePage />;  // Adapts based on userMode
    
    case "previous-reports":
      if (userMode === "anonymous") {
        toast.error("Please log in to view previous reports");
        setCurrentPage("home");
        return <HomePage />;
      }
      return <PreviousReportsPage />;
    
    case "reports-reviewed":
      if (userMode !== "volunteer") {
        toast.error("Volunteer access only");
        setCurrentPage("home");
        return <HomePage />;
      }
      return <ReportsReviewedPage />;
    
    case "settings":
      return <SettingsPage />;  // Adapts based on userMode
    
    default:
      return <HomePage />;
  }
};
```

## Summary

### Key Points

1. **LoginPage is ALWAYS the entry point** when not authenticated
2. **Three distinct modes** with different capabilities:
   - Anonymous: Quick reporting only
   - Citizen: Full features + AI chat
   - Volunteer: Verification tools + dashboard
3. **HomePage adapts** based on userMode
4. **Database integration** is mode-aware
5. **Navigation is restricted** based on permissions
6. **All data persists** in database tables
7. **Offline support** via queue system

### File Hierarchy

```
/
├── App.tsx                    ← Main router, auth state
├── database/                  ← Database layer (NEW)
│   ├── schema.ts             ← All tables defined
│   ├── config.ts             ← Supabase client
│   ├── services/             ← Service layer
│   │   ├── userService.ts
│   │   ├── reportService.ts
│   │   └── volunteerService.ts
│   └── README.md
├── components/
│   ├── Header.tsx            ← Adapts to userMode
│   ├── pages/
│   │   ├── LoginPage.tsx     ← Entry point (3 modes)
│   │   ├── HomePage.tsx      ← Adapts to userMode
│   │   ├── PreviousReportsPage.tsx  ← Citizen/Volunteer only
│   │   ├── ReportsReviewedPage.tsx  ← Volunteer only
│   │   └── SettingsPage.tsx  ← All modes (adapted)
│   └── ...
└── ...
```
