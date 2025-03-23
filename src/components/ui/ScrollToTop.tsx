
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } fixed bottom-8 right-8 p-3 rounded-full bg-accent text-white shadow-glow-md
      transition-all duration-300 ease-in-out z-50 focus:outline-none focus:ring-2 focus:ring-offset-2
      focus:ring-accent glassmorphism hover:shadow-glow-lg`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTop;
