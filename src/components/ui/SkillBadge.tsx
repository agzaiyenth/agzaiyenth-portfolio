
import React from 'react';
import { cn } from '@/lib/utils';

interface SkillBadgeProps {
  name: string;
  icon?: React.ReactNode;
  className?: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ name, icon, className }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full',
        'bg-secondary/50 backdrop-blur-sm border border-white/10',
        'transition-all duration-300 hover:bg-accent/20 hover:shadow-glow-sm',
        'hover:scale-105 hover:-translate-y-1',
        className
      )}
    >
      {icon}
      <span className="font-medium">{name}</span>
    </div>
  );
};

export default SkillBadge;
