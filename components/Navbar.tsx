import React, { useState, useEffect } from 'react';
import { trackNavigation, trackConversion, trackEvent } from '../utils/analytics';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');

  const navItems = ['About', 'Experience', 'Skills', 'Education', 'Contact'];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navItems.forEach((item) => {
      const element = document.getElementById(item.toLowerCase());
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    trackNavigation(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCVDownload = () => {
    trackConversion('cv_download', { source: 'navbar' });
  };

  const handleLogoClick = () => {
    trackEvent('nav_logo_click', 'navigation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 w-full z-50 glass-nav">
      <div className="max-w-[960px] mx-auto">
        {/* Main Nav Bar */}
        <div className="flex items-center justify-center md:justify-between px-4 md:px-6 h-12 md:h-16">
          {/* Logo - hidden on mobile */}
          <button
            onClick={handleLogoClick}
            className="hidden md:block text-lg font-semibold text-text-primary hover:text-accent transition-colors duration-300"
          >
            Mohammad M. Elsaheb
          </button>
          {/* Nav items - centered on mobile, right-aligned on desktop */}
          <div className="flex items-center gap-6 md:gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-xs md:text-sm transition-colors duration-300 ${
                  activeSection === item.toLowerCase()
                    ? 'text-accent font-medium'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {item}
              </button>
            ))}
            <a
              href="Mohammed M. ElSaheb CV - 19.0.pdf"
              download
              onClick={handleCVDownload}
              className="hidden md:flex items-center gap-1.5 bg-accent hover:bg-accent-muted text-white px-3 py-1.5 rounded text-xs font-medium transition-colors duration-300"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              Download CV
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
