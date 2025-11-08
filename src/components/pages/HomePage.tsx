import { useState, useRef, useEffect } from "react";
import { 
  Droplets, 
  Heart, 
  Home as HomeIcon, 
  Utensils, 
  AlertCircle,
  Camera,
  MapPin,
  Users,
  Shield,
  Send,
  Smartphone,
  CheckCircle,
  Clock,
  TrendingUp,
  Award,
  X,
  Upload,
  Zap,
  Check,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  RefreshCw
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
import { motion, AnimatePresence } from "motion/react";
import { ChatBox } from "../ChatBox";
import { ReportService, VolunteerService } from "../../database/services";
import { supabase } from "../../database/config";

// Improved AI Chat Component with Enhanced UI
function AIChatDropdown() {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.trim().length > 0 && !isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    setInputValue("");
  };

  // Handle Escape key to close chatbot
  useEffect(() => {
    if (!isExpanded) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
        setInputValue("");
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isExpanded]);

  return (
    <>
      {/* Enhanced Input Bar - Always visible when not expanded */}
      {!isExpanded && (
        <div className="flex justify-center w-full p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-2xl"
          >
            <div className="relative group">
              {/* Gradient background with blur effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Main input container */}
              <div className="relative flex items-center gap-3 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full border-2 border-purple-200/50 dark:border-purple-800/50 shadow-lg hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300">
                {/* Icon */}
                <div className="flex-shrink-0 p-2 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md">
                  <MessageCircle className="h-5 w-5" />
                </div>
                
                {/* Input field */}
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder={t.askAIForHelp || "Ask anything..."}
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
                
                {/* Animated gradient indicator */}
                {inputValue.length > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600"
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Enhanced Half Screen Chat - Expands when input is entered */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Enhanced Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 z-[9998] bg-black/30 dark:bg-black/50 backdrop-blur-sm"
            />
            
            {/* Enhanced Half Screen Chat Panel */}
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="fixed bottom-0 left-0 right-0 z-[9999] bg-gradient-to-b from-white via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 rounded-t-3xl shadow-2xl border-t-2 border-purple-200/50 dark:border-purple-800/50"
              style={{ height: '55vh', maxHeight: '650px' }}
            >
              {/* Decorative gradient overlay */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-pink-500/10 rounded-t-3xl pointer-events-none" />
              
              {/* Handle bar indicator */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
              
              {/* Half Screen Chat Content */}
              <div className="w-full h-full flex items-start justify-center px-6 py-6 pb-8 overflow-y-auto relative">
                <div className="w-full max-w-4xl h-full">
                  <ChatBox 
                    inline={true} 
                    compact={false}
                    initialInput={inputValue}
                    onClose={handleClose}
                    isExpanded={true}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

type NeedType = "water" | "medical" | "shelter" | "food" | "other" | null;

interface QueuedReport {
  id: string;
  needType: NeedType;
  microUpdate: string;
  timestamp: string;
  status: "queued" | "sending" | "sent" | "failed";
}

interface ReportData {
  id: string;
  caseId: string;
  needType: NeedType;
  description: string;
  location: string; // Human-readable location name
  locationCoords?: { lat: number; lng: number }; // GPS coordinates for map
  dependents: number;
  timestamp: string;
  priority?: "high" | "medium" | "low"; // Report priority
}

export function HomePage() {
  const { t } = useLanguage();
  const [userMode, setUserMode] = useState<string>("user");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedNeed, setSelectedNeed] = useState<NeedType>(null);
  const [microUpdate, setMicroUpdate] = useState("");
  const [dependents, setDependents] = useState("0");
  const [customDependents, setCustomDependents] = useState("");
  const [selectedFlair, setSelectedFlair] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState("Detecting location...");
  const [locationCoords, setLocationCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [vulnerableTags, setVulnerableTags] = useState<string[]>([]);
  const [shareWithResponders, setShareWithResponders] = useState(true);
  const [sharePreciseCoords, setSharePreciseCoords] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [queuedReports, setQueuedReports] = useState<QueuedReport[]>([]);
  const [isOnline] = useState(navigator.onLine);
  
  // Dialog state
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
  const [verificationNotes, setVerificationNotes] = useState("");
  const [verificationPhoto, setVerificationPhoto] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const verificationPhotoInputRef = useRef<HTMLInputElement>(null);
  
  // Reports data for volunteer dashboard - fetched from Supabase
  const [mockReports, setMockReports] = useState<ReportData[]>([]);
  const [reportsLoading, setReportsLoading] = useState(false);
  
  // Volunteer stats
  const [reportsVerified, setReportsVerified] = useState(0);
  const [hoursVolunteered, setHoursVolunteered] = useState(0);

  // Load reports from Supabase for volunteers
  const loadReports = async () => {
    console.log("loadReports called");
    // Check userMode from localStorage directly to avoid race conditions
    const currentUserMode = localStorage.getItem("userMode") || "user";
    console.log("Current userMode:", currentUserMode);
    if (currentUserMode !== "volunteer") {
      console.log("Not a volunteer, skipping report load");
      return;
    }

    console.log("Starting to load reports for volunteer...");
    setReportsLoading(true);
    try {
        // Check if user is authenticated
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.warn("No userId found - volunteer may not be logged in");
          setMockReports([]);
          setReportsLoading(false);
          return;
        }
        
        console.log("Loading reports for volunteer:", userId);

        // Try to verify volunteer status and get volunteerId (but don't fail if record doesn't exist)
        const { data: volunteerData, error: volunteerError } = await VolunteerService.getVolunteerByUserId(userId);
        
        if (volunteerData && volunteerData.verification_status !== 'approved') {
          console.warn("Volunteer account not approved:", volunteerData.verification_status);
          toast.warning("Your volunteer account is pending approval.", {
            duration: 5000,
          });
          setMockReports([]);
          setReportsLoading(false);
          return;
        }

        // Ensure volunteerId is stored in localStorage if volunteer record exists
        if (volunteerData && !localStorage.getItem("volunteerId")) {
          localStorage.setItem("volunteerId", volunteerData.id);
        } else if (!localStorage.getItem("volunteerId")) {
          // Generate a temporary volunteerId for volunteers without a database record
          const tempVolunteerId = `temp-vol-${Date.now()}`;
          localStorage.setItem("volunteerId", tempVolunteerId);
          console.log("Generated temporary volunteerId:", tempVolunteerId);
        }
        
        // Verify Supabase session is valid (required for RLS policies)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session) {
          console.error("No valid Supabase session found:", sessionError);
          toast.error("Authentication session expired. Please log in again.", {
            duration: 5000,
          });
          setMockReports([]);
          setReportsLoading(false);
          return;
        }
        console.log("Supabase session verified for volunteer:", session.user.id);

        // Fetch unanswered/unverified reports (status: submitted or queued)
        console.log("Fetching unanswered reports from Supabase...");
        console.log("Volunteer ID from localStorage:", localStorage.getItem("volunteerId"));
        console.log("About to call ReportService.getUnansweredReports...");
        
        const { data, error } = await ReportService.getUnansweredReports({
          limit: 50,
        });

        console.log("ReportService.getUnansweredReports response:", { 
          dataLength: data?.length || 0, 
          error: error ? JSON.stringify(error, null, 2) : null,
          hasData: !!data 
        });

        if (error) {
          console.error("Error loading reports from Supabase:", error);
          console.error("Error details:", JSON.stringify(error, null, 2));
          console.error("Error code:", error.code);
          console.error("Error message:", error.message);
          console.error("Error hint:", error.hint);
          
          // Check if it's an RLS policy error
          if (error.message?.includes("policy") || error.message?.includes("RLS") || error.code === "42501") {
            console.error("RLS Policy Error detected - volunteer may not have access");
            toast.error("Access denied. Please ensure your volunteer account is approved.", {
              duration: 5000,
            });
          } else if (error.message?.includes("JWT") || error.code === "PGRST301") {
            console.error("Authentication error - session may be invalid");
            toast.error("Authentication error. Please log in again.", {
              duration: 5000,
            });
          } else {
            toast.error(`Failed to load reports: ${error.message || "Unknown error"}`, {
              duration: 5000,
            });
          }
          
          // Don't fallback to mock data - show empty state instead
          setMockReports([]);
          setReportsLoading(false);
          return;
        }

        console.log(`Fetched ${data?.length || 0} unanswered reports from Supabase`);
        console.log("Sample report data:", data?.[0]);
        
        if (!data || data.length === 0) {
          console.log("No unanswered reports found in database");
          console.log("This could mean:");
          console.log("1. No reports have been created yet");
          console.log("2. All reports have been verified/resolved");
          console.log("3. RLS policies are blocking access silently");
          setMockReports([]);
          setReportsLoading(false);
          return;
        }

        // Transform Supabase data to ReportData format
        const transformedReports: ReportData[] = (data || []).map((report: any) => ({
          id: report.id,
          caseId: report.case_id,
          needType: report.need_type,
          description: report.description,
          location: report.location_address || 
                   (report.location_coords ? `${report.location_coords.lat}, ${report.location_coords.lng}` : null) ||
                   "Unknown",
          locationCoords: report.location_coords || undefined,
          dependents: report.number_of_dependents || 0,
          timestamp: report.created_at,
          priority: report.priority || "medium",
        }));

        // Filter out already reviewed reports from localStorage
        const reviewedReports = JSON.parse(localStorage.getItem("reviewedReports") || "[]");
        const reviewedIds = new Set(reviewedReports.map((r: any) => r.id));
        const filteredReports = transformedReports.filter(r => !reviewedIds.has(r.id));

        // Sort reports: urgent (high priority) first, then by time (most recent first)
        const sortedReports = filteredReports.sort((a, b) => {
          // First, sort by priority: high priority (urgent) always on top
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          const priorityDiff = (priorityOrder[a.priority || "medium"] || 1) - (priorityOrder[b.priority || "medium"] || 1);
          
          if (priorityDiff !== 0) {
            return priorityDiff;
          }
          
          // If same priority, sort by time (most recent first)
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });

        console.log(`Loaded ${sortedReports.length} unanswered reports from Supabase (${transformedReports.length - filteredReports.length} already reviewed)`);
        console.log("Reports data:", sortedReports);
        setMockReports(sortedReports);
        
        // Update volunteer stats
        // Count verified reports from localStorage
        const verifiedCount = reviewedReports.filter((r: any) => r.verificationAction === "verified").length;
        setReportsVerified(verifiedCount);
        
        // Calculate hours volunteered (estimate: 0.5 hours per verified report)
        const estimatedHours = Math.round(verifiedCount * 0.5);
        setHoursVolunteered(estimatedHours);
    } catch (error: any) {
      console.error("Error loading reports:", error);
      toast.error(`Failed to load reports: ${error.message || "Unknown error"}`);
      setMockReports([]);
    } finally {
      setReportsLoading(false);
    }
  };

  // Get user mode from localStorage and load reports
  useEffect(() => {
    const mode = localStorage.getItem("userMode") || "user";
    setUserMode(mode);
    
    // Load reports immediately if volunteer (don't wait for state update)
    if (mode === "volunteer") {
      console.log("Volunteer mode detected, loading reports...");
      // Use setTimeout to ensure component is fully mounted
      setTimeout(() => {
        loadReports();
      }, 100);
    }
  }, []);

  // Also reload reports when userMode state changes
  useEffect(() => {
    if (userMode === "volunteer") {
      console.log("UserMode changed to volunteer, loading reports...");
      loadReports();
    }
  }, [userMode]);
  
  // Listen for login events to reload reports
  useEffect(() => {
    const handleLogin = () => {
      const mode = localStorage.getItem("userMode");
      if (mode === "volunteer") {
        console.log("Login detected, loading reports...");
        setTimeout(() => {
          loadReports();
        }, 500); // Give time for localStorage to be set
      }
    };
    
    // Listen for custom login event
    window.addEventListener("userLoggedIn", handleLogin);
    
    // Also check on mount in case login happened before component mounted
    const checkLogin = () => {
      const mode = localStorage.getItem("userMode");
      const isAuth = localStorage.getItem("isAuthenticated");
      if (mode === "volunteer" && isAuth === "true") {
        console.log("Already logged in as volunteer, loading reports...");
        setTimeout(() => {
          loadReports();
        }, 500);
      }
    };
    
    // Check after a short delay to ensure localStorage is set
    const timeoutId = setTimeout(checkLogin, 1000);
    
    return () => {
      window.removeEventListener("userLoggedIn", handleLogin);
      clearTimeout(timeoutId);
    };
  }, []);

  // Refresh handler
  const handleRefresh = async () => {
    console.log("handleRefresh triggered");
    const currentUserMode = localStorage.getItem("userMode") || "user";
    console.log("Current user mode:", currentUserMode);
    
    if (currentUserMode !== "volunteer") {
      console.warn("Not in volunteer mode, skipping refresh");
      toast.warning("Only volunteers can view reports to verify");
      return;
    }
    
    try {
      console.log("Loading reports...");
      await loadReports();
      toast.success("Reports refreshed successfully!", {
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Error refreshing reports:", error);
      toast.error(`Failed to refresh reports: ${error.message || "Unknown error"}`);
    }
  };

  const needs = [
    { type: "water" as NeedType, label: t.needWater, icon: Droplets, color: "blue", gradient: "from-blue-500 to-cyan-600" },
    { type: "medical" as NeedType, label: t.needMedical, icon: Heart, color: "red", gradient: "from-red-500 to-pink-600" },
    { type: "shelter" as NeedType, label: t.needShelter, icon: HomeIcon, color: "purple", gradient: "from-purple-500 to-indigo-600" },
    { type: "food" as NeedType, label: t.needFood, icon: Utensils, color: "green", gradient: "from-green-500 to-emerald-600" },
    { type: "other" as NeedType, label: t.needOther, icon: AlertCircle, color: "gray", gradient: "from-gray-500 to-slate-600" },
  ];

  const vulnerableOptions = [
    { id: "elderly", label: t.elderly, icon: "👴" },
    { id: "disability", label: t.disability, icon: "♿" },
    { id: "medication", label: t.medication, icon: "💊" },
    { id: "pregnant", label: t.pregnant, icon: "🤰" },
    { id: "children", label: t.children, icon: "👶" },
  ];

  const flairOptions = [
    { id: "urgent", text: "Urgent - immediate assistance needed", emoji: "🚨", color: "from-red-500 to-pink-600" },
    { id: "safe", text: "Safe for now but need supplies", emoji: "✅", color: "from-green-500 to-emerald-600" },
    { id: "multiple", text: "Multiple families affected", emoji: "👨‍👩‍👧‍👦", color: "from-blue-500 to-cyan-600" },
    { id: "blocked", text: "Road access blocked", emoji: "🚧", color: "from-yellow-500 to-orange-600" },
    { id: "communication", text: "Communication difficult", emoji: "📵", color: "from-purple-500 to-indigo-600" },
  ];

  const handleNeedSelect = (need: NeedType) => {
    setSelectedNeed(need);
    setStep(2);
  };

  const handleViewReport = (report: ReportData) => {
    setSelectedReport(report);
    setViewDialogOpen(true);
  };

  const handleVerifyReport = (report: ReportData) => {
    setSelectedReport(report);
    setVerifyDialogOpen(true);
  };

  const handleSubmitVerification = async () => {
    if (!verificationNotes.trim()) {
      toast.error("Please add verification notes");
      return;
    }

    if (!selectedReport) return;

    // Get volunteerId from localStorage or fetch it
    let volunteerId = localStorage.getItem("volunteerId");
    if (!volunteerId) {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("Please log in again");
        return;
      }
      
      // Fetch volunteer record to get volunteerId
      const { data: volunteerData, error: volunteerError } = await VolunteerService.getVolunteerByUserId(userId);
      if (volunteerError || !volunteerData) {
        toast.error("Volunteer account not found. Please contact administrator.");
        return;
      }
      
      volunteerId = volunteerData.id;
      // Store it for future use
      localStorage.setItem("volunteerId", volunteerId);
    }

    try {
      // Create verification in Supabase
      const { data: verificationData, error: verificationError } = await VolunteerService.createVerification({
        report_id: selectedReport.id,
        volunteer_id: volunteerId,
        verification_type: 'witness',
        verification_status: 'confirmed',
        notes: verificationNotes,
        photo_urls: verificationPhoto ? [verificationPhoto] : [],
      });

      if (verificationError) {
        console.error("Verification error:", verificationError);
        toast.error("Failed to submit verification. Saving locally...");
      }

      // Update report status
      await ReportService.updateReport(selectedReport.id, {
        status: 'verified',
      });

      // Create reviewed report entry for localStorage (for ReportsReviewedPage)
      const reviewedReport = {
        id: selectedReport.id,
        caseId: selectedReport.caseId,
        needType: selectedReport.needType,
        description: selectedReport.description,
        location: selectedReport.location,
        reportedAt: selectedReport.timestamp,
        reviewedAt: new Date().toISOString(),
        verificationAction: "verified" as const,
        myNotes: verificationNotes,
        dependents: selectedReport.dependents,
        resolutionStatus: "in_progress" as const,
      };

      // Save to localStorage
      const existingReviewed = JSON.parse(localStorage.getItem("reviewedReports") || "[]");
      const updatedReviewed = [...existingReviewed, reviewedReport];
      localStorage.setItem("reviewedReports", JSON.stringify(updatedReviewed));

      // Remove from pending reports
      setMockReports(prev => prev.filter(r => r.id !== selectedReport.id));
      
      // Update volunteer stats
      const verifiedCount = updatedReviewed.filter((r: any) => r.verificationAction === "verified").length;
      setReportsVerified(verifiedCount);
      const estimatedHours = Math.round(verifiedCount * 0.5);
      setHoursVolunteered(estimatedHours);

      // Trigger custom event to notify ReportsReviewedPage (same tab)
      window.dispatchEvent(new CustomEvent("reviewedReportsUpdated"));
      // Also trigger storage event for other tabs
      window.dispatchEvent(new Event("storage"));

      toast.success(t.verificationSuccess);
      setVerifyDialogOpen(false);
      setVerificationNotes("");
      setVerificationPhoto(null);
      setSelectedReport(null);
    } catch (error: any) {
      console.error("Verification error:", error);
      toast.error(error.message || "Failed to submit verification");
    }
  };

  const handleRejectReport = async (report: ReportData) => {
    // Get volunteerId from localStorage or fetch it
    let volunteerId = localStorage.getItem("volunteerId");
    if (!volunteerId) {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("Please log in again");
        return;
      }
      
      // Fetch volunteer record to get volunteerId
      const { data: volunteerData, error: volunteerError } = await VolunteerService.getVolunteerByUserId(userId);
      if (volunteerError || !volunteerData) {
        toast.error("Volunteer account not found. Please contact administrator.");
        return;
      }
      
      volunteerId = volunteerData.id;
      // Store it for future use
      localStorage.setItem("volunteerId", volunteerId);
    }

    try {
      // Create verification in Supabase with disputed status
      await VolunteerService.createVerification({
        report_id: report.id,
        volunteer_id: volunteerId,
        verification_type: 'witness',
        verification_status: 'disputed',
        notes: "Report rejected by volunteer",
        photo_urls: [],
      });

      // Update report status
      await ReportService.updateReport(report.id, {
        status: 'false',
      });

      // Create reviewed report entry for localStorage
      const reviewedReport = {
        id: report.id,
        caseId: report.caseId,
        needType: report.needType,
        description: report.description,
        location: report.location,
        reportedAt: report.timestamp,
        reviewedAt: new Date().toISOString(),
        verificationAction: "flagged" as const,
        myNotes: "Report rejected by volunteer",
        dependents: report.dependents,
        resolutionStatus: "escalated" as const,
      };

      // Save to localStorage
      const existingReviewed = JSON.parse(localStorage.getItem("reviewedReports") || "[]");
      localStorage.setItem("reviewedReports", JSON.stringify([...existingReviewed, reviewedReport]));

      // Remove from pending reports
      setMockReports(prev => prev.filter(r => r.id !== report.id));

      // Trigger custom event to notify ReportsReviewedPage (same tab)
      window.dispatchEvent(new CustomEvent("reviewedReportsUpdated"));
      // Also trigger storage event for other tabs
      window.dispatchEvent(new Event("storage"));

      toast.success("Report rejected and moved to reviewed");
    } catch (error: any) {
      console.error("Reject error:", error);
      toast.error(error.message || "Failed to flag report");
    }
  };

  const handleVerificationPhotoCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t.photoTooLarge || "Photo size must be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setVerificationPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = Date.now();
    const then = new Date(timestamp).getTime();
    const diffMinutes = Math.floor((now - then) / (1000 * 60));
    
    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const handlePhotoCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t.photoTooLarge || "Photo size must be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
        toast.success("Photo captured");
      };
      reader.readAsDataURL(file);
    }
  };

  // Reverse geocoding function to get location name from coordinates
  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'EmergencyResponseApp/1.0' // Required by Nominatim
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Geocoding failed');
      }
      
      const data = await response.json();
      
      if (data && data.address) {
        const addr = data.address;
        // Build a readable address from the response
        const addressParts: string[] = [];
        
        if (addr.road || addr.street) {
          addressParts.push(addr.road || addr.street || '');
        }
        if (addr.suburb || addr.neighbourhood) {
          addressParts.push(addr.suburb || addr.neighbourhood || '');
        }
        if (addr.city || addr.town || addr.village) {
          addressParts.push(addr.city || addr.town || addr.village || '');
        }
        if (addr.state) {
          addressParts.push(addr.state);
        }
        if (addr.country) {
          addressParts.push(addr.country);
        }
        
        return addressParts.length > 0 
          ? addressParts.join(', ') 
          : data.display_name || `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
      }
      
      return data.display_name || `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      // Fallback to coordinates if geocoding fails
      return `Approx: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  };

  const handleGetLocation = async () => {
    if ("geolocation" in navigator) {
      toast.info("Detecting location...");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          // Store coordinates
          setLocationCoords({ lat, lng });
          
          // Show coordinates while fetching address
          setLocation(`Getting address...`);
          
          // Fetch location name
          try {
            const locationName = await reverseGeocode(lat, lng);
            setLocation(locationName);
            toast.success("Location captured");
          } catch (error) {
            // Fallback to coordinates if geocoding fails
            setLocation(`Approx: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
            toast.success("Location captured (coordinates only)");
          }
        },
        () => {
          toast.error(t.locationPermissionDenied || "Location permission denied");
          setLocation("Location not available");
          setLocationCoords(null);
        }
      );
    }
  };

  const toggleVulnerableTag = (tag: string) => {
    setVulnerableTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmitReport = async () => {
    if (!selectedNeed || !microUpdate.trim()) {
      toast.error(t.fillAllFields || "Please fill in the required fields");
      return;
    }

    setIsSubmitting(true);

    const userId = localStorage.getItem("userId");
    const userMode = localStorage.getItem("userMode");

    const reportData = {
      user_id: userMode === "anonymous" ? undefined : userId,
      need_type: selectedNeed,
      description: microUpdate,
      location_address: location, // Human-readable location name
      location_coords: locationCoords || undefined, // GPS coordinates
      number_of_dependents: parseInt(dependents) || parseInt(customDependents) || 0,
      vulnerable_tags: vulnerableTags,
      is_anonymous: userMode === "anonymous",
      share_with_responders: shareWithResponders,
      share_precise_location: sharePreciseCoords,
      priority: selectedFlair === "urgent" ? "high" : "medium",
      status: "submitted",
    };

    // Handle offline mode
    if (!isOnline) {
      const queue = JSON.parse(localStorage.getItem("offlineQueue") || "[]");
      queue.push({
        action: "create_report",
        payload: reportData,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("offlineQueue", JSON.stringify(queue));
      
      setQueuedReports(prev => [...prev, {
        id: `CASE-${Date.now()}`,
        needType: selectedNeed,
        microUpdate: microUpdate,
        timestamp: new Date().toISOString(),
        status: "queued",
      }]);
      
      toast.info(t.reportQueued || "Report queued - will send when online");
      
      // Reset form
      setSelectedNeed(null);
      setMicroUpdate("");
      setDependents("0");
      setCustomDependents("");
      setSelectedFlair(null);
      setPhoto(null);
      setVulnerableTags([]);
      setStep(1);
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit to Supabase
      const { data, error } = await ReportService.createReport(reportData);

      if (error) {
        // If Supabase fails, queue for later
        const queue = JSON.parse(localStorage.getItem("offlineQueue") || "[]");
        queue.push({
          action: "create_report",
          payload: reportData,
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem("offlineQueue", JSON.stringify(queue));
        
        toast.warning("Report queued - will retry when connection is restored");
      } else {
        toast.success(t.reportSubmitted || "Report submitted successfully!", {
          description: `Case ID: ${data?.case_id || "N/A"}`,
          duration: 4000,
        });
      }

      // Reset form
      setSelectedNeed(null);
      setMicroUpdate("");
      setDependents("0");
      setCustomDependents("");
      setSelectedFlair(null);
      setPhoto(null);
      setVulnerableTags([]);
      setStep(1);
    } catch (error: any) {
      console.error("Report submission error:", error);
      // Queue for retry
      const queue = JSON.parse(localStorage.getItem("offlineQueue") || "[]");
      queue.push({
        action: "create_report",
        payload: reportData,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("offlineQueue", JSON.stringify(queue));
      
      toast.error(error.message || "Failed to submit report. Queued for retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendViaSMS = () => {
    toast.success(t.smsSent || "Minimal report sent via SMS");
  };

  return (
    <div className="space-y-6 pb-6 max-w-5xl mx-auto">
      {/* Offline indicator */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-300">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm">
                    {t.offlineModeActive || "Offline mode - reports will be queued"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Volunteer Dashboard */}
      {userMode === "volunteer" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-0 shadow-xl overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-3xl" />
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <span className="bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                  {t.volunteerDashboard}
                </span>
              </CardTitle>
              <CardDescription className="text-green-600 dark:text-green-500">
                {t.verifyAndAssist}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 relative">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl border-0 shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">{t.reportsVerified}</p>
                  </div>
                  <p className="text-2xl text-green-700 dark:text-green-400">{reportsVerified}</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl border-0 shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-[#11111b] dark:text-[#b4befe]" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">{t.pendingVerifications}</p>
                  </div>
                  <p className="text-2xl text-[#11111b] dark:text-[#b4befe]">{mockReports.length}</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl border-0 shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">{t.hoursVolunteered}</p>
                  </div>
                  <p className="text-2xl text-orange-700 dark:text-orange-400">{hoursVolunteered}</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl border-0 shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">{t.trustScore}</p>
                  </div>
                  <p className="text-2xl text-purple-700 dark:text-purple-400">94%</p>
                </motion.div>
              </div>

              {/* Reports to Verify */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-900 dark:text-gray-100">{t.reportsToVerify}</h3>
                  <Button
                    onClick={handleRefresh}
                    disabled={reportsLoading}
                    className="h-8 px-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${reportsLoading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
                
                {reportsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-orange-600" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">Loading reports...</p>
                    </div>
                  </div>
                ) : mockReports.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">No reports to verify</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Reports will appear here when available</p>
                    <Button
                      onClick={handleRefresh}
                      className="mt-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                ) : (
                  mockReports.map((report, index) => {
                  const needType = needs.find(n => n.type === report.needType);
                  const NeedIcon = needType?.icon || AlertCircle;
                  
                  // Get the color for the left banner based on need type
                  const getBannerColor = (type: NeedType) => {
                    switch(type) {
                      case "water": return "bg-blue-500";
                      case "medical": return "bg-red-500";
                      case "shelter": return "bg-purple-500";
                      case "food": return "bg-green-500";
                      case "other": return "bg-gray-500";
                      default: return "bg-gray-500";
                    }
                  };
                  
                  return (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                    >
                      {/* Colored left banner */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${getBannerColor(report.needType)}`} />
                      
                      {/* Report content */}
                      <div className="p-4 pl-5 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <div className={`p-1.5 rounded-lg bg-gradient-to-br ${needType?.gradient}`}>
                                <NeedIcon className="h-4 w-4 text-white" />
                              </div>
                              {report.priority === "high" && (
                                <Badge variant="destructive" className="text-xs animate-pulse">
                                  {t.needsUrgentAttention}
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-xs">{needType?.label}</Badge>
                            </div>
                            <p className="text-sm text-gray-900 dark:text-gray-100 mb-2">
                              {report.description}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {report.location.split(',')[0]}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {report.dependents} dependents
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatTimeAgo(report.timestamp)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="default" 
                            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 shadow-lg shadow-green-500/30"
                            onClick={() => handleVerifyReport(report)}
                          >
                            <Zap className="h-4 w-4 mr-1" />
                            {t.verifyNow}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleViewReport(report)}
                          >
                            {t.viewReport}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            className="flex-1"
                            onClick={() => handleRejectReport(report)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            {t.rejectReport}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Queued Reports */}
      <AnimatePresence>
        {queuedReports.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  {t.offlineQueue || "Offline Queue"} ({queuedReports.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {queuedReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div>
                      <p className="text-sm">{report.id}</p>
                      <p className="text-xs text-gray-500">{report.microUpdate.slice(0, 40)}...</p>
                    </div>
                    <Badge variant="secondary">{report.status.charAt(0).toUpperCase() + report.status.slice(1)}</Badge>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 1: Select Need Type */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-full blur-3xl" />
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-orange-600" />
                {t.whatDoYouNeed}
              </CardTitle>
              <CardDescription>{t.selectNeedType}</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {needs.map((need, index) => {
                  const Icon = need.icon;
                  return (
                    <motion.button
                      key={need.type}
                      type="button"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.08, y: -8, rotate: 2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleNeedSelect(need.type);
                      }}
                      className={`group relative p-6 rounded-[3rem] border-0 transition-all overflow-hidden bg-gradient-to-br ${need.gradient} hover:shadow-2xl cursor-pointer backdrop-blur-sm`}
                      style={{ 
                        pointerEvents: 'auto',
                        boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      {/* Animated gradient overlay for depth */}
                      <div className={`absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                      
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                      
                      {/* Icon container with blended background */}
                      <div className={`relative inline-flex p-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 mb-3 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300`}>
                        <Icon className="h-8 w-8 text-white drop-shadow-lg" />
                      </div>
                      
                      {/* Text with better contrast */}
                      <p className="text-sm text-center text-white font-medium drop-shadow-md relative z-10">{need.label}</p>
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* AI ChatBox Dropdown - Only for Citizens */}
      {userMode === "user" && step === 1 && (
        <AIChatDropdown />
      )}

      {/* Step 2: Add Details */}
      {step === 2 && selectedNeed && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="h-6 w-6 text-green-600" />
                {t.addDetails}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                {t.reportNeed}: <Badge className={`bg-gradient-to-r ${needs.find(n => n.type === selectedNeed)?.gradient} text-white`}>{needs.find(n => n.type === selectedNeed)?.label}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quick Update */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>{t.microUpdate}</Label>
                  {selectedFlair && (
                    <Badge className={`bg-gradient-to-r ${flairOptions.find(f => f.id === selectedFlair)?.color} text-white`}>
                      <span className="mr-1">{flairOptions.find(f => f.id === selectedFlair)?.emoji}</span>
                      Flair: {flairOptions.find(f => f.id === selectedFlair)?.text.split(' ').slice(0, 2).join(' ')}...
                    </Badge>
                  )}
                </div>
                <Textarea
                  placeholder={t.microUpdatePlaceholder}
                  value={microUpdate}
                  onChange={(e) => setMicroUpdate(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
                
                {/* Flair Selection */}
                <div className="space-y-2">
                  <Label className="text-sm text-gray-600 dark:text-gray-400">Select Flair (Optional)</Label>
                  <div className="flex flex-wrap gap-2">
                    {flairOptions.map((flair, index) => (
                      <motion.button
                        key={flair.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedFlair(selectedFlair === flair.id ? null : flair.id)}
                        className={`
                          px-3 py-1.5 rounded-full text-xs transition-all border-2
                          ${selectedFlair === flair.id
                            ? `bg-gradient-to-r ${flair.color} text-white border-transparent shadow-lg`
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-400'
                          }
                        `}
                      >
                        <span className="mr-1">{flair.emoji}</span>
                        {flair.text.split(' ').slice(0, 3).join(' ')}...
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Photo */}
              <div className="space-y-3">
                <Label>{t.addPhoto}</Label>
                <div className="flex gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoCapture}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 h-12"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    {photo ? "Change Photo" : "Upload Photo"}
                  </Button>
                  {photo && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative h-20 w-20 rounded-xl overflow-hidden shadow-lg"
                    >
                      <img src={photo} alt="Report" className="h-full w-full object-cover" />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => setPhoto(null)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-3">
                <Label className="font-semibold text-gray-900 dark:text-gray-100">{t.location}</Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <div className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100">
                      {location}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleGetLocation} 
                    className="h-[42px] w-[42px] p-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <MapPin className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Dependents */}
              <div className="space-y-3">
                <Label>{t.numberOfDependents}</Label>
                <Select value={dependents} onValueChange={(value) => {
                  setDependents(value);
                  if (value !== "specify") setCustomDependents("");
                }}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="0" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(11)].map((_, i) => (
                      <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                    ))}
                    <SelectItem value="10+">10+</SelectItem>
                    <SelectItem value="specify">Specify Custom Amount</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Custom Dependents Input */}
                {dependents === "specify" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Input
                      type="number"
                      min="0"
                      placeholder="Enter number of dependents"
                      value={customDependents}
                      onChange={(e) => setCustomDependents(e.target.value)}
                      className="h-12"
                    />
                  </motion.div>
                )}
              </div>

              {/* Vulnerable Tags */}
              <div className="space-y-3">
                <Label>{t.vulnerableTags}</Label>
                <div className="flex flex-wrap gap-2">
                  {vulnerableOptions.map((option, index) => (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleVulnerableTag(option.id)}
                      className={`
                        px-4 py-2 rounded-full text-sm transition-all border-2
                        ${vulnerableTags.includes(option.id)
                          ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white border-orange-600 shadow-lg shadow-orange-500/30'
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-orange-500'
                        }
                      `}
                    >
                      <span className="mr-1">{option.icon}</span>
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12">
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(3)} 
                  className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg shadow-blue-500/30"
                >
                  Next: Privacy Settings
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Step 3: Privacy & Submit */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-[#11111b] dark:text-[#b4befe]" />
                {t.privacyConsent}
              </CardTitle>
              <CardDescription>Control who can see your information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl"
                >
                  <div>
                    <p>{t.shareWithResponders}</p>
                    <p className="text-sm text-gray-500">Verified emergency responders only</p>
                  </div>
                  <Switch
                    checked={shareWithResponders}
                    onCheckedChange={setShareWithResponders}
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl"
                >
                  <div>
                    <p>{t.sharePreciseCoords}</p>
                    <p className="text-sm text-gray-500">Share exact GPS location</p>
                  </div>
                  <Switch
                    checked={sharePreciseCoords}
                    onCheckedChange={setSharePreciseCoords}
                  />
                </motion.div>
              </div>

              {/* Summary */}
              <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                <h4 className="mb-3 flex items-center gap-2">
                  <Check className="h-5 w-5 text-[#11111b] dark:text-[#b4befe]" />
                  Report Summary
                </h4>
                <div className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                  <p><strong>Need:</strong> {needs.find(n => n.type === selectedNeed)?.label}</p>
                  <p><strong>Description:</strong> {microUpdate.slice(0, 60)}{microUpdate.length > 60 ? '...' : ''}</p>
                  {dependents !== "0" && <p><strong>Dependents:</strong> {dependents}</p>}
                  {vulnerableTags.length > 0 && (
                    <p><strong>Tags:</strong> {vulnerableTags.join(", ")}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button
                  onClick={handleSubmitReport}
                  disabled={isSubmitting}
                  className="w-full h-14 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-xl shadow-red-500/30"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      {t.submitReport}
                    </>
                  )}
                </Button>

                {!isOnline && (
                  <Button
                    onClick={handleSendViaSMS}
                    variant="outline"
                    className="w-full h-12"
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    {t.sendViaSMS}
                  </Button>
                )}

                <Button
                  variant="ghost"
                  onClick={() => setStep(2)}
                  className="w-full h-12"
                >
                  Back to Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* View Report Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.reportDetails}</DialogTitle>
            <DialogDescription>
              {selectedReport?.caseId}
            </DialogDescription>
          </DialogHeader>
          
          {selectedReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">{t.reportedBy}</Label>
                  <p>Citizen User</p>
                </div>
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">{t.reportTime}</Label>
                  <p>{new Date(selectedReport.timestamp).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <Label className="text-gray-600 dark:text-gray-400">{t.needType}</Label>
                <div className="mt-1">
                  <Badge>{needs.find(n => n.type === selectedReport.needType)?.label}</Badge>
                </div>
              </div>

              <div>
                <Label className="text-gray-600 dark:text-gray-400">{t.reportDescription}</Label>
                <p className="mt-1">{selectedReport.description}</p>
              </div>

              <div>
                <Label className="font-semibold text-gray-900 dark:text-gray-100 mb-2 block">{t.reportLocation}</Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100">
                    {selectedReport.location}
                  </div>
                  <Button 
                    variant="outline" 
                    className="h-[42px] w-[42px] p-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => {
                      // Open location in maps using stored coordinates or parse from location string
                      if (selectedReport.locationCoords) {
                        window.open(`https://www.google.com/maps?q=${selectedReport.locationCoords.lat},${selectedReport.locationCoords.lng}`, '_blank');
                      } else {
                        // Fallback: try to parse coordinates from location string
                        const coords = selectedReport.location.match(/-?\d+\.?\d*/g);
                        if (coords && coords.length >= 2) {
                          window.open(`https://www.google.com/maps?q=${coords[0]},${coords[1]}`, '_blank');
                        } else {
                          toast.info("Location coordinates not available");
                        }
                      }
                    }}
                  >
                    <MapPin className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-gray-600 dark:text-gray-400">{t.numberOfDependents}</Label>
                <p className="mt-1 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {selectedReport.dependents} people affected
                </p>
              </div>

              <div>
                <Label className="text-gray-600 dark:text-gray-400">{t.reportPriority}</Label>
                <div className="mt-1">
                  <Badge variant="destructive">{t.priorityHigh}</Badge>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              {t.close}
            </Button>
            <Button 
              className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800"
              onClick={() => {
                setViewDialogOpen(false);
                if (selectedReport) {
                  handleVerifyReport(selectedReport);
                }
              }}
            >
              {t.verifyNow}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Verify Report Dialog */}
      <Dialog open={verifyDialogOpen} onOpenChange={setVerifyDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.verificationTitle}</DialogTitle>
            <DialogDescription>
              {selectedReport?.caseId} - {selectedReport?.description.substring(0, 50)}...
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200 dark:border-blue-900">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-[#11111b] dark:text-[#b4befe] mt-0.5" />
                <p className="text-sm text-gray-900 dark:text-[#bac2de]">
                  {t.confirmVerification}
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="verification-notes">{t.addVerificationNotes}</Label>
              <Textarea
                id="verification-notes"
                placeholder={t.notesPlaceholder}
                value={verificationNotes}
                onChange={(e) => setVerificationNotes(e.target.value)}
                rows={4}
                className="mt-2"
              />
            </div>

            <div>
              <Label>{t.uploadVerificationPhoto}</Label>
              <div className="mt-2 space-y-2">
                <input
                  ref={verificationPhotoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleVerificationPhotoCapture}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => verificationPhotoInputRef.current?.click()}
                  className="w-full h-12"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {verificationPhoto ? "Change Photo" : "Upload Photo"}
                </Button>
                {verificationPhoto && (
                  <div className="relative">
                    <img
                      src={verificationPhoto}
                      alt="Verification"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => setVerificationPhoto(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setVerifyDialogOpen(false);
              setVerificationNotes("");
              setVerificationPhoto(null);
            }}>
              {t.cancel}
            </Button>
            <Button 
              className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800"
              onClick={handleSubmitVerification}
            >
              {t.submitVerification}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
