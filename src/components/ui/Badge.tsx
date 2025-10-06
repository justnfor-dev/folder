import { HTMLAttributes, forwardRef } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'gray' | 'blue' | 'green' | 'red' | 'amber' | 'orange';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'gray', className = '', children, ...props }, ref) => {
    const variantStyles = {
      gray: 'bg-gray-100 text-gray-700',
      blue: 'bg-blue-50 text-blue-700',
      green: 'bg-green-50 text-green-700',
      red: 'bg-red-50 text-red-700',
      amber: 'bg-amber-50 text-amber-700',
      orange: 'bg-orange-50 text-orange-700',
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
