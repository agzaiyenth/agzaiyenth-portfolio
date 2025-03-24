
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollIndicator } from '@/hooks/useScrollIndicator';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#hero');
  const scrollProgress = useScrollIndicator();
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently most visible
      const sections = navItems.map((item) => item.href);
      sections.unshift('#hero');
      
      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
          
          if (visibleHeight > window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed w-full z-50">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 h-0.5 bg-accent w-full overflow-hidden">
        <div
          className="h-full bg-accent"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav className="glassmorphism mx-auto my-4 p-4 rounded-full max-w-5xl backdrop-blur-md transition-all duration-300 shadow-glass">
        <div className="flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-tight flex items-center">
            <div className="bg-gradient-to-r from-[#0d1523] to-[#0f172a] text-white p-2 rounded-lg shadow-glow-sm transform transition-all duration-300 hover:shadow-glow-md hover:scale-105">
              <span className="text-gradient gradient-to-r from-[#bcbcbc] to-[#0f172a] text-white">AG</span>
            </div>
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-lg transition-all duration-300',
                  'hover:bg-accent/10',
                  activeSection === item.href
                    ? 'text-accent font-medium'
                    : 'text-foreground'
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent/10"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <div
          className={cn(
            'md:hidden absolute left-0 right-0 px-4 py-2 mt-2 mx-4 rounded-3xl glassmorphism backdrop-blur-lg transition-all duration-300 overflow-hidden',
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="flex flex-col py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-3 rounded-lg transition-all duration-300',
                  activeSection === item.href
                    ? 'bg-accent/10 text-accent font-medium'
                    : 'hover:bg-secondary/30'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
