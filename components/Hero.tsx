import React from 'react';
import profileImage from '../Mohammed elsaheb - Profile Photo.png';
import { trackConversion } from '../utils/analytics';

const Hero: React.FC = () => {
  const handleGetInTouchClick = () => {
    trackConversion('get_in_touch_click');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCVDownload = () => {
    trackConversion('cv_download', { source: 'hero' });
  };

  return (
    <section className="relative flex items-center py-4 md:pt-24 md:py-16 px-6">
      <div className="max-w-[960px] mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Profile Image */}
          <div className="flex-shrink-0 order-1 md:order-2">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 group">
              <div className="absolute inset-0 rounded-full border border-border-subtle scale-[1.08] opacity-50"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border border-border-subtle bg-bg-elevated transition-transform duration-300 group-hover:scale-105">
                <img
                  alt="Mohammad El Saheb"
                  className="w-full h-full object-cover object-center"
                  src={profileImage}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            <div className="space-y-5">
              <div className="inline-block text-accent text-xs font-medium uppercase tracking-wider">
                <span className="inline-block text-accent text-xs font-medium uppercase tracking-wider">Senior Technical Product Manager</span>
              </div>
              
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-text-primary">
                Mohammad El Saheb
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-text-secondary max-w-lg mx-auto md:mx-0">
                13 years driving product strategy across MarTech, AdTech, EdTech &amp; SaaS. +40% user engagement, -25% dev cycles, enterprise solutions across MENA &amp; US markets.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-8">
              <button
                onClick={handleGetInTouchClick}
                className="inline-flex items-center gap-2.5 bg-accent hover:bg-accent-muted text-white font-medium px-6 py-3.5 rounded-lg text-sm transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <span>Get in Touch</span>
              </button>
              <a
                href="Mohammed M. ElSaheb CV - 19.0.pdf"
                download
                onClick={handleCVDownload}
                className="inline-flex items-center gap-2 text-text-secondary hover:text-accent text-sm font-medium transition-colors duration-300 py-3"
              >
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
