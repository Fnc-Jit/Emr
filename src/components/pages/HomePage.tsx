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
  Check
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
  location: string;
  dependents: number;
  timestamp: string;
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
  
  // Get user mode from localStorage
  useEffect(() => {
    const mode = localStorage.getItem("userMode") || "user";
    setUserMode(mode);
  }, []);

  // Mock reports data for volunteer dashboard
  const mockReports: ReportData[] = [
    {
      id: "1",
      caseId: "CASE-2024-046",
      needType: "medical",
      description: "Need urgent medical supplies for elderly residents",
      location: "MG Road Area, Bangalore",
      dependents: 8,
      timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      caseId: "CASE-2024-045",
      needType: "water",
      description: "Water supply disrupted, community of 50+ families",
      location: "Koramangala, Bangalore",
      dependents: 12,
      timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      caseId: "CASE-2024-041",
      needType: "shelter",
      description: "Families displaced due to flooding",
      location: "Whitefield, Bangalore",
      dependents: 15,
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    },
  ];

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

  const handleSubmitVerification = () => {
    if (!verificationNotes.trim()) {
      toast.error("Please add verification notes");
      return;
    }

    // Simulate verification submission
    toast.success(t.verificationSuccess);
    setVerifyDialogOpen(false);
    setVerificationNotes("");
    setVerificationPhoto(null);
    setSelectedReport(null);
  };

  const handleRejectReport = (report: ReportData) => {
    // Simulate report rejection
    toast.success("Report rejected");
    // In a real app, this would update the report status in the database
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

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      toast.info("Detecting location...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(4);
          const lng = position.coords.longitude.toFixed(4);
          setLocation(`Approx: ${lat}, ${lng}`);
          toast.success("Location captured");
        },
        () => {
          toast.error(t.locationPermissionDenied || "Location permission denied");
          setLocation("Location not available");
        }
      );
    }
  };

  const toggleVulnerableTag = (tag: string) => {
    setVulnerableTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmitReport = () => {
    if (!selectedNeed || !microUpdate.trim()) {
      toast.error(t.fillAllFields || "Please fill in the required fields");
      return;
    }

    setIsSubmitting(true);

    const newReport: QueuedReport = {
      id: `CASE-${Date.now()}`,
      needType: selectedNeed,
      microUpdate: microUpdate,
      timestamp: new Date().toISOString(),
      status: isOnline ? "sending" : "queued",
    };

    // Simulate submission
    setTimeout(() => {
      if (isOnline) {
        toast.success(t.reportSubmitted || "Report submitted successfully!", {
          description: `Case ID: ${newReport.id}`,
          duration: 4000,
        });
      } else {
        setQueuedReports(prev => [...prev, { ...newReport, status: "queued" }]);
        toast.info(t.reportQueued || "Report queued - will send when online");
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
      setIsSubmitting(false);
    }, 1200);
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
                  <p className="text-2xl text-green-700 dark:text-green-400">47</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl border-0 shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-[#11111b] dark:text-[#b4befe]" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">{t.pendingVerifications}</p>
                  </div>
                  <p className="text-2xl text-[#11111b] dark:text-[#b4befe]">12</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl border-0 shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">{t.hoursVolunteered}</p>
                  </div>
                  <p className="text-2xl text-orange-700 dark:text-orange-400">28</p>
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
                <h3 className="text-gray-900 dark:text-gray-100">{t.reportsToVerify}</h3>
                
                {mockReports.map((report, index) => {
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
                              {index === 0 && (
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
                })}
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
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleNeedSelect(need.type)}
                      className="group relative p-6 rounded-2xl border-2 border-transparent transition-all overflow-hidden bg-white dark:bg-gray-800 hover:shadow-2xl"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${need.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${need.gradient} mb-3 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-sm text-center">{need.label}</p>
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
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
                <Label>{t.location}</Label>
                <div className="flex gap-2">
                  <Input value={location} readOnly className="flex-1 h-12" />
                  <Button variant="outline" onClick={handleGetLocation} className="h-12">
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
                <Label className="text-gray-600 dark:text-gray-400">{t.reportLocation}</Label>
                <p className="mt-1 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {selectedReport.location}
                </p>
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

// Add ArrowRight import to the existing imports
import { ArrowRight } from "lucide-react";
