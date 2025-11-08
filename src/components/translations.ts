export type Language = "en" | "hi" | "kn" | "ml" | "es";

export interface Translations {
  // Header
  goodMorning: string;
  goodAfternoon: string;
  goodEvening: string;
  menu: string;
  menuDescription: string;
  emergencyUser: string;
  userEmail: string;
  anonymousUser: string;
  
  // Navigation
  home: string;
  myReports: string;
  previousReports: string;
  reportsReviewed: string;
  safetyCheckins: string;
  publicDashboard: string;
  settings: string;
  logout: string;
  helpSupport: string;
  witnessMode: string;
  
  // Login Page
  emergencyResponse: string;
  signInOrReport: string;
  quickReportAnonymous: string;
  reportWithoutLogin: string;
  userLogin: string;
  trackYourReports: string;
  volunteerLogin: string;
  verifyAndAssist: string;
  createAccount: string;
  volunteerAccessOnly: string;
  username: string;
  password: string;
  enterUsername: string;
  enterPassword: string;
  rememberMe: string;
  forgotPassword: string;
  signIn: string;
  signingIn: string;
  
  // Quick Report (Home)
  reportNeed: string;
  whatDoYouNeed: string;
  selectNeedType: string;
  needType: string;
  needWater: string;
  needMedical: string;
  needShelter: string;
  needFood: string;
  needOther: string;
  addDetails: string;
  microUpdate: string;
  microUpdatePlaceholder: string;
  addPhoto: string;
  location: string;
  coarseLocation: string;
  preciseLocation: string;
  numberOfDependents: string;
  vulnerableTags: string;
  elderly: string;
  disability: string;
  medication: string;
  pregnant: string;
  children: string;
  privacyConsent: string;
  shareWithResponders: string;
  sharePreciseCoords: string;
  reportAnonymously: string;
  submitReport: string;
  submitting: string;
  
  // Report Status
  queued: string;
  sending: string;
  sent: string;
  failed: string;
  verified: string;
  duplicate: string;
  willSendWhenOnline: string;
  sendViaSMS: string;
  
  // Priority Levels
  priorityLow: string;
  priorityMedium: string;
  priorityHigh: string;
  priorityCritical: string;
  
  // My Reports Page
  yourReports: string;
  viewTrackReports: string;
  noReportsYet: string;
  caseId: string;
  reportedOn: string;
  lastUpdate: string;
  status: string;
  priority: string;
  verifications: string;
  editReport: string;
  requestVerification: string;
  flagDuplicate: string;
  viewDetails: string;
  deleteReport: string;
  clearFilters: string;
  searchPlaceholder: string;
  filterByStatus: string;
  filterByPriority: string;
  allStatuses: string;
  allPriorities: string;
  showingResults: string;
  totalReports: string;
  inProgress: string;
  totalVerifications: string;
  noReportsFound: string;
  adjustFilters: string;
  reportDetails: string;
  reportTime: string;
  reportStatus: string;
  reportDescription: string;
  reportLocation: string;
  reportPriority: string;
  
  // Safety Check-ins
  safetyCheckIn: string;
  areYouSafe: string;
  imSafe: string;
  needHelp: string;
  missedCheckIn: string;
  scheduleCheckIn: string;
  nextCheckIn: string;
  checkInHistory: string;
  
  // Witness Mode
  verifyReport: string;
  iSawThis: string;
  notTrue: string;
  addContext: string;
  witnessContextPlaceholder: string;
  submitVerification: string;
  yourReputation: string;
  verificationsProvided: string;
  
  // Volunteer Dashboard
  volunteerDashboard: string;
  reportsToVerify: string;
  pendingVerifications: string;
  activeEmergencies: string;
  yourVolunteerStats: string;
  reportsVerified: string;
  hoursVolunteered: string;
  trustScore: string;
  viewReport: string;
  verifyNow: string;
  rejectReport: string;
  assignToMe: string;
  markResolved: string;
  needsUrgentAttention: string;
  
  // Report Details Dialog
  reportDetails: string;
  reportedBy: string;
  reportTime: string;
  reportDescription: string;
  reportLocation: string;
  reportPhotos: string;
  reportStatus: string;
  reportPriority: string;
  close: string;
  
  // Verification Dialog
  verificationTitle: string;
  confirmVerification: string;
  addVerificationNotes: string;
  notesPlaceholder: string;
  uploadVerificationPhoto: string;
  verificationSuccess: string;
  cancel: string;
  
  // Public Dashboard
  dashboard: string;
  needsHeatmap: string;
  openShelters: string;
  helplines: string;
  mythBusting: string;
  recentUpdates: string;
  filterByNeed: string;
  filterByTime: string;
  showVerifiedOnly: string;
  exportData: string;
  
  // Settings Page
  manageAccount: string;
  profileInformation: string;
  updatePersonalInfo: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  saveChanges: string;
  notificationPreferences: string;
  chooseNotifications: string;
  smsAlerts: string;
  receiveSMSUpdates: string;
  pushNotifications: string;
  receivePushNotifications: string;
  checkInReminders: string;
  remindBeforeCheckIn: string;
  privacySecurity: string;
  manageSecuritySettings: string;
  locationSharing: string;
  defaultCoarseLocation: string;
  dataRetention: string;
  deleteMyData: string;
  appearance: string;
  customizeAppLooks: string;
  darkMode: string;
  darkThemeActive: string;
  switchToDarkTheme: string;
  language: string;
  selectLanguage: string;
  offlineMode: string;
  offlineQueueSettings: string;
  autoSyncWhenOnline: string;
  preferSMSFallback: string;
  profilePicture: string;
  uploadPhoto: string;
  removePhoto: string;
  profilePictureHint: string;
  
  // Settings - Notifications (Emergency specific)
  emergencyAlerts: string;
  emergencyAlertsDesc: string;
  reportStatusUpdates: string;
  reportStatusUpdatesDesc: string;
  verificationNotifications: string;
  verificationNotificationsDesc: string;
  smsFallback: string;
  smsFallbackDesc: string;
  
  // Settings - Privacy & Security (Emergency specific)
  locationPrivacy: string;
  locationPrivacyDesc: string;
  anonymousReporting: string;
  anonymousReportingDesc: string;
  dataSharing: string;
  dataSharingDesc: string;
  clearReportHistory: string;
  clearReportHistoryDesc: string;
  clear: string;
  
  // Settings - Data & Offline
  dataOffline: string;
  dataOfflineDesc: string;
  autoSyncReports: string;
  autoSyncReportsDesc: string;
  offlineModeToggle: string;
  offlineModeToggleDesc: string;
  photoCompression: string;
  photoCompressionDesc: string;
  clearLocalData: string;
  clearLocalDataDesc: string;
  
  // Offline Queue
  offlineQueue: string;
  pendingReports: string;
  retryNow: string;
  editQueued: string;
  
  // Toast Messages
  reportSubmitted: string;
  reportQueued: string;
  reportFailed: string;
  loginSuccessful: string;
  invalidCredentials: string;
  fillAllFields: string;
  profileUpdated: string;
  loggedOut: string;
  darkModeEnabled: string;
  lightModeEnabled: string;
  languageChanged: string;
  verificationSubmitted: string;
  checkInRecorded: string;
  locationPermissionDenied: string;
  photoTooLarge: string;
  smsSent: string;
  offlineModeActive: string;
  syncComplete: string;
  imageTooLarge: string;
  profilePictureUpdated: string;
  profilePictureRemoved: string;
  notificationDismissed: string;
  
  // AI Assistant
  aiAssistant: string;
  askAIForHelp: string;
  aiPlaceholder: string;
  sendMessage: string;
  aiTyping: string;
  aiWelcomeMessage: string;
  aiHelpSuggestion1: string;
  aiHelpSuggestion2: string;
  aiHelpSuggestion3: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    goodMorning: "Good Morning",
    goodAfternoon: "Good Afternoon",
    goodEvening: "Good Evening",
    menu: "Menu",
    menuDescription: "Navigate emergency response features",
    emergencyUser: "Volunteer",
    userEmail: "volunteer@emergency.org",
    anonymousUser: "Anonymous User",
    
    // Navigation
    home: "Quick Report",
    myReports: "My Reports",
    previousReports: "Previous Reports",
    reportsReviewed: "Reports Reviewed",
    safetyCheckins: "Safety Check-ins",
    publicDashboard: "Public Dashboard",
    settings: "Settings",
    logout: "Log Out",
    helpSupport: "Help & Support",
    witnessMode: "Witness Mode",
    
    // Login Page
    emergencyResponse: "Emergency Response",
    signInOrReport: "Report an emergency or sign in as a volunteer",
    quickReportAnonymous: "Quick Report (Anonymous)",
    reportWithoutLogin: "Report a need without signing in",
    userLogin: "User Login",
    trackYourReports: "Track your reports and get updates",
    volunteerLogin: "Volunteer Login",
    verifyAndAssist: "Verify reports and assist responders",
    createAccount: "create an account",
    volunteerAccessOnly: "Volunteer access only",
    username: "Username",
    password: "Password",
    enterUsername: "Enter username",
    enterPassword: "Enter your password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    signIn: "Sign In",
    signingIn: "Signing in...",
    
    // Quick Report
    reportNeed: "Report a Need",
    whatDoYouNeed: "What do you need?",
    selectNeedType: "Select the type of assistance needed",
    needType: "Need Type",
    needWater: "Water",
    needMedical: "Medical",
    needShelter: "Shelter",
    needFood: "Food",
    needOther: "Other",
    addDetails: "Add Details",
    microUpdate: "Quick Update",
    microUpdatePlaceholder: "Brief description of the situation...",
    addPhoto: "Add Photo",
    location: "Location",
    coarseLocation: "General Area",
    preciseLocation: "Precise Coordinates",
    numberOfDependents: "Number of Dependents",
    vulnerableTags: "Vulnerable Groups",
    elderly: "Elderly",
    disability: "Disability",
    medication: "Needs Medication",
    pregnant: "Pregnant",
    children: "Children",
    privacyConsent: "Privacy & Sharing",
    shareWithResponders: "Share details with verified responders",
    sharePreciseCoords: "Share precise location (responders only)",
    reportAnonymously: "Report anonymously",
    submitReport: "Submit Report",
    submitting: "Submitting...",
    
    // Report Status
    queued: "Queued",
    sending: "Sending",
    sent: "Sent",
    failed: "Failed",
    verified: "Verified",
    duplicate: "Possible Duplicate",
    willSendWhenOnline: "Will send when online",
    sendViaSMS: "Send via SMS",
    
    // Priority Levels
    priorityLow: "Low",
    priorityMedium: "Medium",
    priorityHigh: "High",
    priorityCritical: "Critical",
    
    // My Reports
    yourReports: "Your Reports",
    viewTrackReports: "View and track your emergency reports",
    noReportsYet: "No reports submitted yet",
    caseId: "Case ID",
    reportedOn: "Reported on",
    lastUpdate: "Last update",
    status: "Status",
    priority: "Priority",
    verifications: "Verifications",
    editReport: "Edit Report",
    requestVerification: "Request Verification",
    flagDuplicate: "Flag as Duplicate",
    viewDetails: "View Details",
    deleteReport: "Delete Report",
    clearFilters: "Clear Filters",
    searchPlaceholder: "Search by case ID or description...",
    filterByStatus: "Filter by status",
    filterByPriority: "Filter by priority",
    allStatuses: "All Statuses",
    allPriorities: "All Priorities",
    showingResults: "Showing",
    totalReports: "Total Reports",
    inProgress: "In Progress",
    totalVerifications: "Total Verifications",
    noReportsFound: "No reports found",
    adjustFilters: "Try adjusting your filters",
    reportDetails: "Report Details",
    reportTime: "Report Time",
    reportStatus: "Report Status",
    reportDescription: "Description",
    reportLocation: "Location",
    reportPriority: "Priority",
    
    // Safety Check-ins
    safetyCheckIn: "Safety Check-in",
    areYouSafe: "Are you safe?",
    imSafe: "I'm Safe",
    needHelp: "Need Help",
    missedCheckIn: "Missed Check-in",
    scheduleCheckIn: "Schedule Check-in",
    nextCheckIn: "Next check-in",
    checkInHistory: "Check-in History",
    
    // Witness Mode
    verifyReport: "Verify Report",
    iSawThis: "I Saw This",
    notTrue: "Not True",
    addContext: "Add Context",
    witnessContextPlaceholder: "Additional information about this report...",
    submitVerification: "Submit Verification",
    yourReputation: "Your Reputation",
    verificationsProvided: "Verifications Provided",
    
    // Volunteer Dashboard
    volunteerDashboard: "Volunteer Dashboard",
    reportsToVerify: "Reports to Verify",
    pendingVerifications: "Pending Verifications",
    activeEmergencies: "Active Emergencies",
    yourVolunteerStats: "Your Volunteer Stats",
    reportsVerified: "Reports Verified",
    hoursVolunteered: "Hours Volunteered",
    trustScore: "Trust Score",
    viewReport: "View Report",
    verifyNow: "Verify Now",
    rejectReport: "Reject Report",
    assignToMe: "Assign to Me",
    markResolved: "Mark Resolved",
    needsUrgentAttention: "Needs Urgent Attention",
    
    // Report Details Dialog
    reportDetails: "Report Details",
    reportedBy: "Reported By",
    reportTime: "Report Time",
    reportDescription: "Description",
    reportLocation: "Location",
    reportPhotos: "Photos",
    reportStatus: "Status",
    reportPriority: "Priority",
    close: "Close",
    
    // Verification Dialog
    verificationTitle: "Verify Report",
    confirmVerification: "I confirm this report is accurate",
    addVerificationNotes: "Add Your Notes",
    notesPlaceholder: "Enter your observations, additional details, or context...",
    uploadVerificationPhoto: "Upload Photo (Optional)",
    verificationSuccess: "Verification submitted successfully",
    cancel: "Cancel",
    
    // Public Dashboard
    dashboard: "Dashboard",
    needsHeatmap: "Needs Heatmap",
    openShelters: "Open Shelters",
    helplines: "Helplines",
    mythBusting: "Myth Busting",
    recentUpdates: "Recent Updates",
    filterByNeed: "Filter by Need Type",
    filterByTime: "Filter by Time",
    showVerifiedOnly: "Show Verified Only",
    exportData: "Export Data",
    
    // Settings
    manageAccount: "Manage your account and preferences",
    profileInformation: "Profile Information",
    updatePersonalInfo: "Update your personal information",
    fullName: "Full Name",
    email: "Email",
    phoneNumber: "Phone Number",
    saveChanges: "Save Changes",
    notificationPreferences: "Notification Preferences",
    chooseNotifications: "Choose how you want to be notified",
    smsAlerts: "SMS Alerts",
    receiveSMSUpdates: "Receive updates via SMS",
    pushNotifications: "Push Notifications",
    receivePushNotifications: "Receive push notifications",
    checkInReminders: "Check-in Reminders",
    remindBeforeCheckIn: "Remind before scheduled check-ins",
    privacySecurity: "Privacy & Security",
    manageSecuritySettings: "Manage your security settings",
    locationSharing: "Location Sharing",
    defaultCoarseLocation: "Use coarse location by default",
    dataRetention: "Data Retention",
    deleteMyData: "Delete My Data",
    appearance: "Appearance",
    customizeAppLooks: "Customize how the app looks",
    darkMode: "Dark Mode",
    darkThemeActive: "Dark theme is active",
    switchToDarkTheme: "Switch to dark theme",
    language: "Language",
    selectLanguage: "Select your preferred language",
    offlineMode: "Offline Mode",
    offlineQueueSettings: "Offline queue settings",
    autoSyncWhenOnline: "Auto-sync when online",
    preferSMSFallback: "Prefer SMS fallback when offline",
    profilePicture: "Profile Picture",
    uploadPhoto: "Upload Photo",
    removePhoto: "Remove Photo",
    profilePictureHint: "JPG, PNG or GIF (max. 5MB)",
    
    // Settings - Notifications (Emergency specific)
    emergencyAlerts: "Emergency Alerts",
    emergencyAlertsDesc: "Get notified about nearby emergencies",
    reportStatusUpdates: "Report Status Updates",
    reportStatusUpdatesDesc: "Get updates when your reports change status",
    verificationNotifications: "Verification Notifications",
    verificationNotificationsDesc: "Notify when someone verifies your report",
    smsFallback: "SMS Fallback",
    smsFallbackDesc: "Receive SMS when offline or no data",
    
    // Settings - Privacy & Security (Emergency specific)
    locationPrivacy: "Location Privacy",
    locationPrivacyDesc: "Use coarse location by default for reports",
    anonymousReporting: "Anonymous Reporting",
    anonymousReportingDesc: "Allow anonymous reports without registration",
    dataSharing: "Data Sharing with Responders",
    dataSharingDesc: "Share report details with verified responders only",
    clearReportHistory: "Clear Report History",
    clearReportHistoryDesc: "Delete all your submitted reports permanently",
    clear: "Clear",
    
    // Settings - Data & Offline
    dataOffline: "Data & Offline",
    dataOfflineDesc: "Manage offline storage and data sync",
    autoSyncReports: "Auto-Sync Reports",
    autoSyncReportsDesc: "Automatically sync when online",
    offlineModeToggle: "Offline Mode",
    offlineModeToggleDesc: "Save reports locally when offline",
    photoCompression: "Photo Compression",
    photoCompressionDesc: "Compress photos to save data",
    clearLocalData: "Clear Local Data",
    clearLocalDataDesc: "Remove cached reports and photos",
    
    // Offline Queue
    offlineQueue: "Offline Queue",
    pendingReports: "Pending Reports",
    retryNow: "Retry Now",
    editQueued: "Edit",
    
    // Toast Messages
    reportSubmitted: "Report submitted successfully",
    reportQueued: "Report queued - will send when online",
    reportFailed: "Failed to submit report",
    loginSuccessful: "Login successful!",
    invalidCredentials: "Invalid credentials",
    fillAllFields: "Please fill in all required fields",
    profileUpdated: "Profile updated successfully",
    loggedOut: "Logged out successfully",
    darkModeEnabled: "Dark mode enabled",
    lightModeEnabled: "Light mode enabled",
    languageChanged: "Language changed successfully",
    verificationSubmitted: "Verification submitted",
    checkInRecorded: "Check-in recorded successfully",
    locationPermissionDenied: "Location permission denied",
    photoTooLarge: "Photo size must be less than 5MB",
    smsSent: "SMS sent successfully",
    offlineModeActive: "Offline mode - reports will be queued",
    syncComplete: "All reports synced successfully",
    imageTooLarge: "Image size must be less than 5MB",
    profilePictureUpdated: "Profile picture updated successfully",
    profilePictureRemoved: "Profile picture removed successfully",
    notificationDismissed: "Notification dismissed",
    
    // AI Assistant
    aiAssistant: "AI Assistant",
    askAIForHelp: "Ask AI for help",
    aiPlaceholder: "Type your question here...",
    sendMessage: "Send Message",
    aiTyping: "AI is typing...",
    aiWelcomeMessage: "Hello! I'm your AI-powered emergency response assistant. How can I help you today?",
    aiHelpSuggestion1: "How do I report an emergency?",
    aiHelpSuggestion2: "What information should I include?",
    aiHelpSuggestion3: "How do I verify a report?",
  },
  
  hi: {
    // Header
    goodMorning: "सुप्रभात",
    goodAfternoon: "नमस्ते",
    goodEvening: "शुभ संध्या",
    menu: "मेनू",
    menuDescription: "आपातकालीन प्रतिक्रिया सुविधाओं में नेविगेट करें",
    emergencyUser: "स्वयंसेवक",
    userEmail: "volunteer@emergency.org",
    anonymousUser: "अज्ञात उपयोगकर्ता",
    
    // Navigation
    home: "त्वरित रिपोर्ट",
    myReports: "मेरी रिपोर्ट",
    previousReports: "पिछली रिपोर्ट",
    reportsReviewed: "समीक्षा की गई रिपोर्ट",
    safetyCheckins: "सुरक्षा जांच",
    publicDashboard: "सार्वजनिक डैशबोर्ड",
    settings: "सेटिंग्स",
    logout: "लॉग आउट",
    helpSupport: "सहायता और समर्थन",
    witnessMode: "गवाह मोड",
    
    // Login Page
    emergencyResponse: "आपातकालीन प्रतिक्रिया",
    signInOrReport: "आपातकाल की रिपोर्ट करें या स्वयंसेवक के रूप में साइन इन करें",
    quickReportAnonymous: "त्वरित रिपोर्ट (गुमनाम)",
    reportWithoutLogin: "साइन इन किए बिना आवश्यकता की रिपोर्ट करें",
    userLogin: "उपयोगकर्ता लॉगिन",
    trackYourReports: "अपनी रिपोर्ट ट्रैक करें और अपडेट प्राप्त करें",
    volunteerLogin: "स्वयंसेवक लॉगिन",
    verifyAndAssist: "रिपोर्ट सत्यापित करें और उत्तरदाताओं की सहायता करें",
    createAccount: "खाता बनाएं",
    volunteerAccessOnly: "केवल स्वयंसेवक पहुंच",
    username: "उपयोगकर्ता नाम",
    password: "पासवर्ड",
    enterUsername: "उपयोगकर्ता नाम दर्ज करें",
    enterPassword: "अपना पासवर्ड दर्ज करें",
    rememberMe: "मुझे याद रखें",
    forgotPassword: "पासवर्ड भूल गए?",
    signIn: "साइन इन करें",
    signingIn: "साइन इन हो रहा है...",
    
    // Quick Report
    reportNeed: "आवश्यकता की रिपोर्ट करें",
    whatDoYouNeed: "आपको क्या चाहिए?",
    selectNeedType: "आवश्यक सहायता का प्रकार चुनें",
    needType: "आवश्यकता प्रकार",
    needWater: "पानी",
    needMedical: "चिकित्सा",
    needShelter: "आश्रय",
    needFood: "भोजन",
    needOther: "अन्य",
    addDetails: "विवरण जोड़ें",
    microUpdate: "त्वरित अपडेट",
    microUpdatePlaceholder: "स्थिति का संक्षिप्त विवरण...",
    addPhoto: "फोटो जोड़ें",
    location: "स्थान",
    coarseLocation: "सामान्य क्षेत्र",
    preciseLocation: "सटीक निर्देशांक",
    numberOfDependents: "आश्रि���ों की संख्या",
    vulnerableTags: "कमजोर समूह",
    elderly: "बुजुर्ग",
    disability: "विकलांगता",
    medication: "दवा की आवश्यकता",
    pregnant: "गर्भवती",
    children: "बच्चे",
    privacyConsent: "गोपनीयता और साझाकरण",
    shareWithResponders: "सत्यापित उत्तरदाताओं के साथ विवरण साझा करें",
    sharePreciseCoords: "सटीक स्थान साझा करें (केवल उत्तरदाता)",
    reportAnonymously: "गुमनाम रूप से रिपोर्ट करें",
    submitReport: "रिपोर्ट सबमिट करें",
    submitting: "सबमिट हो रहा है...",
    
    // Report Status
    queued: "कतारबद्ध",
    sending: "भेज रहा है",
    sent: "भेजा गया",
    failed: "विफल",
    verified: "सत्यापित",
    duplicate: "संभावित डुप्लिकेट",
    willSendWhenOnline: "ऑनलाइन होने पर भेजा जाएगा",
    sendViaSMS: "SMS के माध्यम से भेजें",
    
    // Priority Levels
    priorityLow: "कम",
    priorityMedium: "मध्यम",
    priorityHigh: "उच्च",
    priorityCritical: "गंभीर",
    
    // My Reports
    yourReports: "आपकी रिपोर्ट",
    viewTrackReports: "अपनी आपातकालीन रिपोर्ट देखें और ट्रैक करें",
    noReportsYet: "अभी तक कोई रिपोर्ट सबमिट नहीं की गई",
    caseId: "केस आईडी",
    reportedOn: "रिपोर्ट किया गया",
    lastUpdate: "अंतिम अपडेट",
    status: "स्थिति",
    priority: "प्राथमिकता",
    verifications: "सत्यापन",
    editReport: "रिपोर्ट संपादित करें",
    requestVerification: "सत्यापन का अनुरोध करें",
    flagDuplicate: "डुप्लिकेट के रूप में फ्लैग करें",
    viewDetails: "विवरण देखें",
    deleteReport: "रिपोर्ट हटाएं",
    clearFilters: "फ़िल्टर साफ़ करें",
    searchPlaceholder: "केस आईडी या विवरण द्वारा खोजें...",
    filterByStatus: "स्थिति द्वारा फ़िल्टर करें",
    filterByPriority: "प्राथमिकता द्वारा फ़िल्टर करें",
    allStatuses: "सभी स्थितियां",
    allPriorities: "सभी प्राथमिकताएं",
    showingResults: "दिखा रहा है",
    totalReports: "कुल रिपोर्ट",
    inProgress: "प्रगति में",
    totalVerifications: "कुल सत्यापन",
    noReportsFound: "कोई रिपोर्ट नहीं मिली",
    adjustFilters: "अपने फ़िल्टर समायोजित करने का प्रयास करें",
    reportDetails: "रिपोर्ट विवरण",
    reportTime: "रिपोर्ट समय",
    reportStatus: "रिपोर्ट स्थिति",
    reportDescription: "विवरण",
    reportLocation: "स्थान",
    reportPriority: "प्राथमिकता",
    
    // Safety Check-ins
    safetyCheckIn: "सुरक्षा जांच",
    areYouSafe: "क्या आप सुरक्षित हैं?",
    imSafe: "मैं सुरक्षित हूं",
    needHelp: "मदद चाहिए",
    missedCheckIn: "छूटी हुई जांच",
    scheduleCheckIn: "जांच शेड्यूल करें",
    nextCheckIn: "अगली जांच",
    checkInHistory: "जांच इतिहास",
    
    // Witness Mode
    verifyReport: "रिपोर्ट सत्यापित करें",
    iSawThis: "मैंने यह देखा",
    notTrue: "सच नहीं है",
    addContext: "संदर्भ जोड़ें",
    witnessContextPlaceholder: "इस रिपोर्ट के बारे में अतिरिक्त जानकारी...",
    submitVerification: "सत्यापन सबमिट करें",
    yourReputation: "आपकी प्रतिष्ठा",
    verificationsProvided: "प्रदान किए गए सत्यापन",
    
    // Volunteer Dashboard
    volunteerDashboard: "स्वयंसेवक डैशबोर्ड",
    reportsToVerify: "सत्यापित करने के लिए रिपोर्ट",
    pendingVerifications: "लंबित सत्यापन",
    activeEmergencies: "सक्रिय आपातकालीन स्थितियां",
    yourVolunteerStats: "आपके स्वयंसेवक आंकड़े",
    reportsVerified: "सत्यापित रिपोर्ट",
    hoursVolunteered: "स्वयंसेवा घंटे",
    trustScore: "विश्वास स्कोर",
    viewReport: "रिपोर्ट देखें",
    verifyNow: "अभी सत्यापित करें",
    assignToMe: "मुझे सौंपें",
    markResolved: "हल किया गया चिह्नित करें",
    needsUrgentAttention: "तत्काल ध्यान चाहिए",
    
    // Report Details Dialog
    reportDetails: "रिपोर्ट विवरण",
    reportedBy: "द्वारा रिपोर्ट किया गया",
    reportTime: "रिपोर्ट समय",
    reportDescription: "विवरण",
    reportLocation: "स्थान",
    reportPhotos: "फोटो",
    reportStatus: "स्थिति",
    reportPriority: "प्राथमिकता",
    close: "बंद करें",
    
    // Verification Dialog
    verificationTitle: "रिपोर्ट सत्यापित करें",
    confirmVerification: "मैं पुष्टि करता हूं कि यह रिपोर्ट सटीक है",
    addVerificationNotes: "अपने नोट्स जोड़ें",
    notesPlaceholder: "अपनी टिप्पणियां, अतिरिक्त विवरण या संदर्भ दर्ज करें...",
    uploadVerificationPhoto: "फोटो अपलोड करें (वैकल्पिक)",
    verificationSuccess: "सत्यापन सफलतापूर्वक सबमिट किया गया",
    cancel: "रद्द करें",
    
    // Public Dashboard
    dashboard: "डैशबोर्ड",
    needsHeatmap: "आवश्यकता हीटमैप",
    openShelters: "खुले आश्रय",
    helplines: "हेल्पलाइन",
    mythBusting: "मिथक तोड़ना",
    recentUpdates: "हाल के अपडेट",
    filterByNeed: "आवश्यकता प्रकार द्वारा फ़िल्टर करें",
    filterByTime: "समय द्वारा फ़िल्टर करें",
    showVerifiedOnly: "केवल सत्यापित दिखाएं",
    exportData: "डेटा निर्यात करें",
    
    // Settings
    manageAccount: "अपना खाता और प्राथमिकताएं प्रबंधित करें",
    profileInformation: "प्रोफ़ाइल जानकारी",
    updatePersonalInfo: "अपनी व्यक्तिगत जानकारी अपडेट करें",
    fullName: "पूरा नाम",
    email: "ईमेल",
    phoneNumber: "फ़ोन नंबर",
    saveChanges: "परिवर्तन सहेजें",
    notificationPreferences: "सूचना प्राथमिकताएं",
    chooseNotifications: "चुनें कि आपको कैसे सूचित किया जाए",
    smsAlerts: "SMS अलर्ट",
    receiveSMSUpdates: "SMS के माध्यम से अपडेट प्राप्त करें",
    pushNotifications: "पुश सूचनाएं",
    receivePushNotifications: "पुश सूचनाएं प्राप्त करें",
    checkInReminders: "जांच अनुस्मारक",
    remindBeforeCheckIn: "निर्धारित जांच से पहले याद दिलाएं",
    privacySecurity: "गोपनीयता और सुरक्षा",
    manageSecuritySettings: "अपनी सुरक्षा सेटिंग्स प्रबंधित करें",
    locationSharing: "स्थान साझाकरण",
    defaultCoarseLocation: "डिफ़ॉल्ट रूप से मोटे स्थान का उपयोग करें",
    dataRetention: "डेटा प्रतिधारण",
    deleteMyData: "मेरा डेटा हटाएं",
    appearance: "दिखावट",
    customizeAppLooks: "ऐप कैसा दिखता है उसे अनुकूलित करें",
    darkMode: "डार्क मोड",
    darkThemeActive: "डार्क थी�� सक्रिय है",
    switchToDarkTheme: "डार्क थीम पर स्विच करें",
    language: "भाषा",
    selectLanguage: "अपनी पसंदीदा भाषा चुनें",
    offlineMode: "ऑफ़लाइन मोड",
    offlineQueueSettings: "ऑफ़लाइन कतार सेटिंग्स",
    autoSyncWhenOnline: "ऑनलाइन होने पर ऑटो-सिंक करें",
    preferSMSFallback: "ऑफ़लाइन होने पर SMS फ़ॉलबैक पसंद करें",
    profilePicture: "प्रोफ़ाइल तस्वीर",
    uploadPhoto: "फोटो अपलोड करें",
    removePhoto: "फोटो हटाएं",
    profilePictureHint: "JPG, PNG या GIF (अधिकतम 5MB)",
    
    // Settings - Notifications (Emergency specific)
    emergencyAlerts: "आपातकालीन अलर्ट",
    emergencyAlertsDesc: "पास की आपात स्थितियों के बारे में सूचित हों",
    reportStatusUpdates: "रिपोर्ट स्थिति अपडेट",
    reportStatusUpdatesDesc: "जब आपकी रिपोर्ट की स्थिति बदलती है तो अपडेट प्राप्त करें",
    verificationNotifications: "सत्यापन सूचनाएं",
    verificationNotificationsDesc: "जब कोई आपकी रिपोर्ट सत्यापित करता है तो सूचित करें",
    smsFallback: "SMS फ़ॉलबैक",
    smsFallbackDesc: "ऑफ़लाइन होने पर या डेटा न होने पर SMS प्राप्त करें",
    
    // Settings - Privacy & Security (Emergency specific)
    locationPrivacy: "स्थान गोपनीयता",
    locationPrivacyDesc: "रिपोर्ट के लिए डिफ़ॉल्ट रूप से मोटे स्थान का उपयोग करें",
    anonymousReporting: "अज्ञात रिपोर्टिंग",
    anonymousReportingDesc: "पंजीकरण के बिना अज्ञात रिपोर्ट की अनुमति दें",
    dataSharing: "प्रतिक्रियाकर्ताओं के साथ डेटा साझाकरण",
    dataSharingDesc: "केवल सत्यापित प्रतिक्रियाकर्ताओं ��े साथ रिपोर्ट विवरण साझा करें",
    clearReportHistory: "रिपोर्ट इतिहास साफ़ करें",
    clearReportHistoryDesc: "अपनी सभी सबमिट की गई रिपोर्ट स्थायी रूप से हटाएं",
    clear: "साफ़ करें",
    
    // Settings - Data & Offline
    dataOffline: "डेटा और ऑफ़लाइन",
    dataOfflineDesc: "ऑफ़लाइन संग्रहण और डेटा सिंक प्रबंधित करें",
    autoSyncReports: "ऑटो-सिंक रिपोर्ट",
    autoSyncReportsDesc: "ऑनलाइन होने पर स्वचालित रूप से सिंक करें",
    offlineModeToggle: "ऑफ़लाइन मोड",
    offlineModeToggleDesc: "ऑफ़लाइन होने पर रिपोर्ट स्थानीय रूप से सहेजें",
    photoCompression: "फोटो संपीड़न",
    photoCompressionDesc: "डेटा बचाने के लिए फोटो संपीड़ित करें",
    clearLocalData: "स्थानीय डेटा साफ़ करें",
    clearLocalDataDesc: "कैश किए गए रिपोर्ट और फोटो हटाएं",
    
    // Offline Queue
    offlineQueue: "ऑफ़लाइन कतार",
    pendingReports: "लंबित रिपोर्ट",
    retryNow: "अभी पुनः प्रयास करें",
    editQueued: "संपादित करें",
    
    // Toast Messages
    reportSubmitted: "रिपोर्ट सफलतापूर्वक सबमिट की गई",
    reportQueued: "रिपोर्ट कतारबद्ध - ऑनलाइन होने पर भेजी जाएगी",
    reportFailed: "रिपोर्ट सबमिट करने में विफल",
    loginSuccessful: "लॉगिन सफल!",
    invalidCredentials: "अमान्य क्रेडेंशियल्स",
    fillAllFields: "कृपया सभी आवश्यक फ़ील्ड भरें",
    profileUpdated: "प्रोफ़ाइल सफलतापूर्वक अपडेट की गई",
    loggedOut: "सफलतापूर्वक लॉग आउट किया गया",
    darkModeEnabled: "डार्क मोड सक्षम किया गया",
    lightModeEnabled: "लाइट मोड सक्षम किया गया",
    languageChanged: "भाषा सफलतापूर्वक बदल दी गई",
    verificationSubmitted: "सत्यापन सबमिट किया गया",
    checkInRecorded: "जांच सफलतापूर्वक दर्ज की गई",
    locationPermissionDenied: "स्थान अनुमति अस्वीकृत",
    photoTooLarge: "फोटो का आकार 5MB से कम होना चाहिए",
    smsSent: "SMS सफलतापूर्वक भेजा गया",
    offlineModeActive: "ऑफ़लाइन मोड - रिपोर्ट कतारबद्ध की जाएंगी",
    syncComplete: "सभी रिपोर्ट सफलतापूर्वक सिंक हो गईं",
    imageTooLarge: "छवि का आकार 5MB से कम होना चाहिए",
    profilePictureUpdated: "प्रोफ़ाइल तस्वीर सफलतापूर्वक अपडेट की गई",
    profilePictureRemoved: "प्रोफ़ाइल तस्वीर सफलतापूर्वक हटाई गई",
    notificationDismissed: "सूचना खारिज की गई",
    
    // AI Assistant
    aiAssistant: "AI Assistant",
    askAIForHelp: "Ask AI for help",
    aiPlaceholder: "Type your question here...",
    sendMessage: "Send Message",
    aiTyping: "AI is typing...",
    aiWelcomeMessage: "Hello! I'm your AI-powered emergency response assistant. How can I help you today?",
    aiHelpSuggestion1: "How do I report an emergency?",
    aiHelpSuggestion2: "What information should I include?",
    aiHelpSuggestion3: "How do I verify a report?",
    
    // Volunteer Dashboard
    volunteerDashboard: "स्वयंसेवक डैशबोर्ड",
    reportsToVerify: "सत्यापित करने के लिए रिपोर्ट",
    pendingVerifications: "लंबित सत्यापन",
    activeEmergencies: "सक्रिय आपातकाल",
    yourVolunteerStats: "आपके स्वयंसेवक आँकड़े",
    reportsVerified: "सत्यापित रिपोर्ट",
    hoursVolunteered: "स्वयंसेवी घंटे",
    trustScore: "विश्वास स्कोर",
    viewReport: "रिपोर्ट देखें",
    verifyNow: "अभी सत्यापित करें",
    rejectReport: "रिपोर्ट अस्वीकार करें",
    assignToMe: "मुझे असाइन करें",
    markResolved: "हल के रूप में चिह्नित करें",
    needsUrgentAttention: "तत्काल ध्यान देने की आवश्यकता है",
    
    // Report Details Dialog
    reportedBy: "द्वारा रिपोर्ट किया गया",
    reportPhotos: "फोटो",
    close: "बंद करें",
    
    // Verification Dialog
    verificationTitle: "रिपोर्ट सत्यापित करें",
    confirmVerification: "मैं पुष्टि करता हूं कि यह रिपोर्ट सटीक है",
    addVerificationNotes: "अपने नोट्स जोड़ें",
    notesPlaceholder: "अपने अवलोकन, अतिरिक्त विवरण या संदर्भ दर्ज करें...",
    uploadVerificationPhoto: "फोटो अपलोड करें (वैकल्पिक)",
    verificationSuccess: "सत्यापन सफलतापूर्वक सबमिट किया गया",
    cancel: "रद्द करें",
    
    // Dashboard
    dashboard: "डैशबोर्ड",
    needsHeatmap: "आवश्यकताओं का हीट मैप",
    openShelters: "खुले आश्रय",
    helplines: "हेल्पलाइन",
    mythBusting: "मिथक तोड़ना",
    recentUpdates: "हाल के अपडेट",
    filterByNeed: "आवश्यकता प्रकार द्वारा फ़िल्टर करें",
    filterByTime: "समय द्वारा फ़िल्टर करें",
    showVerifiedOnly: "केवल सत्यापित दिखाएं",
    exportData: "डेटा निर्यात करें",
  },
  
  kn: {
    // Header
    goodMorning: "ಶುಭೋದಯ",
    goodAfternoon: "ನಮಸ್ಕಾರ",
    goodEvening: "ಶುಭ ಸಂಜೆ",
    menu: "ಮೆನು",
    menuDescription: "ತುರ್ತು ಪ್ರತಿಕ್ರಿಯೆ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ನ್ಯಾವಿಗೇಟ್ ಮಾಡಿ",
    emergencyUser: "ಸ್ವಯಂಸೇವಕ",
    userEmail: "volunteer@emergency.org",
    anonymousUser: "ಅಜ್ಞಾತ ಬಳಕೆದಾರ",
    
    // Navigation
    home: "ತ್ವರಿತ ವರದಿ",
    myReports: "ನನ್ನ ವರದಿಗಳು",
    previousReports: "ಹಿಂದಿನ ವರದಿಗಳು",
    reportsReviewed: "ಪರಿಶೀಲಿಸಿದ ವರದಿಗಳು",
    safetyCheckins: "ಸುರಕ್ಷತೆ ಪರಿಶೀಲನೆಗಳು",
    publicDashboard: "ಸಾರ್ವಜನಿಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    logout: "ಲಾಗ್ ಔಟ್",
    helpSupport: "ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ",
    witnessMode: "ಸಾಕ್ಷಿ ಮೋಡ್",
    
    // Login Page
    emergencyResponse: "ತುರ್ತು ಪ್ರತಿಕ್ರಿಯೆ",
    signInOrReport: "ತುರ್ತು ವರದಿ ಮಾಡಿ ಅಥವಾ ಸ್ವಯಂಸೇವಕರಾಗಿ ಸೈನ್ ಇನ್ ಮಾಡಿ",
    quickReportAnonymous: "ತ್ವರಿತ ವರದಿ (ಅನಾಮಧೇಯ)",
    reportWithoutLogin: "ಸೈನ್ ಇನ್ ಮಾಡದೆ ಅಗತ್ಯವನ್ನು ವರದಿ ಮಾಡಿ",
    userLogin: "ಬಳಕೆದಾರ ಲಾಗಿನ್",
    trackYourReports: "ನಿಮ್ಮ ವರದಿಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ ಮತ್ತು ನವೀಕರಣಗಳನ್ನು ಪಡೆಯಿರಿ",
    volunteerLogin: "ಸ್ವಯಂಸೇವಕ ಲಾಗಿನ್",
    verifyAndAssist: "ವರದಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಪ್ರತಿಕ್ರಿಯಿಸುವವರಿಗೆ ಸಹಾಯ ಮಾಡಿ",
    createAccount: "ಖಾತೆ ರಚಿಸಿ",
    volunteerAccessOnly: "ಸ್ವಯಂಸೇವಕ ಪ್ರವೇಶ ಮಾತ್ರ",
    username: "ಬಳಕೆದಾರ ಹೆಸರು",
    password: "ಪಾಸ್‌ವರ್ಡ್",
    enterUsername: "ಬಳಕೆದಾರ ಹೆಸರು ನಮೂದಿಸಿ",
    enterPassword: "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ",
    rememberMe: "ನನ್ನನ್ನು ನೆನಪಿಡಿ",
    forgotPassword: "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರುವಿರಾ?",
    signIn: "ಸೈನ್ ಇನ್ ಮಾಡಿ",
    signingIn: "ಸೈನ್ ಇನ್ ಆಗುತ್ತಿದೆ...",
    
    // Quick Report
    reportNeed: "ಅಗತ್ಯವನ್ನು ವರದಿ ಮಾಡಿ",
    whatDoYouNeed: "ನಿಮಗೆ ಏನು ಬೇಕು?",
    selectNeedType: "ಅಗತ್ಯವಿರುವ ಸಹಾಯದ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    needType: "ಅಗತ್ಯ ಪ್ರಕಾರ",
    needWater: "ನೀರು",
    needMedical: "ವೈದ್ಯಕೀಯ",
    needShelter: "ಆಶ್ರಯ",
    needFood: "ಆಹಾರ",
    needOther: "ಇತರೆ",
    addDetails: "ವಿವರಗಳನ್ನು ಸೇರಿಸಿ",
    microUpdate: "ತ್ವರಿತ ನವೀಕರಣ",
    microUpdatePlaceholder: "ಪರಿಸ್ಥಿತಿಯ ಸಂಕ್ಷಿಪ್ತ ವಿವರಣೆ...",
    addPhoto: "ಫೋಟೋ ಸೇರಿಸಿ",
    location: "ಸ್ಥಳ",
    coarseLocation: "ಸಾಮಾನ್ಯ ಪ್ರದೇಶ",
    preciseLocation: "ನಿಖರ ನಿರ್ದೇಶಾಂಕಗಳು",
    numberOfDependents: "ಅವಲಂಬಿತರ ಸಂಖ್ಯೆ",
    vulnerableTags: "ದುರ್ಬಲ ಗುಂಪುಗಳು",
    elderly: "ವಯಸ್ಸಾದವರು",
    disability: "ಅಂಗವೈಕಲ್ಯ",
    medication: "ಔಷಧಿ ಅಗತ್ಯವಿದೆ",
    pregnant: "ಗರ್ಭಿಣಿ",
    children: "ಮಕ್ಕಳು",
    privacyConsent: "ಗೌಪ್ಯತೆ ಮತ್ತು ಹಂಚಿಕೆ",
    shareWithResponders: "ಪರಿಶೀಲಿತ ಪ್ರತಿಕ್ರಿಯಿಸುವವರೊಂದಿಗೆ ವಿವರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ",
    sharePreciseCoords: "ನಿಖರ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ (ಪ್ರತಿಕ್ರಿಯಿಸುವವರು ಮಾತ್ರ)",
    reportAnonymously: "ಅನಾಮಧೇಯವಾಗಿ ವರದಿ ಮಾಡಿ",
    submitReport: "ವರದಿ ಸಲ್ಲಿಸಿ",
    submitting: "ಸಲ್ಲಿಸುತ್ತಿದೆ...",
    
    // Report Status
    queued: "ಸರದಿಯಲ್ಲಿ",
    sending: "ಕಳುಹಿಸುತ್ತಿದೆ",
    sent: "ಕಳುಹಿಸಲಾಗಿದೆ",
    failed: "ವಿಫಲವಾಗಿದೆ",
    verified: "ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    duplicate: "ಸಂಭವನೀಯ ನಕಲು",
    willSendWhenOnline: "ಆನ್‌ಲೈನ್ ಆದಾಗ ಕಳುಹಿಸಲಾಗುತ್ತದೆ",
    sendViaSMS: "SMS ಮೂಲಕ ಕಳುಹಿಸಿ",
    
    // Priority Levels
    priorityLow: "ಕಡಿಮೆ",
    priorityMedium: "ಮಧ್ಯಮ",
    priorityHigh: "ಹೆಚ್ಚು",
    priorityCritical: "ಗಂಭೀರ",
    
    // My Reports
    yourReports: "ನಿಮ್ಮ ವರದಿಗಳು",
    viewTrackReports: "ನಿಮ್ಮ ತುರ್ತು ವರದಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ ಮತ್ತು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    noReportsYet: "ಇನ್ನೂ ಯಾವುದೇ ವರದಿಗಳನ್ನು ಸಲ್ಲಿಸಲಾಗಿಲ್ಲ",
    caseId: "ಕೇಸ್ ಐಡಿ",
    reportedOn: "ವರದಿ ಮಾಡಲಾಗಿದೆ",
    lastUpdate: "ಕೊನೆಯ ನವೀಕರಣ",
    status: "ಸ್ಥಿತಿ",
    priority: "ಆದ್ಯತೆ",
    verifications: "ಪರಿಶೀಲನೆಗಳು",
    editReport: "ವರದಿ ಸಂಪಾದಿಸಿ",
    requestVerification: "ಪರಿಶೀಲನೆ ವಿನಂತಿಸಿ",
    flagDuplicate: "ನಕಲು ಎಂದು ಫ್ಲ್ಯಾಗ್ ಮಾಡಿ",
    viewDetails: "ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    deleteReport: "ವರದಿ ಅಳಿಸಿ",
    clearFilters: "ಫಿಲ್ಟರ್‌ಗಳನ್ನು ತೆರವುಗೊಳಿಸಿ",
    searchPlaceholder: "ಕೇಸ್ ಐಡಿ ಅಥವಾ ವಿವರಣೆಯಿಂದ ಹುಡುಕಿ...",
    filterByStatus: "ಸ್ಥಿತಿಯಿಂದ ಫಿಲ್ಟರ್ ಮಾಡಿ",
    filterByPriority: "ಆದ್ಯತೆಯಿಂದ ಫಿಲ್ಟರ್ ಮಾಡಿ",
    allStatuses: "ಎಲ್ಲಾ ಸ್ಥಿತಿಗಳು",
    allPriorities: "ಎಲ್ಲಾ ಆದ್ಯತೆಗಳು",
    showingResults: "ತೋರಿಸಲಾಗುತ್ತಿದೆ",
    totalReports: "ಒಟ್ಟು ವರದಿಗಳು",
    inProgress: "ಪ್ರಗತಿಯಲ್ಲಿದೆ",
    totalVerifications: "ಒಟ್ಟು ಪರಿಶೀಲನೆಗಳು",
    noReportsFound: "ಯಾವುದೇ ವರದಿಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
    adjustFilters: "ನಿಮ್ಮ ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಸರಿಹೊಂದಿಸಲು ಪ್ರಯತ್ನಿಸಿ",
    reportDetails: "ವರದಿ ವಿವರಗಳು",
    reportTime: "ವರದಿ ಸಮಯ",
    reportStatus: "ವರದಿ ಸ್ಥಿತಿ",
    reportDescription: "ವಿವರಣೆ",
    reportLocation: "ಸ್ಥಳ",
    reportPriority: "ಆದ್ಯತೆ",
    
    // Safety Check-ins
    safetyCheckIn: "ಸುರಕ್ಷತೆ ಪರಿಶೀಲನೆ",
    areYouSafe: "ನೀವು ಸುರಕ್ಷಿತವಾಗಿದ್ದೀರಾ?",
    imSafe: "ನಾನು ಸುರಕ್ಷಿತವಾಗಿದ್ದೇನೆ",
    needHelp: "ಸಹಾಯ ಬೇಕು",
    missedCheckIn: "ತಪ್ಪಿದ ಪರಿಶೀಲನೆ",
    scheduleCheckIn: "ಪರಿಶೀಲನೆ ನಿಗದಿಸಿ",
    nextCheckIn: "ಮುಂದಿನ ಪರಿಶೀಲನೆ",
    checkInHistory: "ಪರಿಶೀಲನೆ ಇತಿಹಾಸ",
    
    // Witness Mode
    verifyReport: "ವರದಿ ಪರಿಶೀಲಿಸಿ",
    iSawThis: "ನಾನು ಇದನ್ನು ನೋಡಿದೆ",
    notTrue: "ನಿಜವಲ್ಲ",
    addContext: "ಸಂದರ್ಭ ಸೇರಿಸಿ",
    witnessContextPlaceholder: "ಈ ವರದಿಯ ಬಗ್ಗೆ ಹೆಚ್ಚುವರಿ ಮಾಹಿತಿ...",
    submitVerification: "ಪರಿಶೀಲನೆ ಸಲ್ಲಿಸಿ",
    yourReputation: "ನಿಮ್ಮ ಖ್ಯಾತಿ",
    verificationsProvided: "ಒದಗಿಸಿದ ಪರಿಶೀಲನೆಗಳು",
    
    // Volunteer Dashboard
    volunteerDashboard: "ಸ್ವಯಂಸೇವಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    reportsToVerify: "ಪರಿಶೀಲಿಸಲು ವರದಿಗಳು",
    pendingVerifications: "ಬಾಕಿ ಪರಿಶೀಲನೆಗಳು",
    activeEmergencies: "ಸಕ್ರಿಯ ತುರ್ತುಸ್ಥಿತಿಗಳು",
    yourVolunteerStats: "ನಿಮ್ಮ ಸ್ವಯಂಸೇವಕ ಅಂಕಿಅಂಶಗಳು",
    reportsVerified: "ಪರಿಶೀಲಿಸಿದ ವರದಿಗಳು",
    hoursVolunteered: "��್ವಯಂಸೇವಾ ಗಂಟೆಗಳು",
    trustScore: "ವಿಶ್ವಾಸ ಸ್ಕೋರ್",
    viewReport: "ವರದಿ ವೀಕ್ಷಿಸಿ",
    verifyNow: "ಈಗ ಪರಿಶೀಲಿಸಿ",
    assignToMe: "ನನಗೆ ನಿಯೋಜಿಸಿ",
    markResolved: "ಪರಿಹರಿಸಲಾಗಿದೆ ಎಂದು ಗುರುತಿಸಿ",
    needsUrgentAttention: "ತುರ್ತು ಗಮನದ ಅಗತ್ಯವಿದೆ",
    
    // Report Details Dialog
    reportDetails: "ವರದಿ ವಿವರಗಳು",
    reportedBy: "ವರದಿ ಮಾಡಿದವರು",
    reportTime: "ವರದಿ ಸಮಯ",
    reportDescription: "ವಿವರಣೆ",
    reportLocation: "ಸ್ಥಳ",
    reportPhotos: "ಫೋಟೋಗಳು",
    reportStatus: "ಸ್ಥಿತಿ",
    reportPriority: "ಆದ್ಯತೆ",
    close: "ಮುಚ್ಚಿ",
    
    // Verification Dialog
    verificationTitle: "ವರದಿ ಪರಿಶೀಲಿಸಿ",
    confirmVerification: "ಈ ವರದಿ ನಿಖರವಾಗಿದೆ ಎಂದು ನಾನು ದೃಢೀಕರಿಸುತ್ತೇನೆ",
    addVerificationNotes: "ನಿಮ್ಮ ಟಿಪ್ಪಣಿಗಳನ್ನು ಸೇರಿಸಿ",
    notesPlaceholder: "ನಿಮ್ಮ ಅವಲೋಕನಗಳು, ಹೆಚ್ಚುವರಿ ವಿವರಗಳು ಅಥವಾ ಸಂದರ್ಭವನ್ನು ನಮೂದಿಸಿ...",
    uploadVerificationPhoto: "ಫೋಟೋ ಅಪ್ಲೋಡ್ ಮಾಡಿ (ಐಚ್ಛಿಕ)",
    verificationSuccess: "ಪರಿಶೀಲನೆ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ",
    cancel: "ರದ್ದುಮಾಡಿ",
    
    // Public Dashboard
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    needsHeatmap: "ಅಗತ್ಯಗಳ ಹೀಟ್‌ಮ್ಯಾಪ್",
    openShelters: "ತೆರೆದ ಆಶ್ರಯಗಳು",
    helplines: "ಹೆಲ್ಪ್‌ಲೈನ್‌ಗಳು",
    mythBusting: "ಮಿಥ್ ಬಸ್ಟಿಂಗ್",
    recentUpdates: "ಇತ್ತೀಚಿನ ನವೀಕರಣಗಳು",
    filterByNeed: "ಅಗತ್ಯ ಪ್ರಕಾರದಿಂದ ಫಿಲ್ಟರ್ ಮಾಡಿ",
    filterByTime: "ಸಮಯದಿಂದ ಫಿಲ್ಟರ್ ಮಾಡಿ",
    showVerifiedOnly: "ಪರಿಶೀಲಿಸಿದವುಗಳನ್ನು ಮಾತ್ರ ತೋರಿಸಿ",
    exportData: "ಡೇಟಾ ರಫ್ತು ಮಾಡಿ",
    
    // Settings
    manageAccount: "ನಿಮ್ಮ ಖಾತೆ ಮತ್ತು ಆದ್ಯತೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    profileInformation: "ಪ್ರೊಫೈಲ್ ಮಾಹಿತಿ",
    updatePersonalInfo: "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ನವೀಕರಿಸಿ",
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    email: "ಇಮೇಲ್",
    phoneNumber: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
    saveChanges: "ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ",
    notificationPreferences: "ಅಧಿಸೂಚನೆ ಆದ್ಯತೆಗಳು",
    chooseNotifications: "ನಿಮಗೆ ಹೇಗೆ ಸೂಚಿಸಬೇಕೆಂದು ಆಯ್ಕೆಮಾಡಿ",
    smsAlerts: "SMS ಎಚ್ಚರಿಕೆಗಳು",
    receiveSMSUpdates: "SMS ಮೂಲಕ ನವೀಕರಣಗಳನ್ನು ಸ್ವೀಕರಿಸಿ",
    pushNotifications: "ಪುಶ್ ಅಧಿಸೂಚನೆಗಳು",
    receivePushNotifications: "ಪುಶ್ ಅಧಿಸೂಚನೆಗಳನ್ನು ಸ್ವೀಕರಿಸಿ",
    checkInReminders: "ಪರಿಶೀಲನೆ ಜ್ಞಾಪನೆಗಳು",
    remindBeforeCheckIn: "ನಿಗದಿತ ಪರಿಶೀಲನೆಗಳ ಮೊದಲು ನೆನಪಿಸಿ",
    privacySecurity: "ಗೌಪ್ಯತೆ ಮತ್ತು ಸುರಕ್ಷತೆ",
    manageSecuritySettings: "ನಿಮ್ಮ ಸುರಕ್ಷತೆ ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    locationSharing: "ಸ್ಥಳ ಹಂಚಿಕೆ",
    defaultCoarseLocation: "ಡೀಫಾಲ್ಟ್ ಆಗಿ ಸ್ಥೂಲ ಸ್ಥಳವನ್ನು ಬಳಸಿ",
    dataRetention: "ಡೇಟಾ ಧಾರಣ",
    deleteMyData: "ನನ್ನ ಡೇಟಾ ಅಳಿಸಿ",
    appearance: "ನೋಟ",
    customizeAppLooks: "ಅಪ್ಲಿಕೇಶನ್ ಹೇಗೆ ಕಾಣುತ್ತದೆ ಎಂಬುದನ್ನು ಕಸ್ಟಮೈಜ್ ಮಾಡಿ",
    darkMode: "ಡಾರ್ಕ್ ಮೋಡ್",
    darkThemeActive: "ಡಾರ್ಕ್ ಥೀಮ್ ಸಕ್ರಿಯವಾಗಿದೆ",
    switchToDarkTheme: "ಡಾರ್ಕ್ ಥೀಮ್‌ಗೆ ಬದಲಾಯಿಸಿ",
    language: "ಭಾಷೆ",
    selectLanguage: "ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    offlineMode: "ಆಫ್‌ಲೈನ್ ಮೋಡ್",
    offlineQueueSettings: "ಆಫ್‌ಲೈನ್ ಸರತಿ ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    autoSyncWhenOnline: "ಆನ್‌ಲೈನ್ ಆದಾಗ ಸ್ವಯಂ-ಸಿಂಕ್ ಮಾಡಿ",
    preferSMSFallback: "ಆಫ್‌ಲೈನ್ ಆದಾಗ SMS ಫಾಲ್‌ಬ್ಯಾಕ್ ಅನ್ನು ಆದ್ಯತೆ ನೀಡಿ",
    profilePicture: "ಪ್ರೊಫೈಲ್ ಚಿತ್ರ",
    uploadPhoto: "ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    removePhoto: "ಫೋಟೋ ತೆಗೆದುಹಾಕಿ",
    profilePictureHint: "JPG, PNG ಅಥವಾ GIF (ಗರಿಷ್ಠ 5MB)",
    
    // Settings - Notifications (Emergency specific)
    emergencyAlerts: "ತುರ್ತು ಎಚ್ಚರಿಕೆಗಳು",
    emergencyAlertsDesc: "ಹತ್ತಿರದ ತುರ್ತು ಪರಿಸ್ಥಿತಿಗಳ ಬಗ್ಗೆ ಸೂಚನೆ ಪಡೆಯಿರಿ",
    reportStatusUpdates: "ವರದಿ ಸ್ಥಿತಿ ನವೀಕರಣಗಳು",
    reportStatusUpdatesDesc: "ನಿಮ್ಮ ವರದಿಗಳ ಸ್ಥಿತಿ ಬದಲಾದಾಗ ನವೀಕರಣಗಳನ್ನು ಪಡೆಯಿರಿ",
    verificationNotifications: "ಪರಿಶೀಲನೆ ಅಧಿಸೂಚನೆಗಳು",
    verificationNotificationsDesc: "ಯಾರಾದರೂ ನಿಮ್ಮ ವರದಿಯನ್ನು ಪರಿಶೀಲಿಸಿದಾಗ ಸೂಚಿಸಿ",
    smsFallback: "SMS ಫಾಲ್‌ಬ್ಯಾಕ್",
    smsFallbackDesc: "ಆಫ್‌ಲೈನ್ ಅಥವಾ ಡೇಟಾ ಇಲ್ಲದಿದ್ದಾಗ SMS ಸ್ವೀಕರಿಸಿ",
    
    // Settings - Privacy & Security (Emergency specific)
    locationPrivacy: "ಸ್ಥಾನ ಗೌಪ್ಯತೆ",
    locationPrivacyDesc: "ವರದಿಗಳಿಗೆ ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ಸ್ಥೂಲ ಸ್ಥಾನವನ್ನು ಬಳಸಿ",
    anonymousReporting: "ಅಜ್ಞಾತ ವರದಿ ಮಾಡುವಿಕೆ",
    anonymousReportingDesc: "ನೋಂದಣಿ ಇಲ್ಲದೆ ಅಜ್ಞಾತ ವರದಿಗಳನ್ನು ಅನುಮತಿಸಿ",
    dataSharing: "ಪ್ರತಿಕ್ರಿಯಾಕಾರರೊಂದಿಗೆ ಡೇಟಾ ಹಂಚಿಕೆ",
    dataSharingDesc: "ಪರಿಶೀಲಿಸಿದ ಪ್ರತಿಕ್ರಿಯಾಕಾರರೊಂದಿಗೆ ಮಾತ್ರ ವರದಿ ವಿವರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ",
    clearReportHistory: "ವರದಿ ಇತಿಹಾಸವನ್ನು ತೆರವುಗೊಳಿಸಿ",
    clearReportHistoryDesc: "ನಿಮ್ಮ ಎಲ್ಲಾ ಸಲ್ಲಿಸಿದ ವರದಿಗಳನ್ನು ಶಾಶ್ವತವಾಗಿ ಅಳಿಸಿ",
    clear: "ತೆರವುಗೊಳಿಸಿ",
    
    // Settings - Data & Offline
    dataOffline: "ಡೇಟಾ ಮತ್ತು ಆಫ್‌ಲೈನ್",
    dataOfflineDesc: "ಆಫ್‌ಲೈನ್ ಸಂಗ್ರಹಣೆ ಮತ್ತು ಡೇಟಾ ಸಿಂಕ್ ನಿರ್ವಹಿಸಿ",
    autoSyncReports: "ಸ್ವಯಂ-ಸಿಂಕ್ ವರದಿಗಳು",
    autoSyncReportsDesc: "ಆನ್‌ಲೈನ್ ಆದಾಗ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸಿಂಕ್ ಮಾಡಿ",
    offlineModeToggle: "ಆಫ್‌ಲೈನ್ ಮೋಡ್",
    offlineModeToggleDesc: "ಆಫ್‌ಲೈನ್ ಆದಾಗ ವರದಿಗಳನ್ನು ಸ್ಥಳೀಯವಾಗಿ ಉಳಿಸಿ",
    photoCompression: "ಫೋಟೋ ಸಂಕೋಚನ",
    photoCompressionDesc: "ಡೇಟಾವನ್ನು ಉಳಿಸಲು ಫೋಟೋಗಳನ್ನು ಸಂಕುಚಿತಗೊಳಿಸಿ",
    clearLocalData: "ಸ್ಥಳೀಯ ಡೇಟಾವನ್ನು ತೆರವುಗೊಳಿಸಿ",
    clearLocalDataDesc: "ಸಂಗ್ರಹಿಸಿದ ವರದಿಗಳು ಮತ್ತು ಫೋಟೋಗಳನ್ನು ತೆಗೆದುಹಾಕಿ",
    
    // Offline Queue
    offlineQueue: "ಆಫ್‌ಲೈನ್ ಸರತಿ",
    pendingReports: "ಬಾಕಿ ಇರುವ ವರದಿಗಳು",
    retryNow: "ಈಗ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    editQueued: "ಸಂಪಾದಿಸಿ",
    
    // Toast Messages
    reportSubmitted: "ವರದಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ",
    reportQueued: "ವರದಿ ಸರತಿಯಲ್ಲಿದೆ - ಆನ್‌ಲೈನ್ ಆದಾಗ ಕಳುಹಿಸಲಾಗುತ್ತದೆ",
    reportFailed: "ವರದಿ ಸಲ್ಲಿಸಲು ವಿಫಲವಾಗಿದೆ",
    loginSuccessful: "ಲಾಗಿನ್ ಯಶಸ್ವಿಯಾಗಿದೆ!",
    invalidCredentials: "ಅಮಾನ್ಯ ರುಜುವಾತುಗಳು",
    fillAllFields: "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಅಗತ್ಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ",
    profileUpdated: "ಪ್ರೊಫೈಲ್ ಅನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ",
    loggedOut: "ಯಶಸ್ವಿಯಾಗಿ ಲಾಗ್ ಔಟ್ ಮಾಡಲಾಗಿದೆ",
    darkModeEnabled: "ಡಾರ್ಕ್ ಮೋಡ್ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ",
    lightModeEnabled: "ಲೈಟ್ ಮೋಡ್ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ",
    languageChanged: "ಭಾಷೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಬದಲಾಯಿಸಲಾಗಿದೆ",
    verificationSubmitted: "ಪರಿಶೀಲನೆ ಸಲ್ಲಿಸಲಾಗಿದೆ",
    checkInRecorded: "ಪರಿಶೀಲನೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಿಸಲಾಗಿದೆ",
    locationPermissionDenied: "ಸ್ಥಳ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ",
    photoTooLarge: "ಫೋಟೋ ಗಾತ್ರ 5MB ಕ್ಕಿಂತ ಕಡಿಮೆ ಇರಬೇಕು",
    smsSent: "SMS ಅನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ",
    offlineModeActive: "ಆಫ್‌ಲೈನ್ ಮೋಡ್ - ವರದಿಗಳನ್ನು ಸರತಿಗೆ ಸೇರಿಸಲಾಗುತ್ತದೆ",
    syncComplete: "ಎಲ್ಲಾ ವರದಿಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸಿಂಕ್ ಮಾಡಲಾಗಿದೆ",
    imageTooLarge: "ಚಿತ್ರದ ಗಾತ್ರ 5MB ಕ್ಕಿಂತ ಕಡಿಮೆ ಇರಬೇಕು",
    profilePictureUpdated: "ಪ್ರೊಫೈಲ್ ಚಿತ್ರವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ",
    profilePictureRemoved: "ಪ್ರೊಫೈಲ್ ಚಿತ್ರವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ತೆಗೆದುಹಾಕಲಾಗಿದೆ",
    notificationDismissed: "ಅಧಿಸೂಚನೆ ವಜಾಗೊಳಿಸಲಾಗಿದೆ",
    
    // AI Assistant
    aiAssistant: "AI Assistant",
    askAIForHelp: "Ask AI for help",
    aiPlaceholder: "Type your question here...",
    sendMessage: "Send Message",
    aiTyping: "AI is typing...",
    aiWelcomeMessage: "Hello! I'm your AI-powered emergency response assistant. How can I help you today?",
    aiHelpSuggestion1: "How do I report an emergency?",
    aiHelpSuggestion2: "What information should I include?",
    aiHelpSuggestion3: "How do I verify a report?",
    
    // Volunteer Dashboard
    volunteerDashboard: "ಸ್ವಯಂಸೇವಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    reportsToVerify: "ಪರಿಶೀಲಿಸಲು ವರದಿಗಳು",
    pendingVerifications: "ಬಾಕಿ ಇರುವ ಪರಿಶೀಲನೆಗಳು",
    activeEmergencies: "ಸಕ್ರಿಯ ತುರ್ತು ಪರಿಸ್ಥಿತಿಗಳು",
    yourVolunteerStats: "ನಿಮ್ಮ ಸ್ವಯಂಸೇವಕ ಅಂಕಿಅಂಶಗಳು",
    reportsVerified: "ಪರಿಶೀಲಿಸಿದ ವರದಿಗಳು",
    hoursVolunteered: "ಸ್ವಯಂಸೇವಿ ಗಂಟೆಗಳು",
    trustScore: "ನಂಬಿಕೆ ಸ್ಕೋರ್",
    viewReport: "ವರದಿ ವೀಕ್ಷಿಸಿ",
    verifyNow: "ಈಗ ಪರಿಶೀಲಿಸಿ",
    rejectReport: "ವರದಿ ತಿರಸ್ಕರಿಸಿ",
    assignToMe: "ನನಗೆ ನಿಯೋಜಿಸಿ",
    markResolved: "ಪರಿಹರಿಸಲಾಗಿದೆ ಎಂದು ಗುರುತಿಸಿ",
    needsUrgentAttention: "ತುರ್ತು ಗಮನ ಬೇಕು",
    
    // Report Details Dialog
    reportedBy: "ವರದಿ ಮಾಡಿದವರು",
    reportPhotos: "ಫೋಟೋಗಳು",
    close: "ಮುಚ್ಚಿರಿ",
    
    // Verification Dialog
    verificationTitle: "ವರದಿ ಪರಿಶೀಲಿಸಿ",
    confirmVerification: "ಈ ವರದಿ ನಿಖರವಾಗಿದೆ ಎಂದು ನಾನು ದೃಢೀಕರಿಸುತ್ತೇನೆ",
    addVerificationNotes: "ನಿಮ್ಮ ಟಿಪ್ಪಣಿಗಳನ್ನು ಸೇರಿಸಿ",
    notesPlaceholder: "ನಿಮ್ಮ ಅವಲೋಕನಗಳು, ಹೆಚ್ಚುವರಿ ವಿವರಗಳು ಅಥವಾ ಸಂದರ್ಭವನ್ನು ನಮೂದಿಸಿ...",
    uploadVerificationPhoto: "ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ (ಐಚ್ಛಿಕ)",
    verificationSuccess: "ಪರಿಶೀಲನೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ",
    cancel: "ರದ್ದುಮಾಡಿ",
    
    // Dashboard
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    needsHeatmap: "ಅಗತ್ಯಗಳ ಹೀಟ್ ಮ್ಯಾಪ್",
    openShelters: "ತೆರೆದ ಆಶ್ರಯಗಳು",
    helplines: "ಸಹಾಯವಾಣಿಗಳು",
    mythBusting: "ಮಿಥ್ ಬಸ್ಟಿಂಗ್",
    recentUpdates: "ಇತ್ತೀಚಿನ ನವೀಕರಣಗಳು",
    filterByNeed: "ಅಗತ್ಯ ಪ್ರಕಾರದಿಂದ ಫಿಲ್ಟರ್ ಮಾಡಿ",
    filterByTime: "ಸಮಯದಿಂದ ಫಿಲ್ಟರ್ ಮಾಡಿ",
    showVerifiedOnly: "ಪರಿಶೀಲಿಸಿದವುಗಳನ್ನು ಮಾತ್ರ ತೋರಿಸಿ",
    exportData: "ಡೇಟಾ ರಫ್ತು ಮಾಡಿ",
  },
  
  ml: {
    // Header
    goodMorning: "സുപ്രഭാതം",
    goodAfternoon: "നമസ്കാരം",
    goodEvening: "ശുഭ സന്ധ്യ",
    menu: "മെനു",
    menuDescription: "അടിയന്തിര പ്രതികരണ സവിശേഷതകൾ നാവിഗേറ്റ് ചെയ്യുക",
    emergencyUser: "സന്നദ്ധപ്രവർത്തകൻ",
    userEmail: "volunteer@emergency.org",
    anonymousUser: "അജ്ഞാത ഉപയോക്താവ്",
    
    // Navigation
    home: "ദ്രുത റിപ്പോർട്ട്",
    myReports: "എന്റെ റിപ്പോർട്ടുകൾ",
    previousReports: "മുൻ റിപ്പോർട്ടുകൾ",
    reportsReviewed: "പരിശോധിച്ച റിപ്പോർട്ടുകൾ",
    safetyCheckins: "സുരക്ഷാ പരിശോധനകൾ",
    publicDashboard: "പൊതു ഡാഷ്‌ബോർഡ്",
    settings: "ക്രമീകരണങ്ങൾ",
    logout: "ലോഗ് ഔട്ട്",
    helpSupport: "സഹായവും പിന്തുണയും",
    witnessMode: "സാക്ഷി മോഡ്",
    
    // Login Page
    emergencyResponse: "അടിയന്തിര പ്രതികരണം",
    signInOrReport: "അടിയന്തിരാവസ്ഥ റിപ്പോർട്ട് ചെയ്യുക അല്ലെങ്കിൽ സന്നദ്ധപ്രവർത്തകനായി സൈൻ ഇൻ ചെയ്യുക",
    quickReportAnonymous: "ദ്രുത റിപ്പോർട്ട് (അജ്ഞാത)",
    reportWithoutLogin: "സൈൻ ഇൻ ചെയ്യാതെ ആവശ്യം റിപ്പോർട്ട് ചെയ്യുക",
    userLogin: "ഉപയോക്തൃ ലോഗിൻ",
    trackYourReports: "നിങ്ങളുടെ റിപ്പോർട്ടുകൾ ട്രാക്ക് ചെയ്യുകയും അപ്ഡേറ്റുകൾ നേടുകയും ചെയ്യുക",
    volunteerLogin: "സന്നദ്ധപ്രവർത്തക ലോഗിൻ",
    verifyAndAssist: "റിപ്പോർട്ടുകൾ സ്ഥിരീകരിക്കുകയും പ്രതികരിക്കുന്നവരെ സഹായിക്കുകയും ചെയ്യുക",
    createAccount: "ഒരു അക്കൗണ്ട് സൃഷ്ടിക്കുക",
    volunteerAccessOnly: "സന്നദ്ധപ്രവർത്തക പ്രവേശനം മാത്രം",
    username: "ഉപയോക്തൃനാമം",
    password: "പാസ്‌വേഡ്",
    enterUsername: "ഉപയോക്തൃനാമം നൽകുക",
    enterPassword: "പാസ്‌വേഡ് നൽകുക",
    rememberMe: "എന്നെ ഓർക്കുക",
    forgotPassword: "പാസ്‌വേഡ് മറന്നോ?",
    signIn: "സൈൻ ഇൻ",
    signingIn: "സൈൻ ഇൻ ചെയ്യുന്നു...",
    
    // Quick Report
    reportNeed: "ആവശ്യം റിപ്പോർട്ട് ചെയ്യുക",
    whatDoYouNeed: "നിങ്ങൾക്ക് എന്താണ് വേണ്ടത്?",
    selectNeedType: "ആവശ്യമായ സഹായത്തിന്റെ തരം തിരഞ്ഞെടുക്കുക",
    needType: "ആവശ്യത്തിന്റെ തരം",
    needWater: "വെള്ളം",
    needMedical: "വൈദ്യസഹായം",
    needShelter: "പാർപ്പിടം",
    needFood: "ഭക്ഷണം",
    needOther: "മറ്റുള്ളവ",
    addDetails: "വിശദാംശങ്ങൾ ചേർക്കുക",
    microUpdate: "ദ്രുത അപ്ഡേറ്റ്",
    microUpdatePlaceholder: "സാഹചര്യത്തിന്റെ ഹ്രസ്വ വിവരണം...",
    addPhoto: "ഫോട്ടോ ചേർക്കുക",
    location: "സ്ഥാനം",
    coarseLocation: "പൊതു പ്രദേശം",
    preciseLocation: "കൃത്യമായ കോർഡിനേറ്റുകൾ",
    numberOfDependents: "ആശ്രിതരുടെ എണ്ണം",
    vulnerableTags: "ദുർബല ഗ്രൂപ്പുകൾ",
    elderly: "പ്രായമായവർ",
    disability: "വൈകല്യം",
    medication: "മരുന്ന് ആവശ്യമാണ്",
    pregnant: "ഗർഭിണി",
    children: "കുട്ടികൾ",
    privacyConsent: "സ്വകാര്യതയും പങ്കിടലും",
    shareWithResponders: "സ്ഥിരീകരിച്ച പ്രതികരണക്കാരുമായി വിശദാംശങ്ങൾ പങ്കിടുക",
    sharePreciseCoords: "കൃത്യമായ സ്ഥാനം പങ്കിടുക (പ്രതികരണക്കാർ മാത്രം)",
    reportAnonymously: "അജ്ഞാതമായി റിപ്പോർട്ട് ചെയ്യുക",
    submitReport: "റിപ്പോർട്ട് സമർപ്പിക്കുക",
    submitting: "സമർപ്പിക്കുന്നു...",
    
    // Report Status
    queued: "ക്യൂവിൽ",
    sending: "അയയ്ക്കുന്നു",
    sent: "അയച്ചു",
    failed: "പരാജയപ്പെട്ടു",
    verified: "സ്ഥിരീകരിച്ചു",
    duplicate: "സാധ്യമായ ഡ്യൂപ്ലിക്കേറ്റ്",
    willSendWhenOnline: "ഓൺലൈനായാൽ അയയ്ക്കും",
    sendViaSMS: "SMS വഴി അയയ്ക്കുക",
    
    // Priority Levels
    priorityLow: "കുറഞ്ഞത്",
    priorityMedium: "ഇടത്തരം",
    priorityHigh: "ഉയർന്നത്",
    priorityCritical: "നിർണായകം",
    
    // My Reports
    yourReports: "നിങ്ങളുടെ റിപ്പോർട്ടുകൾ",
    viewTrackReports: "നിങ്ങളുടെ അടിയന്തിര റിപ്പോർട്ടുകൾ കാണുകയും ട്രാക്ക് ചെയ്യുകയും ചെയ്യുക",
    noReportsYet: "ഇതുവരെ റിപ്പോർട്ടുകളൊന്നും സമർപ്പിച്ചിട്ടില്ല",
    caseId: "കേസ് ഐഡി",
    reportedOn: "റിപ്പോർട്ട് ചെയ്തത്",
    lastUpdate: "അവസാന അപ്ഡേറ്റ്",
    status: "നില",
    priority: "മുൻഗണന",
    verifications: "സ്ഥിരീകരണങ്ങൾ",
    editReport: "റിപ്പോർട്ട് എഡിറ്റ് ചെയ്യുക",
    requestVerification: "സ്ഥിരീകരണം അഭ്യർത്ഥിക്കുക",
    flagDuplicate: "ഡ്യൂപ്ലിക്കേറ്റായി ഫ്ലാഗ് ചെയ്യുക",
    viewDetails: "വിശദാംശങ്ങൾ കാണുക",
    deleteReport: "റിപ്പോർട്ട് ഇല്ലാതാക്കുക",
    clearFilters: "ഫിൽട്ടറുകൾ മായ്ക്കുക",
    searchPlaceholder: "കേസ് ഐഡി അല്ലെങ്കിൽ വിവരണം ഉപയോഗിച്ച് തിരയുക...",
    filterByStatus: "സ്റ്റാറ്റസ് അനുസരിച്ച് ഫിൽട്ടർ ചെയ്യുക",
    filterByPriority: "മുൻഗണന അനുസരിച്ച് ഫിൽട്ടർ ചെയ്യുക",
    allStatuses: "എല്ലാ സ്റ്റാറ്റസുകളും",
    allPriorities: "എല്ലാ മുൻഗണനകളും",
    showingResults: "കാണിക്കുന്നു",
    totalReports: "ആകെ റിപ്പോർട്ടുകൾ",
    inProgress: "പുരോഗമിക്കുന്നു",
    totalVerifications: "ആകെ സ്ഥിരീകരണങ്ങൾ",
    noReportsFound: "റിപ്പോർട്ടുകളൊന്നും കണ്ടെത്തിയില്ല",
    adjustFilters: "നിങ്ങളുടെ ഫിൽട്ടറുകൾ ക്രമീകരിക്കാൻ ശ്രമിക്കുക",
    reportDetails: "റിപ്പോർട്ട് വിശദാംശങ്ങൾ",
    reportTime: "റിപ്പോർട്ട് സമയം",
    reportStatus: "റിപ്പോർട്ട് സ്ഥിതി",
    reportDescription: "വിവരണം",
    reportLocation: "സ്ഥാനം",
    reportPriority: "മുൻഗണന",
    
    // Safety Check-ins
    safetyCheckIn: "സുരക്ഷാ പരിശോധന",
    areYouSafe: "നിങ്ങൾ സുരക്ഷിതനാണോ?",
    imSafe: "ഞാൻ സുരക്ഷിതനാണ്",
    needHelp: "സഹായം വേണം",
    missedCheckIn: "പരിശോധന നഷ്ടമായി",
    scheduleCheckIn: "പരിശോധന ഷെഡ്യൂൾ ചെയ്യുക",
    nextCheckIn: "അടുത്ത പരിശോധന",
    checkInHistory: "പരിശോധന ചരിത്രം",
    
    // Witness Mode
    verifyReport: "റിപ്പോർട്ട് സ്ഥിരീകരിക്കുക",
    iSawThis: "ഞാൻ ഇത് കണ്ടു",
    notTrue: "സത്യമല്ല",
    addContext: "സന്ദർഭം ചേർക്കുക",
    witnessContextPlaceholder: "ഈ റിപ്പോർട്ടിനെക്കുറിച്ച് അധിക വിവരങ്ങൾ...",
    submitVerification: "സ്ഥിരീകരണം സമർപ്പിക്കുക",
    yourReputation: "നിങ്ങളുടെ പ്രശസ്തി",
    verificationsProvided: "നൽകിയ സ്ഥിരീകരണങ്ങൾ",
    
    // Volunteer Dashboard
    volunteerDashboard: "സന്നദ്ധപ്രവർത്തക ഡാഷ്‌ബോർഡ്",
    reportsToVerify: "സ്ഥിരീകരിക്കാനുള്ള റിപ്പോർട്ടുകൾ",
    pendingVerifications: "തീർപ്പാക്കാത്ത സ്ഥിരീകരണങ്ങൾ",
    activeEmergencies: "സജീവ അടിയന്തരാവസ്ഥകൾ",
    yourVolunteerStats: "നിങ്ങളുടെ സന്നദ്ധ സ്ഥിതിവിവരക്കണക്കുകൾ",
    reportsVerified: "സ്ഥിരീകരിച്ച റിപ്പോർട്ടുകൾ",
    hoursVolunteered: "സന്നദ്ധ മണിക്കൂറുകൾ",
    trustScore: "വിശ്വാസ സ്കോർ",
    viewReport: "റിപ്പോർട്ട് കാണുക",
    verifyNow: "ഇപ്പോൾ സ്ഥിരീകരിക്കുക",
    rejectReport: "റിപ്പോർട്ട് നിരസിക്കുക",
    assignToMe: "എനിക്ക് നൽകുക",
    markResolved: "പരിഹരിച്ചതായി അടയാളപ്പെടുത്തുക",
    needsUrgentAttention: "അടിയന്തിര ശ്രദ്ധ ആവശ്യമാണ്",
    
    // Report Details Dialog
    reportDetails: "റിപ്പോർട്ട് വിശദാംശങ്ങൾ",
    reportedBy: "റിപ്പോർട്ട് ചെയ്തത്",
    reportTime: "റിപ്പോർട്ട് സമയം",
    reportDescription: "വിവരണം",
    reportLocation: "സ്ഥലം",
    reportPhotos: "ഫോട്ടോകൾ",
    reportStatus: "സ്ഥിതി",
    reportPriority: "മുൻഗണന",
    close: "അടയ്ക്കുക",
    
    // Verification Dialog
    verificationTitle: "റിപ്പോർട്ട് സ്ഥിരീകരിക്കുക",
    confirmVerification: "ഈ റിപ്പോർട്ട് കൃത്യമാണെന്ന് ഞാൻ സ്ഥിരീകരിക്കുന്നു",
    addVerificationNotes: "നിങ്ങളുടെ കുറിപ്പുകൾ ചേർക്കുക",
    notesPlaceholder: "നിങ്ങളുടെ നിരീക്ഷണങ്ങൾ, അധിക വിശദാംശങ്ങൾ അല്ലെങ്കിൽ സന്ദർഭം നൽകുക...",
    uploadVerificationPhoto: "ഫോട്ടോ അപ്ലോഡ് ചെയ്യുക (ഓപ്ഷണൽ)",
    verificationSuccess: "സ്ഥിരീകരണം വിജയകരമായി സമർപ്പിച്ചു",
    cancel: "റദ്ദാക്കുക",
    
    // Public Dashboard
    dashboard: "ഡാഷ്‌ബോർഡ്",
    needsHeatmap: "ആവശ്യങ്ങളുടെ ഹീറ്റ്മാപ്പ്",
    openShelters: "തുറന്ന ഷെൽട്ടറുകൾ",
    helplines: "ഹെൽപ്പ്‌ലൈനുകൾ",
    mythBusting: "മിത്ത് നശിപ്പിക്കൽ",
    recentUpdates: "സമീപകാല അപ്ഡേറ്റുകൾ",
    filterByNeed: "ആവശ്യത്തിന്റെ തരം അനുസരിച്ച് ഫിൽട്ടർ ചെയ്യുക",
    filterByTime: "സമയം അനുസരിച്ച് ഫിൽട്ടർ ചെയ്യുക",
    showVerifiedOnly: "സ്ഥിരീകരിച്ചവ മാത്രം കാണിക്കുക",
    exportData: "ഡാറ്റ എക്സ്പോർട്ട് ചെയ്യുക",
    
    // Settings
    manageAccount: "നിങ്ങളുടെ അക്കൗണ്ടും മുൻഗണനകളും നിയന്ത്രിക്കുക",
    profileInformation: "പ്രൊഫൈൽ വിവരങ്ങൾ",
    updatePersonalInfo: "നിങ്ങളുടെ വ്യക്തിഗത വിവരങ്ങൾ അപ്ഡേറ്റ് ചെയ്യുക",
    fullName: "പൂർണ്ണ നാമം",
    email: "ഇമെയിൽ",
    phoneNumber: "ഫോൺ നമ്പർ",
    saveChanges: "മാറ്റങ്ങൾ സൂക്ഷിക്കുക",
    notificationPreferences: "അറിയിപ്പ് മുൻഗണനകൾ",
    chooseNotifications: "നിങ്ങൾക്ക് എങ്ങനെ അറിയിപ്പ് ലഭിക്കണമെന്ന് തിരഞ്ഞെടുക്കുക",
    smsAlerts: "SMS അലേർട്ടുകൾ",
    receiveSMSUpdates: "SMS വഴി അപ്ഡേറ്റുകൾ സ്വീകരിക്കുക",
    pushNotifications: "പുഷ് അറിയിപ്പുകൾ",
    receivePushNotifications: "പുഷ് അറിയിപ്പുകൾ സ്വീകരിക്കുക",
    checkInReminders: "ചെക്ക്-ഇൻ ഓർമ്മപ്പെടുത്തലുകൾ",
    remindBeforeCheckIn: "ഷെഡ്യൂൾ ചെയ്ത പരിശോധനകൾക്ക് മുമ്പ് ഓർമ്മിപ്പിക്കുക",
    privacySecurity: "സ്വകാര്യതയും സുരക്ഷയും",
    manageSecuritySettings: "നിങ്ങളുടെ സുരക്ഷാ ക്രമീകരണങ്ങൾ നിയന്ത്രിക്കുക",
    locationSharing: "സ്ഥാന പങ്കിടൽ",
    defaultCoarseLocation: "സ്ഥിരസ്ഥിതിയായി പൊതു സ്ഥാനം ഉപയോഗിക്കുക",
    dataRetention: "ഡാറ്റ നിലനിർത്തൽ",
    deleteMyData: "എന്റെ ഡാറ്റ ഇല്ലാതാക്കുക",
    appearance: "രൂപം",
    customizeAppLooks: "ആപ്പ് എങ്ങനെ കാണപ്പെടുന്നുവെന്ന് ഇഷ്ടാനുസൃതമാക്കുക",
    darkMode: "ഇരുണ്ട മോഡ്",
    darkThemeActive: "ഇരുണ്ട തീം സജീവമാണ്",
    switchToDarkTheme: "ഇരുണ്ട തീമിലേക്ക് മാറുക",
    language: "ഭാഷ",
    selectLanguage: "നിങ്ങളുടെ ഇഷ്ട ഭാഷ തിരഞ്ഞെടുക്കുക",
    offlineMode: "ഓഫ്‌ലൈൻ മോഡ്",
    offlineQueueSettings: "ഓഫ്‌ലൈൻ ക്യൂ ക്രമീകരണങ്ങൾ",
    autoSyncWhenOnline: "ഓൺലൈൻ ആകുമ്പോൾ ഓട്ടോ-സിങ്ക്",
    preferSMSFallback: "ഓഫ്‌ലൈനായാൽ SMS ഫാൾബാക്ക് മുൻഗണന നൽകുക",
    profilePicture: "പ്രൊഫൈൽ ചിത്രം",
    uploadPhoto: "ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക",
    removePhoto: "ഫോട്ടോ നീക്കം ചെയ്യുക",
    profilePictureHint: "JPG, PNG അല്ലെങ്കിൽ GIF (പരമാവധി 5MB)",
    
    // Settings - Notifications (Emergency specific)
    emergencyAlerts: "അടിയന്തിര മുന്നറിയിപ്പുകൾ",
    emergencyAlertsDesc: "അടുത്തുള്ള അടിയന്തിരാവസ്ഥകളെക്കുറിച്ച് അറിയിപ്പ് നേടുക",
    reportStatusUpdates: "റിപ്പോർട്ട് സ്റ്റാറ്റസ് അപ്ഡേറ്റുകൾ",
    reportStatusUpdatesDesc: "നിങ്ങളുടെ റിപ്പോർട്ടുകൾ സ്റ്റാറ്റസ് മാറുമ്പോൾ അപ്ഡേറ്റുകൾ നേടുക",
    verificationNotifications: "സ്ഥിരീകരണ അറിയിപ്പുകൾ",
    verificationNotificationsDesc: "ആരെങ്കിലും നിങ്ങളുടെ റിപ്പോർട്ട് സ്ഥിരീകരിക്കുമ്പോൾ അറിയിക്കുക",
    smsFallback: "SMS ഫാൾബാക്ക്",
    smsFallbackDesc: "ഓഫ്‌ലൈനോ ഡാറ്റയില്ലാതെയോ ആയിരിക്കുമ്പോൾ SMS സ്വീകരിക്കുക",
    
    // Settings - Privacy & Security (Emergency specific)
    locationPrivacy: "സ്ഥാന സ്വകാര്യത",
    locationPrivacyDesc: "റിപ്പോർട്ടുകൾക്കായി സ്ഥിരസ്ഥിതിയായി പൊതു സ്ഥാനം ഉപയോഗിക്കുക",
    anonymousReporting: "അജ്ഞാത റിപ്പോർട്ടിംഗ്",
    anonymousReportingDesc: "രജിസ്ട്രേഷൻ ഇല്ലാതെ അജ്ഞാത റിപ്പോർട്ടുകൾ അനുവദിക്കുക",
    dataSharing: "പ്രതികരണക്കാരുമായി ഡാറ്റ പങ്കിടൽ",
    dataSharingDesc: "സ്ഥിരീകരിച്ച പ്രതികരണക്കാരുമായി മാത്രം റിപ്പോർട്ട് വിശദാംശങ്ങൾ പങ്കിടുക",
    clearReportHistory: "റിപ്പോർട്ട് ചരിത്രം മായ്ക്കുക",
    clearReportHistoryDesc: "നിങ്ങളുടെ എല്ലാ സമർപ്പിച്ച റിപ്പോർട്ടുകളും ശാശ്വതമായി ഇല്ലാതാക്കുക",
    clear: "മായ്ക്കുക",
    
    // Settings - Data & Offline
    dataOffline: "ഡാറ്റയും ഓഫ്‌ലൈനും",
    dataOfflineDesc: "ഓഫ്‌ലൈൻ സംഭരണവും ഡാറ്റ സിങ്കും നിയന്ത്രിക്കുക",
    autoSyncReports: "ഓട്ടോ-സിങ്ക് റിപ്പോർട്ടുകൾ",
    autoSyncReportsDesc: "ഓൺലൈൻ ആകുമ്പോൾ യാന്ത്രികമായി സിങ്ക് ചെയ്യുക",
    offlineModeToggle: "ഓഫ്‌ലൈൻ മോഡ്",
    offlineModeToggleDesc: "ഓഫ്‌ലൈനായിരിക്കുമ്പോൾ റിപ്പോർട്ടുകൾ പ്രാദേശികമായി സംരക്ഷിക്കുക",
    photoCompression: "ഫോട്ടോ കംപ്രഷൻ",
    photoCompressionDesc: "ഡാറ്റ ലാഭിക്കാൻ ഫോട്ടോകൾ കംപ്രസ് ചെയ്യുക",
    clearLocalData: "പ്രാദേശിക ഡാറ്റ മായ്ക്കുക",
    clearLocalDataDesc: "കാഷെ ചെയ്ത റിപ്പോർട്ടുകളും ഫോട്ടോകളും നീക്കം ചെയ്യുക",
    
    // Offline Queue
    offlineQueue: "ഓഫ്‌ലൈൻ ക്യൂ",
    pendingReports: "തീർപ്പാക്കാത്ത റിപ്പോർട്ടുകൾ",
    retryNow: "ഇപ്പോൾ വീണ്ടും ശ്രമിക്കുക",
    editQueued: "എഡിറ്റ് ചെയ്യുക",
    
    // Toast Messages
    reportSubmitted: "റിപ്പോർട്ട് വിജയകരമായി സമർപ്പിച്ചു",
    reportQueued: "റിപ്പോർട്ട് ക്യൂവിൽ - ഓൺലൈൻ ആകുമ്പോൾ അയയ്ക്കും",
    reportFailed: "റിപ്പോർട്ട് സമർപ്പിക്കുന്നതിൽ പരാജയപ്പെട്ടു",
    loginSuccessful: "ലോഗിൻ വിജയകരമായി!",
    invalidCredentials: "അസാധുവായ ക്രെഡൻഷ്യലുകൾ",
    fillAllFields: "എല്ലാ ആവശ്യമായ ഫീൽഡുകളും പൂരിപ്പിക്കുക",
    profileUpdated: "പ്രൊഫൈൽ വിജയകരമായി അപ്ഡേറ്റ് ചെയ്തു",
    loggedOut: "വിജയകരമായി ലോഗ് ഔട്ട് ചെയ്തു",
    darkModeEnabled: "ഇരുണ്ട മോഡ് പ്രവർത്തനക്ഷമമാക്കി",
    lightModeEnabled: "ലൈറ്റ് മോഡ് പ്രവർത്തനക്ഷമമാക്കി",
    languageChanged: "ഭാഷ വിജയകരമായി മാറ്റി",
    verificationSubmitted: "സ്ഥിരീകരണം സമർപ്പിച്ചു",
    checkInRecorded: "പരിശോധന വിജയകരമായി രേഖപ്പെടുത്തി",
    locationPermissionDenied: "സ്ഥാന അനുമതി നിരസിച്ചു",
    photoTooLarge: "ഫോട്ടോയുടെ വലുപ്പം 5MB-യിൽ കുറവായിരിക്കണം",
    smsSent: "SMS വിജയകരമായി അയച്ചു",
    offlineModeActive: "ഓഫ്‌ലൈൻ മോഡ് - റിപ്പോർട്ടുകൾ ക്യൂവിൽ ചേർക്കും",
    syncComplete: "എല്ലാ റിപ്പോർട്ടുകളും വിജയകരമായി സിങ്ക് ചെയ്തു",
    imageTooLarge: "ചിത്രത്തിന്റെ വലുപ്പം 5MB-യിൽ കുറവായിരിക്കണം",
    profilePictureUpdated: "പ്രൊഫൈൽ ചിത്രം വിജയകരമായി അപ്ഡേറ്റ് ചെയ്തു",
    profilePictureRemoved: "പ്രൊഫൈൽ ചിത്രം വിജയകരമായി നീക്കം ചെയ്തു",
    notificationDismissed: "അറിയിപ്പ് നിരസിച്ചു",
    
    // AI Assistant
    aiAssistant: "AI Assistant",
    askAIForHelp: "Ask AI for help",
    aiPlaceholder: "Type your question here...",
    sendMessage: "Send Message",
    aiTyping: "AI is typing...",
    aiWelcomeMessage: "Hello! I'm your AI-powered emergency response assistant. How can I help you today?",
    aiHelpSuggestion1: "How do I report an emergency?",
    aiHelpSuggestion2: "What information should I include?",
    aiHelpSuggestion3: "How do I verify a report?",
  },
  
  es: {
    // Header
    goodMorning: "Buenos Días",
    goodAfternoon: "Buenas Tardes",
    goodEvening: "Buenas Noches",
    menu: "Menú",
    menuDescription: "Navegar por las funciones de respuesta a emergencias",
    emergencyUser: "Voluntario",
    userEmail: "voluntario@emergencia.org",
    anonymousUser: "Usuario Anónimo",
    home: "Informe Rápido",
    myReports: "Mis Informes",
    previousReports: "Informes Anteriores",
    reportsReviewed: "Informes Revisados",
    safetyCheckins: "Control de Seguridad",
    publicDashboard: "Panel Público",
    settings: "Configuración",
    logout: "Cerrar Sesión",
    helpSupport: "Ayuda y Soporte",
    witnessMode: "Modo Testigo",
    emergencyResponse: "Respuesta a Emergencias",
    signInOrReport: "Reportar emergencia o iniciar sesión como voluntario",
    quickReportAnonymous: "Informe Rápido (Anónimo)",
    reportWithoutLogin: "Reportar una necesidad sin iniciar sesión",
    userLogin: "Inicio de Sesión de Usuario",
    trackYourReports: "Seguir tus informes y obtener actualizaciones",
    volunteerLogin: "Inicio de Sesión de Voluntario",
    verifyAndAssist: "Verificar informes y asistir a respondedores",
    createAccount: "crear una cuenta",
    volunteerAccessOnly: "Solo acceso para voluntarios",
    username: "Nombre de Usuario",
    password: "Contraseña",
    enterUsername: "Ingresar nombre de usuario",
    enterPassword: "Ingresar tu contraseña",
    rememberMe: "Recuérdame",
    forgotPassword: "¿Olvidaste tu contraseña?",
    signIn: "Iniciar Sesión",
    signingIn: "Iniciando sesión...",
    reportNeed: "Reportar una Necesidad",
    whatDoYouNeed: "¿Qué necesitas?",
    selectNeedType: "Seleccionar el tipo de asistencia necesaria",
    needType: "Tipo de Necesidad",
    needWater: "Agua",
    needMedical: "Médico",
    needShelter: "Refugio",
    needFood: "Comida",
    needOther: "Otro",
    addDetails: "Agregar Detalles",
    microUpdate: "Actualización Rápida",
    microUpdatePlaceholder: "Breve descripción de la situación...",
    addPhoto: "Agregar Foto",
    location: "Ubicación",
    coarseLocation: "Área General",
    preciseLocation: "Coordenadas Precisas",
    numberOfDependents: "Número de Dependientes",
    vulnerableTags: "Grupos Vulnerables",
    elderly: "Ancianos",
    disability: "Discapacidad",
    medication: "Necesita Medicación",
    pregnant: "Embarazada",
    children: "Niños",
    privacyConsent: "Privacidad y Compartir",
    shareWithResponders: "Compartir detalles con respondedores verificados",
    sharePreciseCoords: "Compartir ubicación precisa (solo respondedores)",
    reportAnonymously: "Reportar anónimamente",
    submitReport: "Enviar Informe",
    submitting: "Enviando...",
    queued: "En Cola",
    sending: "Enviando",
    sent: "Enviado",
    failed: "Fallido",
    verified: "Verificado",
    duplicate: "Posible Duplicado",
    willSendWhenOnline: "Se enviará cuando esté en línea",
    sendViaSMS: "Enviar por SMS",
    priorityLow: "Bajo",
    priorityMedium: "Medio",
    priorityHigh: "Alto",
    priorityCritical: "Crítico",
    yourReports: "Tus Informes",
    viewTrackReports: "Ver y seguir tus informes de emergencia",
    noReportsYet: "No se han enviado informes todavía",
    caseId: "ID de Caso",
    reportedOn: "Reportado el",
    lastUpdate: "Última actualización",
    status: "Estado",
    priority: "Prioridad",
    verifications: "Verificaciones",
    editReport: "Editar Informe",
    requestVerification: "Solicitar Verificación",
    flagDuplicate: "Marcar como Duplicado",
    viewDetails: "Ver Detalles",
    deleteReport: "Eliminar Informe",
    clearFilters: "Limpiar Filtros",
    searchPlaceholder: "Buscar por ID de caso o descripción...",
    filterByStatus: "Filtrar por estado",
    filterByPriority: "Filtrar por prioridad",
    allStatuses: "Todos los Estados",
    allPriorities: "Todas las Prioridades",
    showingResults: "Mostrando",
    totalReports: "Informes Totales",
    inProgress: "En Progreso",
    totalVerifications: "Verificaciones Totales",
    noReportsFound: "No se encontraron informes",
    adjustFilters: "Intenta ajustar tus filtros",
    reportDetails: "Detalles del Informe",
    reportTime: "Hora del Informe",
    reportStatus: "Estado del Informe",
    reportDescription: "Descripción",
    reportLocation: "Ubicación",
    reportPriority: "Prioridad",
    safetyCheckIn: "Control de Seguridad",
    areYouSafe: "¿Estás a salvo?",
    imSafe: "Estoy a Salvo",
    needHelp: "Necesito Ayuda",
    missedCheckIn: "Control Perdido",
    scheduleCheckIn: "Programar Control",
    nextCheckIn: "Próximo control",
    checkInHistory: "Historial de Control",
    verifyReport: "Verificar Informe",
    iSawThis: "Vi Esto",
    notTrue: "No es Verdad",
    addContext: "Agregar Contexto",
    witnessContextPlaceholder: "Información adicional sobre este informe...",
    submitVerification: "Enviar Verificación",
    yourReputation: "Tu Reputación",
    verificationsProvided: "Verificaciones Proporcionadas",
    volunteerDashboard: "Panel de Voluntarios",
    reportsToVerify: "Informes para Verificar",
    pendingVerifications: "Verificaciones Pendientes",
    activeEmergencies: "Emergencias Activas",
    yourVolunteerStats: "Tus Estadísticas de Voluntario",
    reportsVerified: "Informes Verificados",
    hoursVolunteered: "Horas de Voluntariado",
    trustScore: "Puntuación de Confianza",
    viewReport: "Ver Informe",
    verifyNow: "Verificar Ahora",
    rejectReport: "Rechazar Informe",
    assignToMe: "Asignar a Mí",
    markResolved: "Marcar como Resuelto",
    needsUrgentAttention: "Necesita Atención Urgente",
    reportedBy: "Reportado por",
    reportPhotos: "Fotos",
    close: "Cerrar",
    verificationTitle: "Verificar Informe",
    confirmVerification: "Confirmo que este informe es preciso",
    addVerificationNotes: "Agregar tus Notas",
    notesPlaceholder: "Ingresa tus observaciones, detalles adicionales o contexto...",
    uploadVerificationPhoto: "Subir Foto (Opcional)",
    verificationSuccess: "Verificación enviada exitosamente",
    cancel: "Cancelar",
    dashboard: "Panel",
    needsHeatmap: "Mapa de Calor de Necesidades",
    openShelters: "Refugios Abiertos",
    helplines: "Líneas de Ayuda",
    mythBusting: "Desmitificación",
    recentUpdates: "Actualizaciones Recientes",
    filterByNeed: "Filtrar por Tipo de Necesidad",
    filterByTime: "Filtrar por Tiempo",
    showVerifiedOnly: "Mostrar Solo Verificados",
    exportData: "Exportar Datos",
    manageAccount: "Gestionar tu cuenta y preferencias",
    profileInformation: "Información del Perfil",
    updatePersonalInfo: "Actualizar tu información personal",
    fullName: "Nombre Completo",
    email: "Correo Electrónico",
    phoneNumber: "Número de Teléfono",
    saveChanges: "Guardar Cambios",
    notificationPreferences: "Preferencias de Notificación",
    chooseNotifications: "Elige cómo quieres ser notificado",
    smsAlerts: "Alertas SMS",
    receiveSMSUpdates: "Recibir actualizaciones por SMS",
    pushNotifications: "Notificaciones Push",
    receivePushNotifications: "Recibir notificaciones push",
    checkInReminders: "Recordatorios de Control",
    remindBeforeCheckIn: "Recordar antes de los controles programados",
    privacySecurity: "Privacidad y Seguridad",
    manageSecuritySettings: "Gestionar tu configuración de seguridad",
    locationSharing: "Compartir Ubicación",
    defaultCoarseLocation: "Usar ubicación aproximada por defecto",
    dataRetention: "Retención de Datos",
    deleteMyData: "Eliminar Mis Datos",
    appearance: "Apariencia",
    customizeAppLooks: "Personalizar el aspecto de la aplicación",
    darkMode: "Modo Oscuro",
    darkThemeActive: "El tema oscuro está activo",
    switchToDarkTheme: "Cambiar a tema oscuro",
    language: "Idioma",
    selectLanguage: "Seleccionar tu idioma preferido",
    offlineMode: "Modo Sin Conexión",
    offlineQueueSettings: "Configuración de cola sin conexión",
    autoSyncWhenOnline: "Sincronizar automáticamente cuando esté en línea",
    preferSMSFallback: "Preferir respaldo SMS cuando esté sin conexión",
    profilePicture: "Foto de Perfil",
    uploadPhoto: "Subir Foto",
    removePhoto: "Eliminar Foto",
    profilePictureHint: "JPG, PNG o GIF (máx. 5MB)",
    emergencyAlerts: "Alertas de Emergencia",
    emergencyAlertsDesc: "Recibir notificaciones sobre emergencias cercanas",
    reportStatusUpdates: "Actualizaciones de Estado de Informe",
    reportStatusUpdatesDesc: "Recibir actualizaciones cuando tus informes cambien de estado",
    verificationNotifications: "Notificaciones de Verificación",
    verificationNotificationsDesc: "Notificar cuando alguien verifique tu informe",
    smsFallback: "Respaldo SMS",
    smsFallbackDesc: "Recibir SMS cuando esté sin conexión o sin datos",
    locationPrivacy: "Privacidad de Ubicación",
    locationPrivacyDesc: "Usar ubicación aproximada por defecto para informes",
    anonymousReporting: "Informes Anónimos",
    anonymousReportingDesc: "Permitir informes anónimos sin registro",
    dataSharing: "Compartir Datos con Respondedores",
    dataSharingDesc: "Compartir detalles del informe solo con respondedores verificados",
    clearReportHistory: "Limpiar Historial de Informes",
    clearReportHistoryDesc: "Eliminar permanentemente todos tus informes enviados",
    clear: "Limpiar",
    dataOffline: "Datos y Sin Conexión",
    dataOfflineDesc: "Gestionar almacenamiento sin conexión y sincronización de datos",
    autoSyncReports: "Auto-Sincronizar Informes",
    autoSyncReportsDesc: "Sincronizar automáticamente cuando esté en línea",
    offlineModeToggle: "Modo Sin Conexión",
    offlineModeToggleDesc: "Guardar informes localmente cuando esté sin conexión",
    photoCompression: "Compresión de Fotos",
    photoCompressionDesc: "Comprimir fotos para ahorrar datos",
    clearLocalData: "Limpiar Datos Locales",
    clearLocalDataDesc: "Eliminar informes y fotos en caché",
    offlineQueue: "Cola Sin Conexión",
    pendingReports: "Informes Pendientes",
    retryNow: "Reintentar Ahora",
    editQueued: "Editar",
    reportSubmitted: "Informe enviado exitosamente",
    reportQueued: "Informe en cola - se enviará cuando esté en línea",
    reportFailed: "Error al enviar informe",
    loginSuccessful: "¡Inicio de sesión exitoso!",
    invalidCredentials: "Credenciales inválidas",
    fillAllFields: "Por favor completa todos los campos requeridos",
    profileUpdated: "Perfil actualizado exitosamente",
    loggedOut: "Sesión cerrada exitosamente",
    darkModeEnabled: "Modo oscuro activado",
    lightModeEnabled: "Modo claro activado",
    languageChanged: "Idioma cambiado exitosamente",
    verificationSubmitted: "Verificación enviada",
    checkInRecorded: "Control registrado exitosamente",
    locationPermissionDenied: "Permiso de ubicación denegado",
    photoTooLarge: "El tamaño de la foto debe ser menor a 5MB",
    smsSent: "SMS enviado exitosamente",
    offlineModeActive: "Modo sin conexión - los informes se pondrán en cola",
    syncComplete: "Todos los informes sincronizados exitosamente",
    imageTooLarge: "El tamaño de la imagen debe ser menor a 5MB",
    profilePictureUpdated: "Foto de perfil actualizada exitosamente",
    profilePictureRemoved: "Foto de perfil eliminada exitosamente",
    notificationDismissed: "Notificación descartada",
    aiAssistant: "Asistente IA",
    askAIForHelp: "Preguntar a la IA por ayuda",
    aiPlaceholder: "Escribe tu pregunta aquí...",
    sendMessage: "Enviar Mensaje",
    aiTyping: "IA está escribiendo...",
    aiWelcomeMessage: "¡Hola! Soy tu asistente de respuesta a emergencias impulsado por IA. ¿Cómo puedo ayudarte hoy?",
    aiHelpSuggestion1: "¿Cómo reporto una emergencia?",
    aiHelpSuggestion2: "¿Qué información debo incluir?",
    aiHelpSuggestion3: "¿Cómo verifico un informe?",
  },
};

export const languageNames: Record<Language, string> = {
  en: "English",
  hi: "हिन्दी (Hindi)",
  kn: "ಕನ್ನಡ (Kannada)",
  ml: "മലയാളം (Malayalam)",
  es: "Español (Spanish)",
};
