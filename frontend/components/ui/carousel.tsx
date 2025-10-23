import React, { useState, useEffect, useCallback } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

interface CarouselProps {
  images: string[]
  autoPlayInterval?: number
  className?: string
}

export function Carousel({ 
  images, 
  autoPlayInterval = 5000, 
  className 
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }, [images.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }, [images.length])

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(nextSlide, autoPlayInterval)
      return () => clearInterval(interval)
    }
  }, [nextSlide, autoPlayInterval, images.length])

  if (images.length === 0) return null

  return (
    <div className={cn(
      "relative w-full h-64 md:h-96 overflow-hidden rounded-lg group",
      className
    )}>
      {/* Main Image */}
      <div className="w-full h-full transition-transform duration-500 ease-in-out">
        <img 
          src={images[currentIndex]} 
          alt={`Slide ${currentIndex + 1}`} 
          className="w-full h-full object-cover absolute top-0 left-0"
        />
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-1/2 left-4 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={prevSlide}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-1/2 right-4 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={nextSlide}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-colors duration-300",
                index === currentIndex 
                  ? "bg-primary" 
                  : "bg-muted-foreground/50 hover:bg-muted-foreground"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
