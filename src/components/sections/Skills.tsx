
import React, { useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import TechGlobe from '../ui/TechGlobe';

const SkillsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  return (
    <section id="skills" className="py-20 min-h-screen">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Skills
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">My Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I'm proficient with, from programming languages to design software.
          </p>
        </div>

        {/* Interactive Tech Globe */}
        <div className="mb-8">
          <TechGlobe />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
