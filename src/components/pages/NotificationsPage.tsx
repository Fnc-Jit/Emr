import { Bell, CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useLanguage } from "../LanguageProvider";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

export function NotificationsPage() {
  const { t } = useLanguage();
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      icon: CheckCircle,
      title: t.certificateVerified,
      message: t.certificateVerifiedMsg,
      time: `2 ${t.hoursAgo}`,
      read: false
    },
    {
      id: 2,
      type: "warning",
      icon: AlertCircle,
      title: t.certificateExpiring,
      message: t.certificateExpiringMsg,
      time: `5 ${t.hoursAgo}`,
      read: false
    },
    {
      id: 3,
      type: "info",
      icon: Info,
      title: t.newHealthGuidelines,
      message: t.newHealthGuidelinesMsg,
      time: `1 ${t.dayAgo}`,
      read: true
    },
    {
      id: 4,
      type: "success",
      icon: CheckCircle,
      title: t.documentUploaded,
      message: t.documentUploadedMsg,
      time: `2 ${t.daysAgo}`,
      read: true
    },
    {
      id: 5,
      type: "info",
      icon: Info,
      title: t.systemMaintenance,
      message: t.systemMaintenanceMsg,
      time: `3 ${t.daysAgo}`,
      read: true
    }
  ]);

  const handleDismiss = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success(t.notificationDismissed || "Notification dismissed");
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "info":
        return "text-[#11111b] dark:text-[#b4befe]";
      default:
        return "text-gray-600";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2">{t.notifications}</h2>
          <p className="text-muted-foreground">{t.stayUpdated}</p>
        </div>
        {unreadCount > 0 && (
          <Badge variant="default" className="bg-[#b4befe] text-[#11111b]">
            {unreadCount} {t.newLabel}
          </Badge>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card 
            key={notification.id}
            className={`group hover:shadow-md transition-shadow ${!notification.read ? 'bg-gray-50 dark:bg-[#313244] border-gray-200 dark:border-[#45475a]' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className={`flex-shrink-0 ${getIconColor(notification.type)}`}>
                  <notification.icon className="h-6 w-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium">{notification.title}</h3>
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-[#b4befe] flex-shrink-0 mt-2" />
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDismiss(notification.id)}
                        aria-label="Dismiss notification"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">{t.noNotifications}</p>
        </div>
      )}
    </div>
  );
}
