import { User, Bell, Shield, Globe, Moon, Lock, Camera, Upload, Wifi, Database, Sparkles, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTheme } from "../ThemeProvider";
import { useLanguage } from "../LanguageProvider";
import { Language, languageNames } from "../translations";
import { toast } from "sonner@2.0.3";
import { useState, useRef } from "react";
import { motion } from "motion/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CountryCodeSelect } from "../CountryCodeSelect";
import { ImageCropDialog } from "../ImageCropDialog";

export function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const isDarkMode = theme === "dark";
  const [profileImage, setProfileImage] = useState<string | null>(
    localStorage.getItem("profileImage") || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Image cropping state
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  
  // Profile form state
  const [fullName, setFullName] = useState<string>(
    localStorage.getItem("userName") || ""
  );
  const [email, setEmail] = useState<string>(
    localStorage.getItem("userEmail") || ""
  );
  const [countryCode, setCountryCode] = useState<string>(
    localStorage.getItem("countryCode") || "+1"
  );
  const [phone, setPhone] = useState<string>(
    localStorage.getItem("userPhone") || ""
  );

  const handleDarkModeToggle = () => {
    toggleTheme();
    toast.success(isDarkMode ? t.lightModeEnabled : t.darkModeEnabled);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    toast.success(t.languageChanged);
  };

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t.imageTooLarge || "Image size must be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setImageToCrop(imageDataUrl);
        setCropDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    setProfileImage(croppedImage);
    localStorage.setItem("profileImage", croppedImage);
    toast.success(t.profilePictureUpdated || "Profile picture updated successfully");
    
    // Dispatch custom event to update header avatar
    window.dispatchEvent(new CustomEvent("profileImageUpdated", { 
      detail: { imageUrl: croppedImage } 
    }));
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    localStorage.removeItem("profileImage");
    toast.success(t.profilePictureRemoved || "Profile picture removed successfully");
    
    // Dispatch custom event to update header avatar
    window.dispatchEvent(new CustomEvent("profileImageUpdated", { 
      detail: { imageUrl: null } 
    }));
  };

  const handleSaveProfile = () => {
    // Save profile information to localStorage
    if (fullName.trim()) {
      localStorage.setItem("userName", fullName.trim());
    }
    if (email.trim()) {
      localStorage.setItem("userEmail", email.trim());
    }
    localStorage.setItem("countryCode", countryCode);
    if (phone.trim()) {
      localStorage.setItem("userPhone", phone.trim());
    }

    // Dispatch custom event to update header name
    window.dispatchEvent(new CustomEvent("profileNameUpdated", { 
      detail: { userName: fullName.trim() } 
    }));

    toast.success(t.profileUpdated);
  };

  return (
    <div className="space-y-8 pb-8 max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="pt-4"
      >
        <h2 className="text-2xl mb-3 flex items-center gap-3">
          <Sparkles className="h-7 w-7 text-orange-600" />
          {t.settings}
        </h2>
        <p className="text-muted-foreground">{t.manageAccount}</p>
      </motion.div>

      {/* Image Crop Dialog */}
      {imageToCrop && (
        <ImageCropDialog
          open={cropDialogOpen}
          onOpenChange={setCropDialogOpen}
          imageSrc={imageToCrop}
          onCropComplete={handleCropComplete}
        />
      )}

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
      <Card className="border-0 shadow-xl">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="flex items-center gap-3">
            <User className="h-5 w-5" />
            {t.profileInformation}
          </CardTitle>
          <CardDescription>{t.updatePersonalInfo}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Profile Picture Section */}
          <div className="space-y-4">
            <Label className="text-base">{t.profilePicture || "Profile Picture"}</Label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative">
                <Avatar className="h-28 w-28 ring-4 ring-offset-4 ring-orange-500/30 dark:ring-orange-600/40">
                  <AvatarImage src={profileImage || undefined} alt="Profile" />
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
                    <User className="h-14 w-14" />
                  </AvatarFallback>
                </Avatar>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleProfileImageClick}
                  className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-gradient-to-br from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800 text-white flex items-center justify-center shadow-xl shadow-orange-500/30 transition-all"
                  aria-label="Change profile picture"
                >
                  <Camera className="h-5 w-5" />
                </motion.button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  aria-label="Upload profile picture"
                />
              </div>
              <div className="flex-1 space-y-3 w-full">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    size="default"
                    onClick={handleProfileImageClick}
                    className="flex-1 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:border-orange-500 transition-colors"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {t.uploadPhoto || "Upload Photo"}
                  </Button>
                  {profileImage && (
                    <Button
                      variant="outline"
                      size="default"
                      onClick={handleRemoveImage}
                      className="flex-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-500 transition-colors"
                    >
                      <X className="h-4 w-4 mr-2" />
                      {t.removePhoto || "Remove Photo"}
                    </Button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {t.profilePictureHint || "JPG, PNG or GIF (max. 5MB)"}
                </p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <Label htmlFor="name" className="text-base">{t.fullName}</Label>
            <Input 
              id="name" 
              placeholder="John Doe" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-11"
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="email" className="text-base">{t.email}</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="john.doe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11"
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="phone" className="text-base">{t.phoneNumber}</Label>
            <div className="flex gap-3">
              <CountryCodeSelect
                value={countryCode}
                onChange={setCountryCode}
                className="h-11"
              />
              <Input 
                id="phone" 
                type="tel" 
                placeholder="(555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 h-11"
              />
            </div>
          </div>
          
          <div className="pt-2">
            <Button 
              onClick={handleSaveProfile}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg shadow-blue-500/30 h-11 px-8"
            >
              {t.saveChanges}
            </Button>
          </div>
        </CardContent>
      </Card>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
      <Card className="border-0 shadow-xl">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="flex items-center gap-3">
            <Bell className="h-5 w-5" />
            {t.notificationPreferences}
          </CardTitle>
          <CardDescription>{t.chooseNotifications}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <Label className="text-base">{t.emergencyAlerts}</Label>
              <p className="text-sm text-muted-foreground">{t.emergencyAlertsDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <Label className="text-base">{t.reportStatusUpdates}</Label>
              <p className="text-sm text-muted-foreground">{t.reportStatusUpdatesDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <Label className="text-base">{t.verificationNotifications}</Label>
              <p className="text-sm text-muted-foreground">{t.verificationNotificationsDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <Label className="text-base">{t.smsFallback}</Label>
              <p className="text-sm text-muted-foreground">{t.smsFallbackDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
      </motion.div>

      {/* Privacy & Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
      <Card className="border-0 shadow-xl">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="flex items-center gap-3">
            <Shield className="h-5 w-5" />
            {t.privacySecurity}
          </CardTitle>
          <CardDescription>{t.manageSecuritySettings}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <Label className="text-base">{t.locationPrivacy}</Label>
              <p className="text-sm text-muted-foreground">{t.locationPrivacyDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <Label className="text-base">{t.anonymousReporting}</Label>
              <p className="text-sm text-muted-foreground">{t.anonymousReportingDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <Label className="text-base">{t.dataSharing}</Label>
              <p className="text-sm text-muted-foreground">{t.dataSharingDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <Label className="text-base">{t.clearReportHistory}</Label>
              <p className="text-sm text-muted-foreground">{t.clearReportHistoryDesc}</p>
            </div>
            <Button 
              variant="outline" 
              size="default"
              onClick={() => toast.info(t.clearReportHistory)}
              className="hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-500 text-red-600"
            >
              {t.clear}
            </Button>
          </div>
        </CardContent>
      </Card>
      </motion.div>

      {/* Data & Offline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
      <Card className="border-0 shadow-xl">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="flex items-center gap-3">
            <Database className="h-5 w-5" />
            {t.dataOffline}
          </CardTitle>
          <CardDescription>{t.dataOfflineDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <Label className="text-base">{t.autoSyncReports}</Label>
              <p className="text-sm text-muted-foreground">{t.autoSyncReportsDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <Label className="text-base">{t.offlineModeToggle}</Label>
              <p className="text-sm text-muted-foreground">{t.offlineModeToggleDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <Label className="text-base">{t.photoCompression}</Label>
              <p className="text-sm text-muted-foreground">{t.photoCompressionDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <Label className="text-base">{t.clearLocalData}</Label>
              <p className="text-sm text-muted-foreground">{t.clearLocalDataDesc}</p>
            </div>
            <Button 
              variant="outline" 
              size="default"
              onClick={() => toast.info(t.clearLocalData)}
              className="hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-500 text-red-600"
            >
              {t.clear}
            </Button>
          </div>
        </CardContent>
      </Card>
      </motion.div>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
      <Card className="border-0 shadow-xl">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="flex items-center gap-3">
            <Moon className="h-5 w-5" />
            {t.appearance}
          </CardTitle>
          <CardDescription>{t.customizeAppLooks}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <Label className="text-base">{t.darkMode}</Label>
              <p className="text-sm text-muted-foreground">
                {isDarkMode ? t.darkThemeActive : t.switchToDarkTheme}
              </p>
            </div>
            <Switch checked={isDarkMode} onCheckedChange={handleDarkModeToggle} />
          </div>
          <Separator />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1 flex-1">
              <Label className="text-base">{t.language}</Label>
              <p className="text-sm text-muted-foreground">{t.selectLanguage}</p>
            </div>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-full sm:w-[240px] h-11">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{languageNames.en}</SelectItem>
                <SelectItem value="hi">{languageNames.hi}</SelectItem>
                <SelectItem value="kn">{languageNames.kn}</SelectItem>
                <SelectItem value="ml">{languageNames.ml}</SelectItem>
                <SelectItem value="es">{languageNames.es}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      </motion.div>
    </div>
  );
}
