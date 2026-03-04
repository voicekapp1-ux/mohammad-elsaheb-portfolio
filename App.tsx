import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import BottomTabBar from './components/BottomTabBar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import { trackPageView, trackConversion } from './utils/analytics';

function App() {
  const [currentView, setCurrentView] = useState<'portfolio' | 'dashboard'>('portfolio');

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#dashboard') {
      setCurrentView('dashboard');
    } else {
      setCurrentView('portfolio');
      trackPageView();
    }
    const handleHashChange = () => {
      const newHash = window.location.hash;
      if (newHash === '#dashboard') {
        setCurrentView('dashboard');
      } else {
        setCurrentView('portfolio');
        trackPageView();
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  if (currentView === 'dashboard') {
    return <Dashboard />;
  }

  const handleCVDownload = () => {
    trackConversion('cv_download', { source: 'mobile_banner' });
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-primary selection:bg-accent/30 selection:text-white overflow-x-clip">
      {/* Mobile CV Download Banner */}
      <div className="md:hidden">
        <a
          href="Mohammed-M.-ElSaheb-CV.pdf"
          download="Mohammed El Saheb CV.pdf"
          onClick={handleCVDownload}
          className="relative flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-muted text-white py-2.5 text-xs font-medium transition-colors duration-300 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">download</span>
            Download CV
          </span>
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </a>
      </div>
      <Navbar />
      <main className="pb-0">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BottomTabBar />
    </div>
  );
}

export default App;
