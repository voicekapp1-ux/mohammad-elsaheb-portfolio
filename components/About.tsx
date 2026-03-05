import React, { useRef, useEffect, useState } from 'react';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className={`py-6 nd:py-12 px-6 bg-bg-base transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="max-w-[960px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          {/* Left column */}
          <div className="w-full md:w-1/3">
            <p className="text-xs font-medium uppercase tracking-wider text-accent mb-3">About</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-text-primary leading-tight">
              Background &amp; Expertise
            </h2>
          </div>

          {/* Right column */}
          <div className="w-full md:w-2/3 space-y-5">
            <div className="space-y-5">
              <p className="text-base leading-relaxed text-text-secondary">
                I am a Senior Technical Product Manager with 13 years of experience driving product strategy, cross-functional leadership, and measurable business growth across MarTech, AdTech, EdTech, and enterprise SaaS platforms.
              </p>
              <p className="text-base leading-relaxed text-text-secondary">
                With a <span className="text-accent font-medium">BBA</span> in Management Information Systems, I blend analytical rigor with strategic business thinking. I have extensive experience across{' '}
                <span className="text-accent">MarTech</span>,{' '}
                <span className="text-accent">AdTech</span>,{' '}
                <span className="text-accent">EdTech</span>,{' '}
                <span className="text-accent">Payments</span>,{' '}
                <span className="text-accent">SaaS</span>, and{' '}
                <span className="text-accent">Integrations</span>.
              </p>
            </div>

            {/* Info tags */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-surface border border-border-subtle text-sm text-text-secondary">
                Amman, Jordan
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-surface border border-border-subtle text-sm text-text-secondary">
                Arabic (Native), English (Fluent)
              </span>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-6 border-t border-border-subtle">
              <div>
                <h4 className="text-3xl md:text-4xl font-semibold text-accent mb-1">13+</h4>
                <p className="text-xs text-text-muted uppercase tracking-wider">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl md:text-4xl font-semibold text-accent mb-1">50+</h4>
                <p className="text-xs text-text-muted uppercase tracking-wider">Enterprise Clients</p>
              </div>
              <div>
                <h4 className="text-3xl md:text-4xl font-semibold text-accent mb-1">20+</h4>
                <p className="text-xs text-text-muted uppercase tracking-wider">Products Launched</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
