import { useState } from "react";
import { ShieldAlert, User, UserPlus, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../LanguageProvider";
import { motion } from "motion/react";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const { t } = useLanguage();
  
  // User login state
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRememberMe, setUserRememberMe] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  
  // Volunteer login state
  const [volEmail, setVolEmail] = useState("");
  const [volPassword, setVolPassword] = useState("");
  const [volRememberMe, setVolRememberMe] = useState(false);
  const [isVolLoading, setIsVolLoading] = useState(false);

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userEmail || !userPassword) {
      toast.error(t.fillAllFields);
      return;
    }

    setIsUserLoading(true);

    // Simulate login
    setTimeout(() => {
      // Demo credentials for user login
      if (userEmail === "user@emergency.com" && userPassword === "user123") {
        if (userRememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("userEmail", userEmail);
        }
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userMode", "user");
        localStorage.setItem("userName", "John Citizen");
        toast.success(t.loginSuccessful);
        onLogin();
      } else {
        toast.error(t.invalidCredentials || "Invalid credentials. Use: user@emergency.com / user123");
      }
      setIsUserLoading(false);
    }, 800);
  };

  const handleVolunteerLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!volEmail || !volPassword) {
      toast.error(t.fillAllFields);
      return;
    }

    setIsVolLoading(true);

    // Simulate login
    setTimeout(() => {
      // Demo credentials for volunteer login
      if (volEmail === "volunteer@emergency.com" && volPassword === "emergency2024") {
        if (volRememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("userEmail", volEmail);
        }
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userMode", "volunteer");
        localStorage.setItem("userName", "Volunteer Smith");
        toast.success(t.loginSuccessful);
        onLogin();
      } else {
        toast.error(t.invalidCredentials || "Invalid credentials. Use: volunteer@emergency.com / emergency2024");
      }
      setIsVolLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* App Title */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center w-20 h-20 mb-4 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 shadow-lg shadow-red-500/30"
          >
            <ShieldAlert className="h-10 w-10 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl mb-2 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"
          >
            {t.emergencyResponse}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-600 dark:text-gray-400"
          >
            Secure access for emergency reporting
          </motion.p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-0 shadow-2xl shadow-gray-200/50 dark:shadow-none backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
            <CardContent className="p-6">
              <Tabs defaultValue="user" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="user" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Citizen
                  </TabsTrigger>
                  <TabsTrigger value="volunteer" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Volunteer
                  </TabsTrigger>
                </TabsList>

                {/* User Login */}
                <TabsContent value="user" className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-[#313244] rounded-lg border border-gray-200 dark:border-[#45475a] text-sm text-center">
                    <p className="text-gray-800 dark:text-[#bac2de]">
                      <strong>Demo:</strong> user@emergency.com / user123
                    </p>
                  </div>

                  <form onSubmit={handleUserLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="user-email">{t.email}</Label>
                      <Input
                        id="user-email"
                        type="email"
                        placeholder="Enter your email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        disabled={isUserLoading}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="user-password">{t.password}</Label>
                      <Input
                        id="user-password"
                        type="password"
                        placeholder={t.enterPassword}
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        disabled={isUserLoading}
                        className="h-12"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="user-remember"
                          checked={userRememberMe}
                          onCheckedChange={(checked) => setUserRememberMe(checked as boolean)}
                        />
                        <label
                          htmlFor="user-remember"
                          className="text-sm cursor-pointer select-none text-gray-600 dark:text-gray-400"
                        >
                          {t.rememberMe}
                        </label>
                      </div>
                      <button
                        type="button"
                        className="text-sm text-[#11111b] hover:text-gray-800 dark:text-[#b4befe] dark:hover:text-[#cba6f7] hover:underline"
                        onClick={() => toast.info("Password recovery coming soon")}
                      >
                        {t.forgotPassword}
                      </button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/30"
                      disabled={isUserLoading}
                    >
                      {isUserLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          {t.signIn}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        className="text-[#11111b] dark:text-[#b4befe] hover:underline"
                        onClick={() => toast.info("Registration coming soon")}
                      >
                        {t.createAccount}
                      </button>
                    </p>
                  </form>
                </TabsContent>

                {/* Volunteer Login */}
                <TabsContent value="volunteer" className="space-y-4">
                  <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900 text-sm text-center">
                    <p className="text-green-800 dark:text-green-300">
                      <strong>Demo:</strong> volunteer@emergency.com / emergency2024
                    </p>
                  </div>

                  <form onSubmit={handleVolunteerLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="vol-email">{t.email}</Label>
                      <Input
                        id="vol-email"
                        type="email"
                        placeholder="Enter your email"
                        value={volEmail}
                        onChange={(e) => setVolEmail(e.target.value)}
                        disabled={isVolLoading}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vol-password">{t.password}</Label>
                      <Input
                        id="vol-password"
                        type="password"
                        placeholder={t.enterPassword}
                        value={volPassword}
                        onChange={(e) => setVolPassword(e.target.value)}
                        disabled={isVolLoading}
                        className="h-12"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="vol-remember"
                          checked={volRememberMe}
                          onCheckedChange={(checked) => setVolRememberMe(checked as boolean)}
                        />
                        <label
                          htmlFor="vol-remember"
                          className="text-sm cursor-pointer select-none text-gray-600 dark:text-gray-400"
                        >
                          {t.rememberMe}
                        </label>
                      </div>
                      <button
                        type="button"
                        className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 hover:underline"
                        onClick={() => toast.info("Password recovery coming soon")}
                      >
                        {t.forgotPassword}
                      </button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 shadow-lg shadow-green-500/30"
                      disabled={isVolLoading}
                    >
                      {isVolLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          {t.signIn}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                      {t.volunteerAccessOnly}
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Multi-channel Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 p-4 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50"
        >
          <p className="text-xs text-center text-gray-600 dark:text-gray-400">
            🚨 Multiple ways to report: App • SMS • WhatsApp • IVR
          </p>
          <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-1">
            24/7 monitoring • Secure • Private
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
