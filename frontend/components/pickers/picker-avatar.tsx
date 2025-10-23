"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import { Button, Buttons } from "@/components/controls/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Upload as UploadIcon, Trash2 as TrashIcon } from "lucide-react";

interface AvatarPickerProps {
  image?: string | null;
  value?: string | null;
  onChange?: (image: string | null) => void;
  layout?: "horizontal" | "vertical";
  width?: number;
  height?: number;
}

export default function AvatarPicker({
  image: sourceProp,
  value,
  onChange,
  layout = "vertical",
  width = 120,
  height = 120,
}: AvatarPickerProps) {
  const editorRef = useRef<AvatarEditor>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [localImage, setLocalImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

  const [isLocalImageUploaded, setIsLocalImageUploaded] = useState(false);

  const currentImage = isLocalImageUploaded ? localImage : (sourceProp || localImage);

  const generateEditedImage = useCallback(() => {
    if (editorRef.current) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();

      onChange?.(croppedImg);
    }
  }, [onChange]);

  useEffect(() => {
    generateEditedImage();
  }, [scale, rotate, position, generateEditedImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const maxSize = 5 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      console.error("Invalid file type. Please upload an image.");
      return;
    }

    if (file.size > maxSize) {
      console.error("File is too large. Maximum size is 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const img = reader.result as string;

      if (!img.startsWith("data:image/")) {
        console.error("Invalid image data URL");
        return;
      }

      setLocalImage(img);
      setIsLocalImageUploaded(true);
      setScale(1);
      setRotate(0);
      setPosition({ x: 0.5, y: 0.5 });
      
      setTimeout(() => {
        onChange?.(img);
      }, 100);
      
      e.target.value = "";
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    reader.readAsDataURL(file);
  };

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!currentImage || !containerRef.current) return;

      e.preventDefault();
      e.stopPropagation();

      const rect = containerRef.current.getBoundingClientRect();
      const isWithinContainer =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!isWithinContainer) return;

      setScale((prev) => {
        const scaleChange = e.deltaY > 0 ? -0.1 : 0.1;
        const newScale = Math.min(4, Math.max(1, prev + scaleChange));

        return newScale;
      });
    },
    [currentImage]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container && currentImage) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, [handleWheel, currentImage]);

  // Reset local upload when sourceProp changes
  useEffect(() => {
    if (sourceProp) {
      setIsLocalImageUploaded(false);
      onChange?.(sourceProp);
    }
  }, [sourceProp]);

  const handleChooseFile = () => fileInputRef.current?.click();

  const handleRemoveImage = () => {
    setScale(1);
    setRotate(0);
    setPosition({ x: 0.5, y: 0.5 });
    setTimeout(() => {
      setIsLocalImageUploaded(true);
      setLocalImage(null);
      onChange?.(null);
    }, 100);
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        layout === "horizontal" ? "flex-row items-center" : ""
      )}
    >
      <div
        ref={containerRef}
        className={`
          ${currentImage ? "cursor-grab" : ""} 
          avatar-editor-container border w-[122px] h-[122px]`}
        style={{
          backgroundImage: `
              linear-gradient(45deg, #d1d5db 25%, transparent 25%, transparent 75%, #d1d5db 75%),
              linear-gradient(45deg, #d1d5db 25%, transparent 25%, transparent 75%, #d1d5db 75%)
            `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px",
        }}
      >
        {currentImage ? (
          <AvatarEditor
            ref={editorRef}
            image={currentImage}
            width={width}
            height={height}
            border={0}
            color={[255, 255, 255, 0.6]}
            scale={scale}
            rotate={rotate}
            position={position}
            onPositionChange={setPosition}
          />
        ) : (
          <div className="flex items-center text-sm justify-center w-full h-full text-gray-500">
            No Image
          </div>
        )}
      </div>

      <div className="flex justify-center items-center gap-4">
        <Button
          type="button"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            handleChooseFile();
          }}
          variant="default"
          icon="upload"
          size="sm"
        />
        <Button
          type="button"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            handleRemoveImage();
          }}
          variant="destructive"
          icon="delete"
          size="sm"
          disabled={!currentImage}
        />
      </div>

      {currentImage && (
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Zoom</span>
              <span className="text-sm">{Math.round(scale * 100)}%</span>
            </div>
            <Slider
              className="w-full"
              min={1}
              max={4}
              step={0.1}
              value={[scale]}
              onValueChange={(value) => {
                setScale(value[0]);
              }}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Rotate</span>
              <span className="text-sm">{rotate}°</span>
            </div>
            <Slider
              className="w-full"
              min={-180}
              max={180}
              value={[rotate]}
              onValueChange={(value) => {
                setRotate(value[0]);
              }}
            />
          </div>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
