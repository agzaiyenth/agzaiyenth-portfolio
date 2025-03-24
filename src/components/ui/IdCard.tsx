
import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Shield, Award, Star } from 'lucide-react';

const IdCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Gentle swinging animation
    const swingAnimation = () => {
      if (!cardRef.current || isMobile) return;
      
      let time = 0;
      let lastTime = 0;
      
      const animateSwing = (currentTime: number) => {
        if (!cardRef.current) return;
        
        if (lastTime === 0) lastTime = currentTime;
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        
        time += deltaTime * 0.001; // Convert ms to seconds
        
        // Gentle swinging movement
        const rotateY = Math.sin(time * 0.5) * 10;
        const rotateX = Math.sin(time * 0.7) * 5;
        const translateY = Math.sin(time * 0.3) * 5;
        
        cardRef.current.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(${translateY}px)`;
        
        requestAnimationFrame(animateSwing);
      };
      
      const animationId = requestAnimationFrame(animateSwing);
      
      return () => cancelAnimationFrame(animationId);
    };
    
    const cleanup = swingAnimation();
    
    return () => {
      if (cleanup) cleanup();
    };
  }, [isMobile]);
  
  // Handle mouse movement for 3D effect
  useEffect(() => {
    if (isMobile || !cardRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const card = cardRef.current;
      const cardRect = card.getBoundingClientRect();
      
      // Calculate mouse position relative to the card center
      const centerX = cardRect.left + cardRect.width / 2;
      const centerY = cardRect.top + cardRect.height / 2;
      const rotateY = ((e.clientX - centerX) / (cardRect.width / 2)) * 15; // max 15 degrees
      const rotateX = -((e.clientY - centerY) / (cardRect.height / 2)) * 15; // max 15 degrees
      
      // Apply the rotation with a transition
      card.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    };
    
    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      // Return to default gentle swinging when mouse leaves
      cardRef.current.style.transition = 'transform 0.5s ease-out';
      setTimeout(() => {
        if (cardRef.current) cardRef.current.style.transition = '';
      }, 500);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    cardRef.current.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (cardRef.current) {
        cardRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isMobile]);
  
  return (
    <div className="perspective-1000">
      {/* ID Card lanyard with more realistic strap */}
      <div className="relative flex justify-center mb-5">
        {/* Lanyard neck strap */}
        <div className="absolute top-0 w-full">
          <div className="relative mx-auto w-32">
            {/* Top curve of lanyard */}
            <div className="h-14 w-32 border-t-4 border-l-4 border-r-4 rounded-t-full border-red-600"></div>
            {/* Lanyard drop to card */}
            <div className="absolute left-0 right-0 mx-auto w-1.5 h-16 bg-gradient-to-b from-red-600 to-red-700"></div>
          </div>
        </div>
      </div>
      
      {/* ID Card clip */}
      <div className="relative w-full flex justify-center mb-[-8px] z-10">
        <div className="w-7 h-4 bg-gradient-to-b from-slate-300 to-slate-400 rounded-sm"></div>
      </div>
      
      <div 
        ref={cardRef} 
        className="w-60 bg-[#1A1F2C] rounded-xl overflow-hidden shadow-glow-md border border-white/10 transition-transform duration-300 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card header */}
        <div className="bg-[#192231] border-b border-white/10 p-3 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-white">ACCESS CARD</h3>
            <span className="text-xs text-white/70">Full-Stack Developer</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center" style={{ transform: 'translateZ(20px)' }}>
            <span className="text-accent font-bold">AG</span>
          </div>
        </div>
        
        {/* Card photo and info */}
        <div className="p-4 flex flex-col items-center" style={{ transform: 'translateZ(10px)' }}>
          {/* Photo with glowing border - preserve aspect ratio */}
          <div className="mb-3 p-1 bg-gradient-to-br from-accent to-purple-500 rounded-full shadow-glow-sm">
            <Avatar className="w-20 h-20 border-2 border-background">
              <AvatarImage src="/lovable-uploads/4aa83f49-66da-4c10-9865-617f31045e99.png" alt="Agzaiyenth" className="object-cover" />
              <AvatarFallback className="bg-accent/20 text-xl">AG</AvatarFallback>
            </Avatar>
          </div>
          
          {/* Name and title */}
          <h2 className="text-base font-bold mb-1">Agzaiyenth Ganaraj</h2>
          <p className="text-xs text-white/70 mb-3">Full-Stack Engineer</p>
          
          {/* Experience and specializations */}
          <div className="w-full space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Shield size={14} className="text-blue-400" />
              <span className="text-white/90">PsyCode Labs</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Award size={14} className="text-amber-400" />
              <span className="text-white/90">LEXi Founder</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star size={14} className="text-green-400" />
              <span className="text-white/90">TypeScript Expert</span>
            </div>
          </div>
          
          {/* Skills badges */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            <Badge variant="outline" className="bg-accent/10 text-xs">React</Badge>
            <Badge variant="outline" className="bg-accent/10 text-xs">TypeScript</Badge>
            <Badge variant="outline" className="bg-accent/10 text-xs">Java</Badge>
            <Badge variant="outline" className="bg-accent/10 text-xs">AI</Badge>
          </div>
        </div>
        
        {/* Card hole */}
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-background/30 border border-white/20" style={{ transform: 'translateZ(15px)' }}></div>
      </div>
    </div>
  );
};

export default IdCard;
