import * as React from "react"
import { cn } from "@/lib/utils"

interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}

const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
  (
    { 
      className, 
      orientation = "horizontal", 
      decorative = true, 
      ...props 
    }, 
    ref
  ) => (
    <hr
      ref={ref}
      role={decorative ? "presentation" : "separator"}
      aria-orientation={orientation}
      className={cn(
        "bg-border",
        orientation === "horizontal" 
          ? "h-[1px] w-full" 
          : "w-[1px] h-full",
        className
      )}
      {...props}
    />
  )
)

Separator.displayName = "Separator"

export { Separator }
