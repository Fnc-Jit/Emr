import { useState, useEffect } from "react";
import { Menu, User, AlertCircle, Settings, LogOut, Clock, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "./LanguageProvider";
import { motion } from "motion/react";

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const [profileImage, setProfileImage] = useState<string | null>(
    localStorage.getItem("profileImage") || null
  );
  const [userName, setUserName] = useState<string>(
    localStorage.getItem("userName") || t.emergencyUser
  );

  const userMode = localStorage.getItem("userMode") || "user";

  useEffect(() => {
    const handleProfileImageUpdate = (event: CustomEvent) => {
      setProfileImage(event.detail.imageUrl);
    };

    const handleProfileNameUpdate = (event: CustomEvent) => {
      setUserName(event.detail.userName);
    };

    window.addEventListener("profileImageUpdated", handleProfileImageUpdate as EventListener);
    window.addEventListener("profileNameUpdated", handleProfileNameUpdate as EventListener);

    return () => {
      window.removeEventListener("profileImageUpdated", handleProfileImageUpdate as EventListener);
      window.removeEventListener("profileNameUpdated", handleProfileNameUpdate as EventListener);
    };
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t.goodMorning;
    if (hour < 18) return t.goodAfternoon;
    return t.goodEvening;
  };

  const handleMenuClick = (page: string) => {
    // If clicking on the currently active page, just close the menu
    if (currentPage === page) {
      setOpen(false);
      return;
    }
    
    // Otherwise, close menu and navigate
    setOpen(false);
    onNavigate(page);
  };

  const menuItems = [
    { icon: AlertCircle, label: t.home, page: "home", color: "from-red-500 to-orange-600" },
    // Show different menu item based on user mode
    userMode === "volunteer" 
      ? { icon: CheckCircle2, label: t.reportsReviewed, page: "reports-reviewed", color: "from-green-500 to-emerald-600" }
      : { icon: Clock, label: t.previousReports, page: "previous-reports", color: "from-blue-500 to-indigo-600" },
    { icon: Settings, label: t.settings, page: "settings", color: "from-purple-500 to-pink-600" },
    { icon: LogOut, label: t.logout, page: "logout", color: "from-gray-500 to-slate-600" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm"
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Hamburger Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-11 w-11 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 dark:hover:from-red-950/30 dark:hover:to-orange-950/30"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-orange-600" />
                {t.menu}
              </SheetTitle>
              <SheetDescription>{t.menuDescription}</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-2 mt-6">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Button
                    variant={currentPage === item.page ? "secondary" : "ghost"}
                    className={`
                      justify-start gap-3 h-12 rounded-xl group relative overflow-hidden
                      ${currentPage === item.page ? 'shadow-lg' : ''}
                    `}
                    onClick={() => handleMenuClick(item.page)}
                  >
                    {currentPage === item.page && (
                      <motion.div
                        layoutId="activeMenu"
                        className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-10`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className={`
                      p-1.5 rounded-lg bg-gradient-to-br ${item.color}
                      ${currentPage === item.page ? '' : 'opacity-60 group-hover:opacity-100'}
                      transition-opacity
                    `}>
                      <item.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="relative">{item.label}</span>
                  </Button>
                </motion.div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Greeting */}
        <div className="flex-1 text-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent"
          >
            {getGreeting()}
          </motion.h1>
        </div>

        {/* User Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="h-auto w-auto p-0 rounded-full hover:bg-transparent"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Avatar className="h-11 w-11 ring-2 ring-offset-2 ring-orange-500/50 dark:ring-orange-600/50">
                  <AvatarImage src={profileImage || undefined} alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p>{userName}</p>
                <p className="text-xs text-muted-foreground">
                  {userMode === "volunteer" ? "Verified Volunteer" : "Citizen User"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onNavigate("settings")} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>{t.settings}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => onNavigate("logout")}
              className="text-red-600 focus:text-red-600 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>{t.logout}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
}
