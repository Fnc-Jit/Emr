import { useState } from "react";
import { Header } from "./components/Header";
import { Toaster } from "./components/ui/sonner";
import { LoginPage } from "./components/pages/LoginPage";
import { HomePage } from "./components/pages/HomePage";
import { PreviousReportsPage } from "./components/pages/PreviousReportsPage";
import { ReportsReviewedPage } from "./components/pages/ReportsReviewedPage";
import { MyCertificatesPage } from "./components/pages/MyCertificatesPage";
import { NotificationsPage } from "./components/pages/NotificationsPage";
import { SettingsPage } from "./components/pages/SettingsPage";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider, useLanguage } from "./components/LanguageProvider";
import { toast } from "sonner@2.0.3";

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const { t } = useLanguage();

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