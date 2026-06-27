import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info'
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/80',
      secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      destructive: 'bg-red-50 text-red-600 hover:bg-red-100',
      outline: 'text-foreground border border-gray-200 hover:bg-gray-50',
      success: 'bg-green-50 text-green-600 hover:bg-green-100',
      warning: 'bg-amber-50 text-amber-600 hover:bg-amber-100',
      info: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    }
    
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-semibold transition-colors',
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'
