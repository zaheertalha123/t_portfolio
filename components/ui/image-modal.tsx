"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

export function ImageModal({ 
  images, 
  currentIndex, 
  isOpen, 
  onClose, 
  onIndexChange 
}: ImageModalProps) {
  const [localIndex, setLocalIndex] = useState(currentIndex);

  useEffect(() => {
    setLocalIndex(currentIndex);
  }, [currentIndex]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft" && images.length > 1) goToPrevious();
    if (e.key === "ArrowRight" && images.length > 1) goToNext();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, images.length]);

  const goToPrevious = () => {
    const newIndex = localIndex === 0 ? images.length - 1 : localIndex - 1;
    setLocalIndex(newIndex);
    onIndexChange?.(newIndex);
  };

  const goToNext = () => {
    const newIndex = localIndex === images.length - 1 ? 0 : localIndex + 1;
    setLocalIndex(newIndex);
    onIndexChange?.(newIndex);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black border-zinc-800">
        {/* Header with navigation counter */}
        {images.length > 1 && (
          <div className="absolute top-4 left-4 z-10 text-white text-sm font-medium">
            {localIndex + 1} / {images.length}
          </div>
        )}

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <Button
              onClick={goToPrevious}
              size="icon"
              variant="ghost"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              onClick={goToNext}
              size="icon"
              variant="ghost"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
        
        <div className="flex items-center justify-center h-[90vh] w-full p-4">
          <div className="relative max-w-full max-h-full">
            <Image
              src={images[localIndex]}
              alt={`Image ${localIndex + 1}`}
              width={0}
              height={0}
              className="w-auto h-auto max-w-[90vw] max-h-[80vh] object-contain"
              priority
              sizes="90vw"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
