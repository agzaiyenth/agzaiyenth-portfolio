
import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

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
      <div 
        ref={cardRef} 
        className="w-72 md:w-80 h-auto bg-[#222831]/80 backdrop-blur-md rounded-xl overflow-hidden shadow-glow-md border border-white/10 transition-transform duration-300 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card header */}
        <div className="bg-gradient-to-r from-[#232d3a] to-[#192231] border-b border-white/10 p-4 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gradient">ID CARD</h3>
            <span className="text-xs text-white/70">Full-Stack Developer</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center" style={{ transform: 'translateZ(20px)' }}>
            <span className="text-accent font-bold">AG</span>
          </div>
        </div>
        
        {/* Card photo and info */}
        <div className="p-5 flex flex-col items-center" style={{ transform: 'translateZ(10px)' }}>
          {/* Photo with glowing border */}
          <div className="mb-4 p-1 bg-gradient-to-br from-accent to-purple-500 rounded-full shadow-glow-sm">
            <Avatar className="w-28 h-28 border-2 border-background">
              <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&q=80" alt="Agzaiyenth" />
              <AvatarFallback className="bg-accent/20 text-xl">AG</AvatarFallback>
            </Avatar>
          </div>
          
          {/* Name and title */}
          <h2 className="text-xl font-bold mb-1">Agzaiyenth Ganaraj</h2>
          <p className="text-sm text-white/70 mb-4">Software Engineer</p>
          
          {/* ID number and other identifiers */}
          <div className="w-full grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="bg-white/5 p-2 rounded-lg">
              <span className="text-xs text-white/50 block">ID Number</span>
              <span className="font-mono text-white/90">FSD-7686-7362</span>
            </div>
            <div className="bg-white/5 p-2 rounded-lg">
              <span className="text-xs text-white/50 block">Issue Date</span>
              <span className="font-mono text-white/90">2023-08-15</span>
            </div>
          </div>
          
          {/* Skills badges */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <Badge variant="outline" className="bg-accent/10">React</Badge>
            <Badge variant="outline" className="bg-accent/10">TypeScript</Badge>
            <Badge variant="outline" className="bg-accent/10">Java</Badge>
            <Badge variant="outline" className="bg-accent/10">AI</Badge>
          </div>
          
          {/* Barcode-like element */}
          <div className="w-full h-12 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded flex items-center justify-center overflow-hidden">
            <div className="flex h-full">
              {Array.from({ length: 30 }).map((_, i) => (
                <div 
                  key={i}
                  className="h-full w-1 mx-0.5"
                  style={{ 
                    backgroundColor: i % 3 === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)',
                    height: `${70 + Math.random() * 30}%`,
                    marginTop: 'auto'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Card footer */}
        <div className="bg-gradient-to-r from-[#192231] to-[#232d3a] p-3 text-center text-sm text-white/50 border-t border-white/10">
          <p>Valid indefinitely</p>
        </div>
        
        {/* Card hole */}
        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-background border border-white/20" style={{ transform: 'translateZ(15px)' }}></div>
        
        {/* Card string */}
        <div 
          className="absolute top-0 right-7 w-1 h-60 bg-gradient-to-b from-accent/80 to-purple-500/80"
          style={{ transform: 'translateZ(25px) rotate(-5deg)' }}
        ></div>
      </div>
    </div>
  );
};

export default IdCard;
