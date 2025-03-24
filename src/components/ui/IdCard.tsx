
import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Shield, Award, Star, Coffee } from 'lucide-react';

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
      {/* ID Card lanyard/strap */}
      <div className="relative w-72 flex justify-center mb-[-15px] z-10">
        <div className="w-24 h-6 bg-gradient-to-r from-red-600 to-red-500 rounded-t-lg"></div>
      </div>
      
      {/* Lanyard string */}
      <div className="relative w-72 flex justify-center items-center">
        <div className="absolute top-0 w-1 h-20 bg-gradient-to-b from-red-500 to-red-700 z-20"></div>
      </div>
      
      <div 
        ref={cardRef} 
        className="w-64 h-auto bg-[#1A1F2C] rounded-xl overflow-hidden shadow-glow-md border border-white/10 transition-transform duration-300 ease-out"
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
          {/* Photo with glowing border */}
          <div className="mb-3 p-1 bg-gradient-to-br from-accent to-purple-500 rounded-full shadow-glow-sm">
            <Avatar className="w-24 h-24 border-2 border-background">
              <AvatarImage src="/lovable-uploads/4aa83f49-66da-4c10-9865-617f31045e99.png" alt="Agzaiyenth" />
              <AvatarFallback className="bg-accent/20 text-xl">AG</AvatarFallback>
            </Avatar>
          </div>
          
          {/* Name and title */}
          <h2 className="text-lg font-bold mb-1">Agzaiyenth Ganaraj</h2>
          <p className="text-sm text-white/70 mb-3">Full-Stack AI Engineer</p>
          
          {/* Experience and specializations */}
          <div className="w-full space-y-2 mb-3">
            <div className="flex items-center gap-2 text-sm">
              <Shield size={16} className="text-blue-400" />
              <span className="text-white/90">PsyCode Innovations</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Award size={16} className="text-amber-400" />
              <span className="text-white/90">LEXi Founder</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star size={16} className="text-green-400" />
              <span className="text-white/90">AI Solutions Specialist</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Coffee size={16} className="text-purple-400" />
              <span className="text-white/90">Java & TypeScript Expert</span>
            </div>
          </div>
          
          {/* Skills badges */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-3">
            <Badge variant="outline" className="bg-accent/10 text-xs">React</Badge>
            <Badge variant="outline" className="bg-accent/10 text-xs">TypeScript</Badge>
            <Badge variant="outline" className="bg-accent/10 text-xs">Java</Badge>
            <Badge variant="outline" className="bg-accent/10 text-xs">AI</Badge>
          </div>
          
          {/* QR code-like element */}
          <div className="w-16 h-16 bg-white/10 rounded-md p-1">
            <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-0.5">
              {Array.from({ length: 16 }).map((_, i) => (
                <div 
                  key={i} 
                  className="rounded-sm" 
                  style={{ 
                    backgroundColor: Math.random() > 0.6 ? 'rgba(255,255,255,0.8)' : 'transparent'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Card hole */}
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-background/30 border border-white/20" style={{ transform: 'translateZ(15px)' }}></div>
      </div>
    </div>
  );
};

export default IdCard;
