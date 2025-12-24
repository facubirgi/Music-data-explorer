import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export function LoadingSpinner({ size = 'md', fullScreen = false }: LoadingSpinnerProps) {
  const sizes = {
    sm: 20,
    md: 32,
    lg: 48,
  };

  const spinner = <Loader2 className="animate-spin text-green-500" size={sizes[size]} />;

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        {spinner}
      </div>
    );
  }

  return spinner;
}
