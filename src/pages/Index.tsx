
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ProjectsSection from '@/components/sections/Projects';
import SkillsSection from '@/components/sections/Skills';
import AchievementsSection from '@/components/sections/Achievements';
import LeadershipSection from '@/components/sections/Leadership';
import CertificationsSection from '@/components/sections/Certifications';
import PublicationsSection from '@/components/sections/Publications';
import ContactSection from '@/components/sections/Contact';
import ScrollToTop from '@/components/ui/ScrollToTop';

const Index = () => {
  // Set dark mode by default
  useEffect(() => {
    document.documentElement.classList.add('dark');
    
    // Fix horizontal scrolling issues
    document.body.style.overflowX = 'hidden';
    
    return () => {
      document.body.style.overflowX = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      
      <main className="snap-container">
        <Hero />
        <About />
        <ProjectsSection />
        <SkillsSection />
        <AchievementsSection />
        <LeadershipSection />
        <CertificationsSection />
        <PublicationsSection />
        <ContactSection />
      </main>
      
      <ScrollToTop />
    </div>
  );
};

export default Index;
