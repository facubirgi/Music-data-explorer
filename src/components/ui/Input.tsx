import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/src/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-neutral-500">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full bg-neutral-900 border border-neutral-800 rounded-full py-4 px-6 text-lg',
            'focus:outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-lg',
            'placeholder:text-neutral-600',
            icon && 'pl-14',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
