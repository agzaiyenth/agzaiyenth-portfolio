
import React, { useRef } from 'react';
import TypewriterText from '@/components/ui/TypewriterText';
import { ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import IdCard from '@/components/ui/IdCard';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  return (
    <section 
      id="hero" 
      className="snap-section relative min-h-screen flex flex-col items-center justify-center"
      ref={heroRef}
    >
      {/* Abstract geometric shapes */}
      <div 
        className="absolute top-1/3 -left-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
      />
      <div 
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
      />
      
      {/* Content */}
       <div className="flex flex-col items-center md:items-start md:max-w-2xl mb-12 md:mb-0">
          <span className="text-sm md:text-base font-medium tracking-wider uppercase text-accent mb-2 animate-fade-in">
            Full-Stack & AI Engineer
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center md:text-left leading-tight tracking-tight mb-6 animate-fade-in">
            Agzaiyenth Ganaraj
          </h1>
          
          <h2 className="text-lg md:text-2xl text-center md:text-left text-muted-foreground max-w-3xl mb-8 animate-fade-in">
            <TypewriterText 
              texts={[
                "Crafting Smart, Scalable, Impactful Solutions with Code",
                "Building AI-powered applications for real-world problems",
                "Passionate about inclusive and meaningful technology",
                "Founder, developer, and continuous learner"
              ]}
              className="min-h-[2rem]"
            />
          </h2>
          
          <div className="flex gap-4 mb-12 animate-fade-in">
            <a 
              href="#projects" 
              className="px-6 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent/90 transition-all shadow-glow-sm hover:shadow-glow-md hover:-translate-y-1"
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 rounded-full border border-accent/20 bg-accent/10 hover:bg-accent/20 text-accent transition-all hover:-translate-y-1"
            >
              Contact Me
            </a>
          </div>
        </div>
     
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a 
          href="#about" 
          className="flex flex-col items-center justify-center text-muted-foreground hover:text-accent transition-colors"
          aria-label="Scroll to About section"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown size={24} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
