# Emergency Response App (EMR)

A real-time emergency reporting and response system built with React, TypeScript, and Supabase.

## 🚀 Quick Start

```bash
npm i          # Install dependencies
npm run dev    # Start development server (http://localhost:3000)
```

## 📊 Application Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER AUTHENTICATION                      │
├─────────────────────────────────────────────────────────────────┤
│  Login (Citizen/Volunteer) → Register → Password Reset         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         CITIZEN FLOW                             │
├─────────────────────────────────────────────────────────────────┤
│  1. Submit Emergency Report                                     │
│     ├─ Select Need Type (Water/Medical/Shelter/Food)            │
│     ├─ Enter Description & Location (Auto-detected)            │
│     ├─ Add Photo & Dependents Info                              │
│     └─ Submit → Saved to Supabase Database                      │
│                                                                  │
│  2. View Previous Reports                                       │
│  3. Track Report Status                                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       VOLUNTEER FLOW                            │
├─────────────────────────────────────────────────────────────────┤
│  1. View Dashboard → See Pending Reports                       │
│  2. Review Report Details                                       │
│  3. Verify/Reject Report                                        │
│     ├─ Add Verification Notes                                   │
│     ├─ Upload Verification Photo                                │
│     └─ Update Status (Verified/Rejected/In Progress)            │
│                                                                  │
│  4. View Reviewed Reports History                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA FLOW                                  │
├─────────────────────────────────────────────────────────────────┤
│  Frontend (React) → Supabase Auth → Supabase Database           │
│                                                                    │
│  • Authentication: Supabase Auth                                │
│  • Database: PostgreSQL (via Supabase)                          │
│  • Real-time: Supabase Realtime                                 │
│  • Offline Support: Local Storage Queue                         │
└─────────────────────────────────────────────────────────────────┘
```

## 🏗️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Supabase (Auth + Database + Realtime)
- **UI**: Tailwind CSS + shadcn/ui
- **State**: React Hooks + Local Storage

## 🔑 Key Features

- ✅ User Registration & Authentication
- ✅ Password Reset (Email + In-App)
- ✅ Emergency Report Submission
- ✅ Location Auto-detection with Reverse Geocoding
- ✅ Volunteer Verification System
- ✅ Offline Mode Support
- ✅ Real-time Updates
- ✅ Multi-language Support

## 📁 Project Structure

```
src/
├── components/
│   ├── pages/
│   │   ├── HomePage.tsx          # Main dashboard (Citizen/Volunteer)
│   │   ├── LoginPage.tsx         # Authentication
│   │   ├── RegisterPage.tsx      # User registration
│   │   ├── ResetPasswordPage.tsx # Password reset
│   │   └── SettingsPage.tsx     # Profile & settings
│   └── ui/                       # Reusable UI components
├── database/
│   ├── config.ts                 # Supabase configuration
│   ├── schema.ts                 # TypeScript types
│   └── services/                 # Database service layer
└── App.tsx                       # Main app component
```

## 🔐 Environment Setup

Create `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📝 Database Setup

1. Run `database_schema.sql` in Supabase SQL Editor
2. Run `auth_user_sync_trigger.sql` for auto user sync
3. Configure RLS policies in Supabase Dashboard

## 🌐 Access

- **Local**: http://localhost:3000
- **Network**: http://[your-ip]:3000

---

Built with ❤️ for Emergency Response Management
