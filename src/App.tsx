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
import { supabase } from "./database/config";

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  // Restore current page from localStorage, default to "home"
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem("currentPage") || "home";
  });
  const [showResetPassword, setShowResetPassword] = useState(false);
  const { t } = useLanguage();

  // Initialize offline sync
  useEffect(() => {
    initializeOfflineSync();
  }, []);

  // Check for existing authentication on page load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedAuth = localStorage.getItem("isAuthenticated");
        const userId = localStorage.getItem("userId");
        const userMode = localStorage.getItem("userMode");

        if (storedAuth === "true" && userId) {
          // Check if it's a hardcoded demo account (doesn't have Supabase session)
          if (userId.startsWith("demo-")) {
            // For hardcoded accounts, just restore from localStorage
            setIsAuthenticated(true);
            // Restore current page from localStorage
            const savedPage = localStorage.getItem("currentPage");
            if (savedPage) {
              setCurrentPage(savedPage);
            }
            setIsCheckingAuth(false);
            return;
          }

          // For real Supabase users, verify the session is still valid
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error("Session check error:", error);
            // Clear invalid auth state
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("userId");
            localStorage.removeItem("userMode");
            localStorage.removeItem("userName");
            localStorage.removeItem("volunteerId");
            localStorage.removeItem("currentPage");
            setIsAuthenticated(false);
          } else if (session && session.user.id === userId) {
            // Valid session, restore authentication
            setIsAuthenticated(true);
            // Restore current page from localStorage
            const savedPage = localStorage.getItem("currentPage");
            if (savedPage) {
              setCurrentPage(savedPage);
            }
          } else {
            // No valid session, clear auth state
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("userId");
            localStorage.removeItem("userMode");
            localStorage.removeItem("userName");
            localStorage.removeItem("volunteerId");
            localStorage.removeItem("currentPage");
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
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
    localStorage.setItem("currentPage", "home"); // Save home page
  };

  const handleLogout = async () => {
    try {
      // Sign out from Supabase if it's a real user (not a demo account)
      const userId = localStorage.getItem("userId");
      if (userId && !userId.startsWith("demo-")) {
        await supabase.auth.signOut();
      }

      // Clear all auth-related localStorage
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userId");
      localStorage.removeItem("userMode");
      localStorage.removeItem("userName");
      localStorage.removeItem("volunteerId");
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("currentPage");

      toast.success(t.loggedOut);
      setIsAuthenticated(false);
      setCurrentPage("home");
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local state even if Supabase signout fails
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userId");
      localStorage.removeItem("userMode");
      localStorage.removeItem("userName");
      localStorage.removeItem("volunteerId");
      localStorage.removeItem("currentPage");
      setIsAuthenticated(false);
      setCurrentPage("home");
    }
  };

  const handleNavigation = (page: string) => {
    if (page === "logout") {
      handleLogout();
    } else {
      setCurrentPage(page);
      // Save current page to localStorage
      localStorage.setItem("currentPage", page);
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

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
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