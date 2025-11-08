# Quick Reference Guide

## 🎯 Key Concepts

### Three User Modes

| Mode | Access | Features | Database Fields |
|------|--------|----------|-----------------|
| **Anonymous** | No login | Quick report only | `user_id = null`, `is_anonymous = true` |
| **Citizen** | User login | All features + AI chat | `user_type = 'citizen'` |
| **Volunteer** | Volunteer login | Verification tools | `user_type = 'volunteer'`, record in `volunteers` table |

### Login Flow

```typescript
// LoginPage.tsx sets userMode
localStorage.setItem("userMode", "anonymous" | "user" | "volunteer");
localStorage.setItem("userId", "<user_id>");  // If logged in
localStorage.setItem("volunteerId", "<volunteer_id>");  // If volunteer

// App.tsx checks authentication
const isAuthenticated = localStorage.getItem("userMode") !== null;
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `/App.tsx` | Main router, handles authentication state |
| `/components/pages/LoginPage.tsx` | Entry point, 3 login modes |
| `/components/pages/HomePage.tsx` | Adapts based on userMode |
| `/components/Header.tsx` | Navigation, adapts to userMode |
| `/components/translations.ts` | All text in 4 languages |
| `/database/schema.ts` | Complete database schema |
| `/database/services/` | Database service layer |
| `/DATABASE_INTEGRATION_GUIDE.md` | How to connect database |
| `/FLOW_HIERARCHY.md` | Visual flow diagrams |

## 🗄️ Database Quick Reference

### Tables

```typescript
// Users
users {
  id, email, full_name, user_type,
  preferred_language, number_of_dependents
}

// Volunteers
volunteers {
  id, user_id, volunteer_id,
  verification_status, total_verifications
}

// Reports
emergency_reports {
  id, case_id, user_id, need_type,
  description, priority, status, location
}

// Verifications
report_verifications {
  id, report_id, volunteer_id,
  verification_status, notes
}
```

### Service Methods

```typescript
// User operations
import { UserService } from '@/database/services';

await UserService.createUser(userData);
await UserService.getUserById(userId);
await UserService.updateUser(userId, updates);

// Report operations
import { ReportService } from '@/database/services';

await ReportService.createReport(reportData);
await ReportService.getUserReports(userId, filters);
await ReportService.getAllReports(filters);
await ReportService.updateReport(reportId, updates);

// Volunteer operations
import { VolunteerService } from '@/database/services';

await VolunteerService.createVerification(verificationData);
await VolunteerService.getVolunteerStats(volunteerId);
```

## 🔄 Integration Pattern

### Replace Mock Data

**Before (Mock):**
```typescript
const mockReports = [{ id: "1", /* ... */ }];
const [reports, setReports] = useState(mockReports);
```

**After (Database):**
```typescript
import { ReportService } from '@/database/services';

const [reports, setReports] = useState([]);

useEffect(() => {
  async function fetchReports() {
    const userId = localStorage.getItem('userId');
    const { data, error } = await ReportService.getUserReports(userId);
    if (!error) setReports(data);
  }
  fetchReports();
}, []);
```

### Replace Mock Submission

**Before (Mock):**
```typescript
const handleSubmit = () => {
  const newReport = { id: Date.now(), /* ... */ };
  toast.success("Report submitted!");
};
```

**After (Database):**
```typescript
import { ReportService } from '@/database/services';

const handleSubmit = async () => {
  const { data, error } = await ReportService.createReport({
    user_id: localStorage.getItem('userId'),
    need_type: selectedNeed,
    description: microUpdate,
    // ... other fields
  });
  
  if (!error) {
    toast.success(`Report submitted! Case: ${data.case_id}`);
  }
};
```

## 🎨 Component Patterns

### Detect User Mode

```typescript
import { useEffect, useState } from 'react';

function MyComponent() {
  const [userMode, setUserMode] = useState<string>("");
  
  useEffect(() => {
    const mode = localStorage.getItem("userMode") || "anonymous";
    setUserMode(mode);
  }, []);
  
  return (
    <>
      {userMode === "volunteer" && <VolunteerSection />}
      {userMode === "user" && <UserSection />}
      {userMode === "anonymous" && <AnonymousSection />}
    </>
  );
}
```

### Use Translations

```typescript
import { useLanguage } from './LanguageProvider';

function MyComponent() {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t.emergencyResponse}</h1>
      <button>{t.submitReport}</button>
    </div>
  );
}
```

### Toast Notifications

```typescript
import { toast } from 'sonner@2.0.3';

// Success
toast.success("Operation successful!");

// Error
toast.error("Something went wrong");

// Info
toast.info("Processing...");

// With custom duration
toast.success("Saved!", { duration: 3000 });
```

## 🌐 Translations

### Adding New Translations

1. Add to interface in `/components/translations.ts`:
```typescript
export interface Translations {
  // ... existing
  myNewKey: string;
}
```

2. Add to all language objects:
```typescript
en: {
  // ... existing
  myNewKey: "My English Text",
},
hi: {
  // ... existing
  myNewKey: "मेरा हिंदी पाठ",
},
kn: {
  // ... existing
  myNewKey: "ನನ್ನ ಕನ್ನಡ ಪಠ್ಯ",
},
ml: {
  // ... existing
  myNewKey: "എന്റെ മലയാളം ടെക്സ്റ്റ്",
}
```

3. Use in component:
```typescript
const { t } = useLanguage();
<p>{t.myNewKey}</p>
```

## 🔐 Security Checklist

- [ ] Never commit `.env.local`
- [ ] Use RLS policies (defined in schema)
- [ ] Validate all user inputs
- [ ] Sanitize user content before display
- [ ] Use HTTPS in production
- [ ] Implement rate limiting
- [ ] Regular security audits
- [ ] Keep dependencies updated

## 📱 Testing Checklist

### Anonymous Mode
- [ ] Can access quick report without login
- [ ] Can submit report
- [ ] Cannot access previous reports
- [ ] Cannot access AI chat
- [ ] Can change language and theme

### Citizen Mode
- [ ] Can log in
- [ ] Can submit reports with user ID
- [ ] Can view previous reports
- [ ] Can access AI chat assistant
- [ ] Can edit profile
- [ ] Can change all settings

### Volunteer Mode
- [ ] Can log in as volunteer
- [ ] Can see volunteer dashboard
- [ ] Can view all reports
- [ ] Can verify reports
- [ ] Can view reports reviewed
- [ ] Cannot see AI chat (correctly excluded)

## 🚀 Deployment Checklist

- [ ] Set up Supabase project
- [ ] Run database migrations
- [ ] Configure environment variables
- [ ] Test all user flows
- [ ] Test offline functionality
- [ ] Optimize images and assets
- [ ] Configure CDN (if needed)
- [ ] Set up monitoring
- [ ] Configure backup strategy
- [ ] Document admin procedures
- [ ] Train support staff

## 📞 Support

### Documentation Files
- `/DATABASE_INTEGRATION_GUIDE.md` - Complete integration guide
- `/FLOW_HIERARCHY.md` - Visual flow diagrams
- `/PROJECT_STATUS.md` - Project status and checklist
- `/database/README.md` - Database documentation
- `/QUICK_REFERENCE.md` - This file

### External Resources
- Supabase Docs: https://supabase.com/docs
- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- TypeScript: https://www.typescriptlang.org/

## 💡 Common Tasks

### Add a New Page

1. Create page component in `/components/pages/`:
```typescript
export function MyNewPage() {
  const { t } = useLanguage();
  return <div>{t.myPageTitle}</div>;
}
```

2. Import in `/App.tsx`:
```typescript
import { MyNewPage } from './components/pages/MyNewPage';
```

3. Add to router:
```typescript
case "my-new-page":
  return <MyNewPage />;
```

4. Add to navigation in `/components/Header.tsx`

### Add Database Table

1. Define interface in `/database/schema.ts`:
```typescript
export interface MyTable {
  id: string;
  // ... fields
}
```

2. Add SQL schema:
```typescript
export const myTableSchema = `
  CREATE TABLE my_table (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    // ... columns
  );
`;
```

3. Create service in `/database/services/myService.ts`
4. Add to `/database/services/index.ts`
5. Run migration in Supabase

### Update Existing Feature

1. Locate component in `/components/pages/`
2. Update UI/logic as needed
3. Update translations if adding text
4. Test all three user modes
5. Update documentation if behavior changes

## 🎓 Best Practices

1. **Always use translations** - Never hardcode English text
2. **Check userMode** - Adapt features to user type
3. **Handle errors gracefully** - Show user-friendly messages
4. **Validate inputs** - Both client and server side
5. **Use service layer** - Never call Supabase directly from components
6. **Test offline mode** - Simulate poor connectivity
7. **Respect privacy** - Honor user privacy settings
8. **Optimize performance** - Lazy load, paginate, cache
9. **Document changes** - Update relevant docs
10. **Follow TypeScript types** - Use defined interfaces

---

**Last Updated:** November 7, 2025
**Version:** 1.0 (Database-Ready)
