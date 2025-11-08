import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "./ui/dialog";
import { Download, Share2, FileText } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

interface HealthCertificateProps {
  id: string;
  title: string;
  healthId: string;
  issueDate: string;
  status: "valid" | "expired" | "pending";
  thumbnail?: string;
}

export function HealthCertificate({ 
  id, 
  title, 
  healthId, 
  issueDate, 
  status,
  thumbnail = "https://images.unsplash.com/photo-1533545587081-bbdccaab0c33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2VydGlmaWNhdGUlMjBkb2N1bWVudHxlbnwxfHx8fDE3NTY5MTgyMDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
}: HealthCertificateProps) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "valid":
        return t.valid;
      case "expired":
        return t.expired;
      case "pending":
        return t.pending;
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid":
        return "bg-green-100 text-green-800 border-green-200";
      case "expired":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleDownload = () => {
    // Mock download functionality
    console.log(`Downloading certificate: ${healthId}`);
  };

  const handleShare = () => {
    // Mock share functionality
    console.log(`Sharing certificate: ${healthId}`);
  };

  return (
    <>
      <Card 
        className="cursor-pointer hover:shadow-md transition-shadow duration-200"
        onClick={() => setOpen(true)}
      >
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Thumbnail */}
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
              <ImageWithFallback
                src={thumbnail}
                alt={`${title} certificate`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="font-medium text-foreground line-clamp-2">{title}</h3>
                <Badge 
                  variant="outline" 
                  className={getStatusColor(status)}
                >
                  {getStatusLabel(status)}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Health ID:</p>
                <p className="font-mono text-sm font-medium text-foreground">{healthId}</p>
              </div>
              
              <p className="text-xs text-muted-foreground">
                Issued: {new Date(issueDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {t.manageCertificatesAndIds}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Certificate Preview */}
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
              <ImageWithFallback
                src={thumbnail}
                alt={`${title} certificate`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge 
                  variant="outline" 
                  className={getStatusColor(status)}
                >
                  {getStatusLabel(status)}
                </Badge>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Health ID:</p>
                <p className="font-mono text-sm font-medium text-foreground">{healthId}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Issue Date:</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(issueDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button 
                variant="outline" 
                className="flex-1 gap-2"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 gap-2"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}