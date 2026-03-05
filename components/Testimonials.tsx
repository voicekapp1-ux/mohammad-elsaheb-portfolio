import React, { useRef, useEffect, useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Abrar Hasaan',
    title: 'Director of Sales and Account Management',
    company: 'Classera',
    linkedin: 'https://www.linkedin.com/in/abrar-hasaan',
    initials: 'AH',
    color: 'bg-blue-500/20 text-blue-400',
    text: 'I had the opportunity to work closely with Mohammad in his role as Product Owner for C-Pay, where he played a key role in translating complex business requirements into clear, actionable technical solutions. He has a strong ability to bridge business needs with development teams, while maintaining clear product vision and priorities throughout the product lifecycle. Mohammad is a reliable and well-rounded Product Owner who combines professional excellence, human leadership, and strong execution. I highly recommend him to any organization looking for a thoughtful and impactful product leader.',
  },
  {
    id: 2,
    name: 'Saeed Halawani',
    title: 'Product Owner | CSPO® | AI Product Manager | Agile Product Strategist',
    company: 'ZainCash.jo',
    linkedin: 'https://www.linkedin.com/in/saeed-halawani',
    initials: 'SH',
    color: 'bg-purple-500/20 text-purple-400',
    text: 'I had the pleasure of working closely with Mohammad, where his strategic product thinking consistently elevated company work from execution to true business impact. Mohammad has a rare ability to take complex stakeholder needs and market dynamics and distill them into clear, actionable product direction, without losing sight of either the business objectives or the user experience. Mohammad is the kind of product leader who builds trust through consistency, clarity, and depth of thinking. I would confidently recommend Mohammad for any senior product role where strategic vision, cross-functional leadership, and calm, deliberate decision-making are valued.',
  },
  {
    id: 3,
    name: 'Ahmad Ghawanmeh',
    title: 'Sr. Affiliate Manager & Team Lead | Performance Marketing',
    company: 'DigiZag',
    linkedin: 'https://www.linkedin.com/in/ahmad-ghawanmeh',
    initials: 'AG',
    color: 'bg-green-500/20 text-green-400',
    text: 'Mohammad is one of the hardest working and most driven professionals I know. His work ethic is exceptional. He commits fully to everything he does and consistently delivers excellence, no matter how complex the challenge or tight the deadline. Mohammad doesn\'t just do his job, he excels at it. He has real passion for what he does and pushes himself and his team to achieve more. I recommend Mohammad without hesitation. Any organization would be lucky to have someone with his combination of work ethic, technical competence, and collaborative spirit on their team.',
  },
  {
    id: 4,
    name: 'Hasan Jaber, RMUC, RUP',
    title: 'Business Analysis Team Leader',
    company: 'Classera',
    linkedin: 'https://www.linkedin.com/in/hasan-jaber',
    initials: 'HJ',
    color: 'bg-orange-500/20 text-orange-400',
    text: 'Mohammad is very passionate and he always has a great vision for his work. His focus keeps everything moving smoothly, he makes sure all the deadlines are met along with the highest standards. I can state with confidence that he is a motivated, creative, hard worker and responsible person. His performance working at the business/product department at Classera proved that he will be a truly valuable addition to any workplace.',
  },
];

const Testimonials: React.FC = () => {
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
    <section ref={sectionRef} id="testimonials" className={`py-6 md:py-12 px-6 bg-bg-elevated transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="max-w-[960px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="lg:w-1/3">
            <p className="text-xs font-medium uppercase tracking-wider text-accent mb-3">Testimonials</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-text-primary leading-tight">
              What People Say
            </h2>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed">
              Real recommendations from colleagues and managers on LinkedIn.
            </p>
            <a
              href="https://www.linkedin.com/in/mohammad-m-elsahib-98282940/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent text-xs font-medium hover:bg-accent/20 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">open_in_new</span>
              View on LinkedIn
            </a>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 gap-5">
            {testimonials.map((t) => (
              <div key={t.id} className="relative p-6 rounded-2xl bg-bg-surface border border-border-subtle hover-lift">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-semibold text-sm ${t.color}`}>
                    {t.initials}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">{t.name}</p>
                    <p className="text-xs text-text-muted">{t.title} &bull; {t.company}</p>
                  </div>
                  <span className="material-symbols-outlined text-accent/20 text-4xl flex-shrink-0">format_quote</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
