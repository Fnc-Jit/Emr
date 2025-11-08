import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { ZoomIn } from "lucide-react";

interface ImageCropDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string;
  onCropComplete: (croppedImage: string) => void;
}

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CroppedAreaPixels {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function ImageCropDialog({ open, onOpenChange, imageSrc, onCropComplete }: ImageCropDialogProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);

  const onCropChange = (location: { x: number; y: number }) => {
    setCrop(location);
  };

  const onZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  const onCropCompleteInternal = useCallback(
    (croppedArea: Area, croppedAreaPixels: CroppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const createCroppedImage = useCallback(async () => {
    if (!croppedAreaPixels) return;

    const image = new Image();
    image.src = imageSrc;
    
    await new Promise((resolve) => {
      image.onload = resolve;
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const size = Math.min(croppedAreaPixels.width, croppedAreaPixels.height);
    canvas.width = size;
    canvas.height = size;

    // Create circular clipping path
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      size,
      size
    );

    canvas.toBlob((blob) => {
      if (!blob) return;
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        onCropComplete(base64data);
        onOpenChange(false);
      };
    }, "image/jpeg", 0.95);
  }, [croppedAreaPixels, imageSrc, onCropComplete, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Crop Profile Picture</DialogTitle>
          <DialogDescription>
            Adjust the image to fit in a circular frame
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative h-[400px] w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={onCropChange}
            onCropComplete={onCropCompleteInternal}
            onZoomChange={onZoomChange}
          />
        </div>

        <div className="space-y-3 px-2">
          <div className="flex items-center gap-3">
            <ZoomIn className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[zoom]}
              onValueChange={(value) => setZoom(value[0])}
              min={1}
              max={3}
              step={0.1}
              className="flex-1"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={createCroppedImage}
            className="bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800"
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
