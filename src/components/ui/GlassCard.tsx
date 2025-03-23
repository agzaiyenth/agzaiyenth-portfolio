
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg';
  opacity?: 'low' | 'medium' | 'high';
  border?: boolean;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  blur = 'md',
  opacity = 'medium',
  border = true,
  hover = false,
}) => {
  const blurMapping = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
  };

  const opacityMapping = {
    low: 'bg-white/5 dark:bg-black/5',
    medium: 'bg-white/10 dark:bg-black/10',
    high: 'bg-white/20 dark:bg-black/20',
  };

  return (
    <div
      className={cn(
        'rounded-2xl',
        blurMapping[blur],
        opacityMapping[opacity],
        border && 'border border-white/10 dark:border-white/10',
        hover && 'transition-all duration-300 hover:shadow-glow-sm hover:-translate-y-1',
        'shadow-glass',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
