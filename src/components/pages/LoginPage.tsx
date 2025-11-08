import { useState } from "react";
import { ShieldAlert, User, UserPlus, ArrowRight, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../LanguageProvider";
import { motion } from "motion/react";
import { supabase } from "../../database/config";
import { UserService, VolunteerService } from "../../database/services";
import { RegisterPage } from "./RegisterPage";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const { t } = useLanguage();
  
  // Show registration page state
  const [showRegister, setShowRegister] = useState(false);
  
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
  
  // Password reset state
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [resetMode, setResetMode] = useState<"user" | "volunteer">("user");

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userEmail || !userPassword) {
      toast.error(t.fillAllFields);
      return;
    }

    setIsUserLoading(true);

    try {
      // Authenticate via Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: userPassword,
      });

      if (authError) {
        // Fallback to demo credentials if Supabase is not configured
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
          toast.error(authError.message || t.invalidCredentials || "Invalid credentials");
        }
        setIsUserLoading(false);
        return;
      }

      if (authData?.user) {
        // Get user details from database
        const { data: userData, error: userError } = await UserService.getUserById(authData.user.id);
        
        if (userError || !userData) {
          toast.error("User account not found in database");
          setIsUserLoading(false);
          return;
        }

        // Check if user is a citizen (not a volunteer)
        if (userData.user_type === 'volunteer') {
          toast.error("Please use the Volunteer login tab");
          setIsUserLoading(false);
          return;
        }

        // Update last login
        await UserService.updateLastLogin(authData.user.id);

        // Store authentication data
        if (userRememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("userEmail", userEmail);
        }
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userMode", "user");
        localStorage.setItem("userId", authData.user.id);
        localStorage.setItem("userName", userData.full_name || userEmail);
        
        toast.success(t.loginSuccessful);
        onLogin();
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setIsUserLoading(false);
    }
  };

  const handleVolunteerLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!volEmail || !volPassword) {
      toast.error(t.fillAllFields);
      return;
    }

    setIsVolLoading(true);

    try {
      // Authenticate via Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: volEmail,
        password: volPassword,
      });

      if (authError) {
        // Hardcoded volunteer accounts (fallback if Supabase auth fails or account doesn't exist)
        const hardcodedVolunteers = [
          {
            email: "volunteer@emergency.com",
            password: "emergency2024",
            name: "Volunteer Smith",
            userId: "demo-volunteer-1",
            volunteerId: "demo-vol-1"
          },
          {
            email: "user123@gmail.com",
            password: "user1234",
            name: "Volunteer User",
            userId: "demo-volunteer-2",
            volunteerId: "demo-vol-2"
          },
          {
            email: "volunteer@test.com",
            password: "volunteer123",
            name: "Test Volunteer",
            userId: "demo-volunteer-3",
            volunteerId: "demo-vol-3"
          }
        ];

        const hardcodedVol = hardcodedVolunteers.find(
          v => v.email === volEmail && v.password === volPassword
        );

        if (hardcodedVol) {
          if (volRememberMe) {
            localStorage.setItem("rememberMe", "true");
            localStorage.setItem("userEmail", volEmail);
          }
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userMode", "volunteer");
          localStorage.setItem("userId", hardcodedVol.userId);
          localStorage.setItem("volunteerId", hardcodedVol.volunteerId);
          localStorage.setItem("userName", hardcodedVol.name);
          toast.success(t.loginSuccessful);
          // Dispatch event for HomePage to listen to
          window.dispatchEvent(new CustomEvent("userLoggedIn", { detail: { userMode: "volunteer" } }));
          onLogin();
        } else {
          toast.error(authError.message || t.invalidCredentials || "Invalid credentials");
        }
        setIsVolLoading(false);
        return;
      }

      if (authData?.user) {
        // Check if user is an approved volunteer
        const { data: volunteerData, error: volunteerError } = await VolunteerService.getVolunteerByUserId(authData.user.id);
        
        if (volunteerError || !volunteerData) {
          toast.error("Volunteer account not found or not approved");
          setIsVolLoading(false);
          return;
        }

        // Check verification status
        if (volunteerData.verification_status !== 'approved') {
          toast.error("Your volunteer account is pending approval");
          setIsVolLoading(false);
          return;
        }

        // Get user details
        const { data: userData } = await UserService.getUserById(authData.user.id);

        // Update last login
        await UserService.updateLastLogin(authData.user.id);

        // Store authentication data
        if (volRememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("userEmail", volEmail);
        }
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userMode", "volunteer");
        localStorage.setItem("userId", authData.user.id);
        localStorage.setItem("volunteerId", volunteerData.id);
        localStorage.setItem("userName", userData?.full_name || volEmail);
        
        toast.success(t.loginSuccessful);
        // Dispatch event for HomePage to listen to
        window.dispatchEvent(new CustomEvent("userLoggedIn", { detail: { userMode: "volunteer" } }));
        onLogin();
      }
    } catch (error: any) {
      console.error("Volunteer login error:", error);
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setIsVolLoading(false);
    }
  };

  // Handle password reset - Connected to Supabase Auth
  const handlePasswordReset = async () => {
    if (!resetEmail || !resetEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsResetting(true);
    try {
      // Use Supabase Auth to send password reset email
      const { data, error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
        // Optional: Customize email template
        // emailRedirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error("Supabase password reset error:", error);
        
        // Handle specific error cases
        if (error.message.includes("rate limit")) {
          toast.error("Too many requests. Please wait a moment and try again.");
        } else if (error.message.includes("email")) {
          toast.error("Invalid email address. Please check and try again.");
        } else {
          toast.error(error.message || "Failed to send reset email. Please try again.");
        }
      } else {
        // Success - email sent via Supabase Auth
        console.log("Password reset email sent successfully to:", resetEmail);
        toast.success("Password reset email sent! Please check your inbox and spam folder.", {
          duration: 5000,
        });
        setShowResetDialog(false);
        setResetEmail("");
      }
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsResetting(false);
    }
  };

  // Show registration page if requested
  if (showRegister) {
    return (
      <RegisterPage
        onBack={() => setShowRegister(false)}
        onRegisterSuccess={onLogin}
      />
    );
  }

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
                        onClick={() => {
                          setResetMode("user");
                          setResetEmail(userEmail);
                          setShowResetDialog(true);
                        }}
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
                        className="text-[#11111b] dark:text-[#b4befe] hover:underline font-medium"
                        onClick={() => setShowRegister(true)}
                      >
                        {t.createAccount || "Create Account"}
                      </button>
                    </p>
                  </form>
                </TabsContent>

                {/* Volunteer Login */}
                <TabsContent value="volunteer" className="space-y-4">
                  <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900 text-sm text-center">
                    <p className="text-green-800 dark:text-green-300">
                      <strong>Demo:</strong> volunteer@emergency.com / emergency2024<br/>
                      <strong>Or:</strong> user123@gmail.com / user1234
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
                        onClick={() => {
                          setResetMode("volunteer");
                          setResetEmail(volEmail);
                          setShowResetDialog(true);
                        }}
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

      {/* Password Reset Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Reset Password
            </DialogTitle>
            <DialogDescription>
              Enter your email address and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email Address</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                disabled={isResetting}
                className="h-12"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isResetting) {
                    handlePasswordReset();
                  }
                }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              You'll receive an email from Supabase with instructions to reset your password. 
              Please check your inbox and spam folder. The link will expire in 1 hour.
            </p>
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900 text-xs text-blue-800 dark:text-blue-300">
              <p className="font-semibold mb-1">📧 Email Configuration:</p>
              <p>Make sure email is enabled in your Supabase Dashboard → Authentication → Email Templates</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowResetDialog(false);
                setResetEmail("");
              }}
              disabled={isResetting}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePasswordReset}
              disabled={isResetting || !resetEmail}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              {isResetting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  Send Reset Link
                  <Mail className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
