import React, { useState } from "react";
import { ShieldAlert, User, ArrowLeft, ArrowRight, Mail, Lock, UserCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../LanguageProvider";
import { motion } from "motion/react";
import { supabase } from "../../database/config";
import { UserService } from "../../database/services";

interface RegisterPageProps {
  onBack: () => void;
  onRegisterSuccess: () => void;
}

export function RegisterPage({ onBack, onRegisterSuccess }: RegisterPageProps) {
  const { t } = useLanguage();
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all required fields");
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

    if (!acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName,
            phone_number: phoneNumber || null,
          },
          emailRedirectTo: window.location.origin,
        },
      });

      if (authError) {
        toast.error(authError.message || "Failed to create account");
        setIsLoading(false);
        return;
      }

      if (!authData?.user) {
        toast.error("Account creation failed. Please try again.");
        setIsLoading(false);
        return;
      }

      // Step 2: Create user record in database
      const { data: userData, error: userError } = await UserService.createUser({
        id: authData.user.id,
        email: email,
        full_name: fullName,
        phone_number: phoneNumber || undefined,
        user_type: 'citizen',
        is_verified: false, // Will be verified via email
        is_active: true,
        preferred_language: 'en',
        number_of_dependents: 0,
        default_anonymous_reporting: false,
        default_location_sharing: 'coarse',
        share_with_responders: true,
      });

      if (userError) {
        console.error("Error creating user record:", userError);
        // User created in Auth but not in database - they can still login
        toast.warning("Account created but database record failed. You can still login.");
      }

      // Step 3: Check if email confirmation is required
      if (authData.user.email_confirmed_at) {
        // Email already confirmed (if auto-confirm is enabled)
        toast.success("Account created successfully! Logging you in...");
        
        // Auto-login
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userMode", "user");
        localStorage.setItem("userId", authData.user.id);
        localStorage.setItem("userName", fullName);
        
        setTimeout(() => {
          onRegisterSuccess();
        }, 1000);
      } else {
        // Email confirmation required
        toast.success("Account created! Please check your email to verify your account.", {
          duration: 5000,
        });
        
        // Show message and go back to login
        setTimeout(() => {
          onBack();
        }, 2000);
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
            Create Account
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-600 dark:text-gray-400"
          >
            Join the Res Q network
          </motion.p>
        </div>

        {/* Registration Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-0 shadow-2xl shadow-gray-200/50 dark:shadow-none backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
            <CardContent className="p-6">
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="full-name" className="flex items-center gap-2">
                    <UserCircle className="h-4 w-4" />
                    Full Name
                  </Label>
                  <Input
                    id="full-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={isLoading}
                    className="h-12"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="h-12"
                    required
                  />
                </div>

                {/* Phone Number (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-gray-500 text-xs">(Optional)</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={isLoading}
                    className="h-12"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                  </Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Create a password (min. 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="h-12"
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Must be at least 6 characters long
                  </p>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    className="h-12"
                    required
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="accept-terms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    disabled={isLoading}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <label
                    htmlFor="accept-terms"
                    className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
                  >
                    I agree to the{" "}
                    <button
                      type="button"
                      className="text-blue-600 hover:underline dark:text-blue-400"
                      onClick={() => toast.info("Terms and conditions coming soon")}
                    >
                      Terms and Conditions
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="text-blue-600 hover:underline dark:text-blue-400"
                      onClick={() => toast.info("Privacy policy coming soon")}
                    >
                      Privacy Policy
                    </button>
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/30"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                {/* Back to Login */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={onBack}
                    className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                    disabled={isLoading}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50"
        >
          <p className="text-xs text-center text-blue-800 dark:text-blue-300">
            🔒 Your data is secure and encrypted
          </p>
          <p className="text-xs text-center text-blue-600 dark:text-blue-400 mt-1">
            We'll send you a verification email to confirm your account
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

