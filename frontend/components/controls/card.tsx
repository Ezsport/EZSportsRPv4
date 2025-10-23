import * as React from "react"
import { cn } from "@/lib/utils"

// Define variant and size types
type CardVariant = 'default' | 'outlined' | 'elevated' | 'gradient'
type CardSize = 'sm' | 'md' | 'lg' | 'xl'
type CardColor = 'primary' | 'secondary' | 'accent' | 'neutral'

// Enhanced Card Component Props
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  size?: CardSize
  color?: CardColor
  hover?: boolean
  fullWidth?: boolean
  title?: string
  note?: string
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  icon?: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md', 
    color = 'neutral', 
    hover = false,
    fullWidth = false,
    title,
    note,
    titleAs,
    icon,
    children,
    ...props 
  }, ref) => {
    const variantStyles = {
      default: "bg-transparent border border-1",
      outlined: "border border-2 bg-transparent",
      elevated: "shadow-md border border-1 border-neutral-200/50",
      gradient: "bg-gradient-to-br from-primary/10 to-secondary/10 border border-1 border-neutral-200/30"
    }

    const sizeStyles = {
      sm: "rounded-md p-2",
      md: "rounded-lg p-4",
      lg: "rounded-xl p-6",
      xl: "rounded-2xl p-8"
    }

    const colorStyles = {
      primary: "border-primary/40 hover:border-primary/60",
      secondary: "border-primary/40 hover:border-primary/60",
      accent: "border-primary/40 hover:border-primary/60",
      neutral: "border-primary/40 hover:border-primary/60"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "transition-all duration-300",
          variantStyles[variant],
          sizeStyles[size],
          colorStyles[color],
          hover && "hover:shadow-lg hover:scale-[1.02]",
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {(title || icon) && (
          <CardHeader>
            <div className="flex items-center space-x-2">
              {icon && <div className="flex-shrink-0">{icon}</div>}
              {title && <CardTitle as={titleAs || 'h3'}>{title}</CardTitle>}
            </div>
            {note && <CardDescription>{note}</CardDescription>}
          </CardHeader>
        )}
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"

// Enhanced CardHeader Component
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  centered?: boolean
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, centered = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col mb-4",
        centered && "items-center text-center",
        className
      )}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

// Enhanced CardTitle Component
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        "text-xl font-medium tracking-tight text-primary",
        className
      )}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

// Enhanced CardDescription Component
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-muted-foreground",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

// Enhanced CardContent Component
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollable?: boolean
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, scrollable = false, ...props }, ref) => (
    <div 
      ref={ref} 
      className={cn(
        "p-4",
        scrollable && "overflow-y-auto max-h-64",
        className
      )} 
      {...props} 
    />
  )
)
CardContent.displayName = "CardContent"

// Enhanced CardFooter Component
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  alignment?: 'left' | 'center' | 'right' | 'between'
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, alignment = 'right', ...props }, ref) => {
    const alignmentStyles = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
      between: "justify-between"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center p-4 space-x-2",
          alignmentStyles[alignment],
          className
        )}
        {...props}
      />
    )
  }
)
CardFooter.displayName = "CardFooter"

export {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter
}
