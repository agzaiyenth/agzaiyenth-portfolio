
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
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
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
      
      <footer className="py-6 border-t border-white/10">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Agzaiyenth Ganaraj. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm mt-2 md:mt-0">
              Designed with ✨ and code
            </p>
          </div>
        </div>
      </footer>
      
      <ScrollToTop />
    </div>
  );
};

export default Index;
