'use client';

import { cn } from '../lib/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex min-h-[44px] items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2',
        variant === 'primary' && 'bg-wedding-red text-white hover:opacity-90',
        variant === 'secondary' && 'bg-wedding-gold text-wedding-dark hover:opacity-90',
        variant === 'ghost' && 'bg-transparent hover:bg-black/5',
        variant === 'outline' && 'border border-current bg-transparent hover:bg-black/5',
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-5 py-2.5 text-base',
        size === 'lg' && 'px-7 py-3.5 text-lg',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
