import React from 'react';
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

const Education: React.FC = () => {
  return (
    <section id="education" className="py-8 md:py-12 px-6 bg-bg-elevated">
      <div className="max-w-[960px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 mb-8">
          <div className="lg:w-1/3">
            <p className="text-xs font-medium uppercase tracking-wider text-accent mb-3">Education</p>
            <h2 className="text-2xl font-bold text-text-primary mb-8">Academic Background</h2>
            {educationData.map((item) => (
              <div key={item.id} className="relative pl-5 border-l-2 border-border">
                <p className="font-semibold text-text-primary text-sm leading-snug">{item.degree}</p>
                <p className="text-accent text-sm mt-1">{item.institution}</p>
                <p className="text-text-muted text-xs mt-0.5">{item.year}</p>
              </div>
            ))}
          </div>
          <div className="lg:w-2/3">
            <p className="text-xs font-medium uppercase tracking-wider text-accent mb-3">Credentials</p>
            <h2 className="text-2xl font-bold text-text-primary mb-8">Certifications</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {certificationData.map((cert) => (
            <div key={cert.id} className="bg-bg-card border border-border rounded-lg p-3 flex items-start gap-2">
              <span className="text-accent mt-0.5 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </span>
              <div>
                <p className="text-text-primary text-xs font-medium leading-snug">{cert.title}</p>
                <p className="text-text-muted text-xs mt-0.5">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
