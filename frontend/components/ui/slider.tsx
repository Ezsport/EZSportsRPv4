"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface SliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  label?: string;
  className?: string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, label, ...props }, ref) => (
  <div className="flex flex-col space-y-2">
    {label && (
      <label className="block text-sm font-medium text-gray-700">{label}</label>
    )}
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-gray-200 cursor-pointer data-[disabled]:bg-gray-100">
        <SliderPrimitive.Range className="absolute h-full bg-primary data-[disabled]:bg-primary/30" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block h-4 w-4 rounded-full border-2 border-primary bg-white 
        shadow-lg transition-colors focus-visible:outline-none 
        focus-visible:ring-2 focus-visible:ring-ring 
        focus-visible:ring-offset-2 disabled:pointer-events-none 
        disabled:opacity-50 cursor-pointer 
        data-[disabled]:border-primary/30"
      />
    </SliderPrimitive.Root>
  </div>
));

Slider.displayName = "Slider";

export { Slider };
