import React, { useState } from 'react';
import { trackConversion, trackEngagement } from '../utils/analytics';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [emailError, setEmailError] = useState('');
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData({...formData, email});

    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setFormStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/mkozglkn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await trackConversion('contact_form_submit', {
          status: 'success',
          sender_name: formData.name,
          sender_email: formData.email,
          message: formData.message
        });
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        await trackConversion('contact_form_submit', {
          status: 'error',
          sender_name: formData.name,
          sender_email: formData.email,
          message: formData.message
        });
        setFormStatus('error');
      }
    } catch {
      await trackConversion('contact_form_submit', {
        status: 'error',
        sender_name: formData.name,
        sender_email: formData.email,
        message: formData.message
      });
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" className="py-8 md:py-12 px-6 bg-bg-base">
      <div className="max-w-[960px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-medium uppercase tracking-wider text-accent mb-3">Contact</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary">Let's Work Together</h2>
        </div>

        <div className="bg-bg-surface rounded-2xl overflow-hidden border border-border-subtle">
          <div className="flex flex-col lg:flex-row">
            {/* Form */}
            <div className="lg:w-1/2 p-6 md:p-10">
              {formStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                  <div className="size-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-green-400 text-3xl">check_circle</span>
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Message Sent!</h3>
                  <p className="text-sm text-text-secondary mb-6">Thank you for reaching out. I'll get back to you soon.</p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="text-accent hover:text-accent-muted text-sm font-medium transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  {formStatus === 'error' && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">error</span>
                        <span>Something went wrong. Please try again or email me directly.</span>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-text-muted uppercase tracking-wider">Name</label>
                      <input
                        className="w-full bg-bg-base border-border-subtle rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent text-text-primary px-4 py-3.5 text-sm border outline-none transition-all placeholder:text-text-muted"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        disabled={formStatus === 'submitting'}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-text-muted uppercase tracking-wider">Email</label>
                      <input
                        className={`w-full bg-bg-base rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent text-text-primary px-4 py-3.5 text-sm border outline-none transition-all placeholder:text-text-muted ${
                          emailError ? 'border-red-500/50 focus:border-red-500' : 'border-border-subtle'
                        }`}
                        type="email"
                        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleEmailChange}
                        onBlur={(e) => {
                          if (e.target.value && !validateEmail(e.target.value)) {
                            setEmailError('Please enter a valid email address');
                          }
                        }}
                        disabled={formStatus === 'submitting'}
                        required
                      />
                      {emailError && (
                        <p className="text-xs text-red-400 mt-1">{emailError}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-text-muted uppercase tracking-wider">Message</label>
                    <textarea
                      className="w-full bg-bg-base border-border-subtle rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent text-text-primary px-4 py-3.5 text-sm border outline-none transition-all placeholder:text-text-muted resize-none"
                      rows={5}
                      placeholder="How can I help you?"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      disabled={formStatus === 'submitting'}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-accent hover:bg-accent-muted disabled:bg-accent/50 disabled:cursor-not-allowed text-white font-medium py-4 rounded-lg text-sm transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                        <span>Sending...</span>
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:w-1/2 bg-bg-elevated p-6 md:p-10 border-t lg:border-t-0 lg:border-l border-border-subtle">
              <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-8">Contact Information</h3>

              <div className="space-y-5">
                <a
                              href="tel:+962792001771"
                  className="flex items-center gap-4 group"
                  onClick={() => trackEngagement('contact_phone_click')}
                >
                  <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-xl">call</span>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-0.5">Phone</p>
                                  <p className="text-sm text-text-primary">+962 79 200 1771</p>
                  </div>
                </a>

                <a
                              href="mailto:mohammed_alsaheb@hotmail.com"
                  className="flex items-center gap-4 group"
                  onClick={() => trackEngagement('contact_email_click')}
                >
                  <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-0.5">Email</p>
                                  <p className="text-sm text-text-primary">mohammed_alsaheb@hotmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <span className="material-symbols-outlined text-xl">location_on</span>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-0.5">Location</p>
                                  <p className="text-sm text-text-primary">Amman, Jordan</p>
                  </div>
                </div>

                <hr className="border-border-subtle my-6"/>

                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-4">Connect</p>
                  <div className="flex gap-3">
                    <a
                                  href="mailto:mohammed_alsaheb@hotmail.com"
                      className="size-11 rounded-xl bg-bg-surface border border-border-subtle flex items-center justify-center text-text-secondary hover:bg-accent hover:border-accent hover:text-white transition-all duration-300"
                      title="Email"
                      onClick={() => trackEngagement('contact_email_click')}
                    >
                      <span className="material-symbols-outlined text-lg">mail</span>
                    </a>
                    <a
                                  href="tel:+962792001771"
                      className="size-11 rounded-xl bg-bg-surface border border-border-subtle flex items-center justify-center text-text-secondary hover:bg-accent hover:border-accent hover:text-white transition-all duration-300"
                      title="Call"
                      onClick={() => trackEngagement('contact_phone_click')}
                    >
                      <span className="material-symbols-outlined text-lg">call</span>
                    </a>
                    <a
                                  href="https://wa.me/962792001771"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="size-11 rounded-xl bg-bg-surface border border-border-subtle flex items-center justify-center text-text-secondary hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all duration-300"
                      title="WhatsApp"
                      onClick={() => trackEngagement('contact_whatsapp_click')}
                    >
                      <svg className="size-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </a>
                    <a
                                  href="https://www.linkedin.com/in/mohammad-m-elsahib-98282940"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="size-11 rounded-xl bg-bg-surface border border-border-subtle flex items-center justify-center text-text-secondary hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-all duration-300"
                      title="LinkedIn"
                      onClick={() => trackEngagement('contact_linkedin_click')}
                    >
                      <svg className="size-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                    </a>
                    <a
                                          href="https://github.com/voicekapp1-ux"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="size-11 rounded-xl bg-bg-surface border border-border-subtle flex items-center justify-center text-text-secondary hover:bg-text-muted hover:border-text-muted hover:text-white transition-all duration-300"
                      title="GitHub"
                      onClick={() => trackEngagement('contact_github_click')}
                    >
                      <svg className="size-5 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
