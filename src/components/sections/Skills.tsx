
import React, { useRef, useEffect } from 'react';
import SkillBadge from '../ui/SkillBadge';
import GlassCard from '../ui/GlassCard';
import { useIsMobile } from '@/hooks/use-mobile';

const SkillsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const languages = ['Java', 'Python', 'Kotlin', 'TypeScript', 'PHP'];
  const frameworks = ['Spring Boot', 'React', 'Next.js', 'Jetpack Compose'];
  const databases = ['MySQL'];
  const tools = ['Figma', 'Adobe PS', 'GitHub Actions', 'Docker', 'Azure'];
  const design = ['Figma', 'Canva', 'Adobe PS'];

  useEffect(() => {
    if (isMobile || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cards = containerRef.current?.querySelectorAll('.skill-card');
      
      cards?.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltX = (y - centerY) / 10;
        const tiltY = (centerX - x) / 10;
        
        const htmlElement = card as HTMLElement;
        htmlElement.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      });
    };

    const handleMouseLeave = () => {
      const cards = containerRef.current?.querySelectorAll('.skill-card');
      
      cards?.forEach((card) => {
        const htmlElement = card as HTMLElement;
        htmlElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  return (
    <section id="skills" className="py-20 min-h-screen">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Skills
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">My Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I'm proficient with, from programming languages to design software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto" ref={containerRef}>
          <GlassCard className="p-8 skill-card transition-all duration-300" blur="lg">
            <h3 className="text-xl font-bold mb-6">Languages</h3>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang) => (
                <SkillBadge key={lang} name={lang} />
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-8 skill-card transition-all duration-300" blur="lg">
            <h3 className="text-xl font-bold mb-6">Frameworks</h3>
            <div className="flex flex-wrap gap-3">
              {frameworks.map((framework) => (
                <SkillBadge key={framework} name={framework} />
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-8 skill-card transition-all duration-300" blur="lg">
            <h3 className="text-xl font-bold mb-6">Databases</h3>
            <div className="flex flex-wrap gap-3">
              {databases.map((db) => (
                <SkillBadge key={db} name={db} />
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-8 skill-card transition-all duration-300" blur="lg">
            <h3 className="text-xl font-bold mb-6">Tools</h3>
            <div className="flex flex-wrap gap-3">
              {tools.map((tool) => (
                <SkillBadge key={tool} name={tool} />
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-8 skill-card transition-all duration-300 md:col-span-2" blur="lg">
            <h3 className="text-xl font-bold mb-6">Design</h3>
            <div className="flex flex-wrap gap-3">
              {design.map((designTool) => (
                <SkillBadge key={designTool} name={designTool} />
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
