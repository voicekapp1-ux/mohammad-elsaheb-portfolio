import React, { useState } from 'react';
import { EducationItem, CertificationItem } from '../types';

const educationData: EducationItem[] = [
  {
    id: 'bba',
    degree: 'Bachelor of Business Administration - Management Information Systems',
    institution: 'Al Yamamah University',
    year: 'Graduated 2013',
    color: 'bg-accent'
  }
];

const certificationData: CertificationItem[] = [
  { id: '1', title: 'Product-led Certification', issuer: 'Pendo.io (2025)' },
  { id: '2', title: 'Generative AI Overview for Project Managers', issuer: 'PMI (2025)' },
  { id: '3', title: 'Arabian Agile Essentials Certification', issuer: 'Arabian Agile Professionals (2025)' },
  { id: '4', title: 'McKinsey Forward Program', issuer: 'McKinsey (2024)' },
  { id: '5', title: 'Kickoff Agile', issuer: 'PMI (2024)' },
  { id: '6', title: 'User Experience Design Fundamentals', issuer: 'IBM (2024)' },
  { id: '7', title: 'Fundamentals of Agile Project Management', issuer: 'PMI (2024)' },
  { id: '8', title: 'Project Management Fundamentals', issuer: 'IBM (2024)' },
  { id: '9', title: 'Planning and Creating Pro Roadmaps', issuer: 'Productboard Academy (2023)' },
  { id: '10', title: 'Master Course in Business Analysis', issuer: 'Udemy (2023)' },
  { id: '11', title: 'Product Management Framework and Methodology', issuer: 'Udemy (2023)' },
  { id: '12', title: 'Jira and Confluence Fundamentals', issuer: 'Atlassian University (2022)' },
  
  { id: '13', title: 'Oracle Eloqua Certification', issuer: 'Oracle (2021)' },
  { id: '14', title: 'Lean Six Sigma White Belt', issuer: 'Aveta Business Institute (2021)' },
  { id: '15', title: 'Digital Marketing', issuer: 'Google (2020)' },
];

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const VISIBLE = 12;

const Education: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? certificationData : certificationData.slice(0, VISIBLE);
  const remaining = certificationData.length - VISIBLE;

  return (
    <section id="education" className="py-12 md:py-16 px-6 bg-bg-elevated">
      <div className="max-w-[1100px] mx-auto">

        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Education</p>
          <h2 className="text-3xl font-bold text-text-primary mb-8">Academic Background</h2>
          {educationData.map((item) => (
            <div key={item.id} className="pl-5 border-l-2 border-accent">
              <p className="font-bold text-text-primary text-base leading-snug">{item.degree}</p>
              <p className="text-accent text-sm mt-1 font-medium">{item.institution}</p>
              <p className="text-text-muted text-sm mt-0.5">{item.year}</p>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Credentials</p>
          <h2 className="text-3xl font-bold text-text-primary">Certifications</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visible.map((cert) => (
            <div key={cert.id} className="bg-bg-card border border-border rounded-xl p-4 flex items-start gap-3">
              <span className="text-accent mt-0.5 flex-shrink-0"><CheckIcon /></span>
              <div>
                <p className="text-text-primary text-sm font-semibold leading-snug">{cert.title}</p>
                <p className="text-text-muted text-xs mt-1">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>

        {remaining > 0 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-6 text-sm text-text-muted hover:text-text-primary flex items-center gap-1 transition-colors"
          >
            <span>{showAll ? 'Show less' : 'Show more'}</span>
          </button>
        )}

      </div>
    </section>
  );
};

export default Education;
