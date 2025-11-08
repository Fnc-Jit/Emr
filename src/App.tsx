import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Toaster } from "./components/ui/sonner";
import { LoginPage } from "./components/pages/LoginPage";
import { HomePage } from "./components/pages/HomePage";
import { PreviousReportsPage } from "./components/pages/PreviousReportsPage";
import { ReportsReviewedPage } from "./components/pages/ReportsReviewedPage";
import { MyCertificatesPage } from "./components/pages/MyCertificatesPage";
import { NotificationsPage } from "./components/pages/NotificationsPage";
import { SettingsPage } from "./components/pages/SettingsPage";
import { ResetPasswordPage } from "./components/pages/ResetPasswordPage";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider, useLanguage } from "./components/LanguageProvider";
import { toast } from "sonner@2.0.3";
import { initializeOfflineSync } from "./database/offlineQueue";

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const { t } = useLanguage();

  // Initialize offline sync
  useEffect(() => {
    initializeOfflineSync();
  }, []);

  // Check if we're on the reset password route (check both pathname and hash)
  useEffect(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    
    // Check if pathname includes reset-password
    if (path === '/reset-password' || path.includes('reset-password')) {
      setShowResetPassword(true);
      return;
    }
    
    // Check if hash contains recovery token (Supabase uses hash fragments)
    if (hash && (hash.includes('type=recovery') || hash.includes('access_token'))) {
      setShowResetPassword(true);
      return;
    }
    
    // Check query params for reset token
    const params = new URLSearchParams(window.location.search);
    if (params.get('type') === 'recovery' || params.get('token')) {
      setShowResetPassword(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage("home"); // Direct to home page after login
  };

  const handleLogout = () => {
    toast.success(t.loggedOut);
    setIsAuthenticated(false);
    setCurrentPage("home");
  };

  const handleNavigation = (page: string) => {
    if (page === "logout") {
      handleLogout();
    } else {
      setCurrentPage(page);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "previous-reports":
        return <PreviousReportsPage />;
      case "reports-reviewed":
        return <ReportsReviewedPage />;
      case "certificates":
        return <MyCertificatesPage />;
      case "notifications":
        return <NotificationsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  // Show reset password page if on reset route
  if (showResetPassword) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <ResetPasswordPage
          onSuccess={() => {
            setShowResetPassword(false);
            window.history.replaceState({}, document.title, '/');
            setIsAuthenticated(false);
            toast.success("Password reset successful! Please log in with your new password.");
          }}
          onBack={() => {
            setShowResetPassword(false);
            window.history.replaceState({}, document.title, '/');
          }}
        />
      </>
    );
  }

  return (
    <>
      {/* Show login page if not authenticated */}
      {!isAuthenticated ? (
        <>
          <Toaster position="top-center" richColors />
          <LoginPage onLogin={handleLogin} />
        </>
      ) : (
        <div className="min-h-screen">
          <Toaster position="top-center" richColors />
          {/* Header */}
          <Header onNavigate={handleNavigation} currentPage={currentPage} />
          
          {/* Main Content */}
          <main className="container mx-auto px-4 py-8">
            {renderPage()}
          </main>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}