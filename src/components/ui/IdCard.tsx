
import React, { useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const IdCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  return (
    <div className="perspective-1000">
      <div 
        ref={cardRef} 
        className="w-52 bg-[#1A1F2C] rounded-xl overflow-hidden shadow-glow-md border border-white/10 transition-transform duration-300 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card header */}
        <div className="bg-[#192231] border-b border-white/10 p-3 flex justify-between items-center">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center" style={{ transform: 'translateZ(20px)' }}>
            <span className="text-accent font-bold">AG</span>
          </div>
        </div>
        
        {/* Card photo and info */}
        <div className="p-4 flex flex-col items-center" style={{ transform: 'translateZ(10px)' }}>
          {/* Photo with glowing border - moved slightly down with mt-2 */}
          <div className="mt-1 mb-3 p-1 bg-accent rounded-full shadow-glow-sm">
            <Avatar className="w-20 h-20 border-2 border-background">
              <AvatarImage src="/lovable-uploads/4aa83f49-66da-4c10-9865-617f31045e99.png" alt="Agzaiyenth" className="object-cover" />
              <AvatarFallback className="bg-accent/20 text-xl">AG</AvatarFallback>
            </Avatar>
          </div>
          
          {/* Name and title */}
          <h2 className="text-base font-bold mb-1">Agzaiyenth Ganaraj</h2>
          <p className="text-xs text-white/70 mb-3">Full-Stack Engineer</p>
        </div>
      </div>
    </div>
  );
};

export default IdCard;
