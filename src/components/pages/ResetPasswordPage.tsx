import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner@2.0.3";
import { motion } from "motion/react";
import { supabase } from "../../database/config";
import { useLanguage } from "../LanguageProvider";

interface ResetPasswordPageProps {
  onSuccess?: () => void;
  onBack?: () => void;
}

export function ResetPasswordPage({ onSuccess, onBack }: ResetPasswordPageProps) {
  const { t } = useLanguage();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);

  // Check for password reset token in URL and handle Supabase session
  useEffect(() => {
    const checkResetToken = async () => {
      try {
        // Supabase automatically handles hash fragments and sets the session
        // We just need to check if we have a valid session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        // Also check hash fragments manually (in case auto-handling didn't work)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const type = hashParams.get('type');
        const refreshToken = hashParams.get('refresh_token');
        
        // Check query params as fallback
        const queryParams = new URLSearchParams(window.location.search);
        const queryType = queryParams.get('type');
        const queryToken = queryParams.get('token');

        // If we have tokens in hash, set the session
        if (accessToken && type === 'recovery' && refreshToken) {
          const { data: { session: newSession }, error: setError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (setError) {
            console.error("Session set error:", setError);
            toast.error("Invalid or expired reset link. Please request a new one.");
            setIsValidToken(false);
            setIsVerifying(false);
            return;
          }

          if (newSession) {
            setIsValidToken(true);
            toast.success("Reset link verified. Please enter your new password.");
            setIsVerifying(false);
            return;
          }
        }

        // Check if we have a valid session (either from auto-handling or manual set)
        if (session && !sessionError) {
          setIsValidToken(true);
          toast.success("Reset link verified. Please enter your new password.");
        } else if (queryType === 'recovery' || queryToken) {
          // If we have query params but no session, the link might be expired
          toast.error("Invalid or expired reset link. Please request a new password reset.");
          setIsValidToken(false);
        } else {
          toast.error("Invalid reset link. Please request a new password reset.");
          setIsValidToken(false);
        }
      } catch (error: any) {
        console.error("Token verification error:", error);
        toast.error("Failed to verify reset link. Please try again.");
        setIsValidToken(false);
      } finally {
        setIsVerifying(false);
      }
    };

    checkResetToken();
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsResetting(true);
    try {
      // Update password using Supabase Auth
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        console.error("Password update error:", error);
        
        if (error.message.includes("session")) {
          toast.error("Your reset link has expired. Please request a new one.");
        } else {
          toast.error(error.message || "Failed to update password. Please try again.");
        }
      } else {
        toast.success("Password updated successfully! You can now log in with your new password.", {
          duration: 5000,
        });
        
        // Clear the URL hash/query params
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Call success callback or redirect
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 2000);
        } else {
          // Redirect to login after 2 seconds
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        }
      }
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsResetting(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-gray-600 dark:text-gray-400">Verifying reset link...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Invalid Reset Link</CardTitle>
            <CardDescription className="text-center">
              This password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => {
                if (onBack) {
                  onBack();
                } else {
                  window.location.href = '/';
                }
              }}
              className="w-full"
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
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
        <Card className="border-0 shadow-2xl shadow-gray-200/50 dark:shadow-none backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30"
            >
              <Lock className="h-8 w-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl">Reset Your Password</CardTitle>
            <CardDescription>
              Enter your new password below. Make sure it's at least 6 characters long.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password (min. 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isResetting}
                    className="h-12 pr-10"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isResetting}
                    className="h-12 pr-10"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {password && confirmPassword && password === confirmPassword && password.length >= 6 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950/30 rounded-lg text-sm text-green-700 dark:text-green-300"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Passwords match</span>
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg shadow-blue-500/30"
                disabled={isResetting || !password || !confirmPassword || password !== confirmPassword}
              >
                {isResetting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Update Password
                  </>
                )}
              </Button>

              {onBack && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onBack}
                  className="w-full"
                  disabled={isResetting}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

