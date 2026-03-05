import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import BottomTabBar from './components/BottomTabBar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { trackPageView, trackConversion } from './utils/analytics';

function App() {
  useEffect(() => {
    trackPageView();
  }, []);

  const handleCVDownload = () => {
    trackConversion('cv_download', { source: 'mobile_banner' });
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-primary selection:bg-accent/30 selection:text-white overflow-x-clip">
      {/* Mobile CV Download Banner */}
      <div className="md:hidden">
        <a
          href="Mohammed M. ElSaheb CV - 19.0.pdf"
          download
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
                <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BottomTabBar />
    </div>
  );
}

export default App;
