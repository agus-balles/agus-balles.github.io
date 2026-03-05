import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Github, 
  Mail, 
  Send, 
  Terminal,
  MapPin,
  ExternalLink,
  Globe
} from 'lucide-react';
import TerminalWindow from '../components/TerminalWindow';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const formspreeEndpoint = 'https://formspree.io/f/maqdrnjz';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formStartedAt, setFormStartedAt] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      const heading = sectionRef.current?.querySelector('.section-heading');
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
            },
          }
        );
      }

      // Form animation
      const formElements = formRef.current?.querySelectorAll('.form-element');
      if (formElements) {
        gsap.fromTo(
          formElements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Honeypot: bots often fill every field, humans should leave this empty.
    if (formData.website.trim() !== '') {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '', website: '' });
      setFormStartedAt(null);
      return;
    }

    // Basic time-trap: reject unrealistically fast submissions.
    const elapsed = Date.now() - (formStartedAt ?? Date.now());
    if (elapsed < 2000) {
      setSubmitError('Please wait a moment before sending your message.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Could not send your message. Please try again.';
        const data: unknown = await response.json().catch(() => null);
        if (
          data &&
          typeof data === 'object' &&
          'errors' in data &&
          Array.isArray((data as { errors?: unknown[] }).errors) &&
          (data as { errors?: Array<{ message?: unknown }> }).errors?.[0]?.message &&
          typeof (data as { errors?: Array<{ message?: unknown }> }).errors?.[0]?.message === 'string'
        ) {
          errorMessage = (data as { errors: Array<{ message: string }> }).errors[0].message;
        }
        throw new Error(errorMessage);
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '', website: '' });
      setFormStartedAt(null);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Could not send your message. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFormStart = () => {
    if (formStartedAt === null) {
      setFormStartedAt(Date.now());
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Previous work section */}
        <div className="mb-16">
          <span className="font-mono text-mint text-sm mb-1 block">// SECTION_04</span>
          <span className="font-mono text-mint/80 text-xs mb-2 block">// EXPERIENCE_ARCHIVE</span>
          <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            <span className="text-mint">{'>'}</span> PREVIOUS_WORK()
          </h2>
          <p className="mt-4 text-muted-foreground max-w-3xl">
            Summary of recent professional experience and responsibilities before current
            availability.
          </p>

          <div className="mt-6 grid lg:grid-cols-2 gap-6">
            <TerminalWindow title="work_history.log" contentClassName="p-6 font-mono text-sm space-y-4">
              <>
                <div className="flex items-start gap-3">
                  <span className="text-mint mt-1">{'>'}</span>
                  <div>
                    <p className="text-foreground">Full-stack Developer</p>
                    <p className="text-muted-foreground text-xs">
                      06/2025 - January 2026
                    </p>
                    <p className="text-muted-foreground mt-2">
                      Built a multi-tenant platform for martial arts school federations using
                      Python, Django, PostgreSQL, JavaScript, and Bootstrap.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-mint mt-1">{'>'}</span>
                  <div>
                    <p className="text-foreground">Systems and Network Administrator</p>
                    <p className="text-muted-foreground text-xs">
                      02/2022 - 01/2025
                    </p>
                    <p className="text-muted-foreground mt-2">
                      Managed network infrastructure and website operations for a law firm, with
                      focus on uptime, connectivity, and system reliability.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-mint mt-1">{'>'}</span>
                  <div>
                    <p className="text-foreground">Self-hosted Infrastructure and Automation</p>
                    <p className="text-muted-foreground text-xs">
                      Ongoing
                    </p>
                    <p className="text-muted-foreground mt-2">
                      Built and maintained containerized services across self-hosted and cloud
                      environments, including deployment automation, monitoring, and security
                      hardening.
                    </p>
                  </div>
                </div>
              </>
            </TerminalWindow>

            <TerminalWindow title="experience_summary.json" contentClassName="p-6">
              <pre className="font-mono text-sm text-muted-foreground overflow-x-auto whitespace-pre-wrap break-words sm:whitespace-pre sm:break-normal">
{`{
  "professional_roles": 2,
  "last_role_end": "January 2026",
  "domains": [
    "Full-stack development",
    "Linux infrastructure",
    "Networking operations",
    "Open-source workflows"
  ],
  "core_stack": [
    "Python",
    "Django",
    "PostgreSQL",
    "JavaScript",
    "Docker"
  ]
}`}
              </pre>
            </TerminalWindow>
          </div>
        </div>

        {/* Section header */}
        <div className="section-heading mb-12">
          <span className="font-mono text-mint text-sm mb-2 block">// SECTION_05</span>
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            <span className="text-mint">{'>'}</span> SEND_MESSAGE()
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Need help building a platform, improving infrastructure, or collaborating on
            open-source work? Send me a message.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div className="form-element">
            <TerminalWindow title="message.sh" contentClassName="p-6">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-mint/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-mint" />
                  </div>
                  <h3 className="font-mono text-lg text-foreground mb-2">MESSAGE_SENT</h3>
                  <p className="text-sm text-muted-foreground">
                    Thanks for reaching out! I&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setSubmitError(null);
                      setFormStartedAt(null);
                    }}
                    className="mt-4 text-mint font-mono text-sm hover:underline"
                  >
                    SEND_ANOTHER
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  onFocusCapture={handleFormStart}
                  className="space-y-6 relative"
                >
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      width: '1px',
                      height: '1px',
                      padding: 0,
                      margin: '-1px',
                      overflow: 'hidden',
                      clip: 'rect(0 0 0 0)',
                      whiteSpace: 'nowrap',
                      border: 0,
                    }}
                  >
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Name field */}
                  <div className="form-element">
                    <label className="block font-mono text-sm text-muted-foreground mb-2">
                      <span className="text-mint">$</span> NAME=
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-muted border border-border rounded px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-mint focus:outline-none focus:ring-1 focus:ring-mint/30 transition-all"
                      placeholder="Enter your name..."
                    />
                  </div>

                  {/* Email field */}
                  <div className="form-element">
                    <label className="block font-mono text-sm text-muted-foreground mb-2">
                      <span className="text-mint">$</span> EMAIL=
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-muted border border-border rounded px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-mint focus:outline-none focus:ring-1 focus:ring-mint/30 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Message field */}
                  <div className="form-element">
                    <label className="block font-mono text-sm text-muted-foreground mb-2">
                      <span className="text-mint">$</span> MESSAGE=
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-muted border border-border rounded px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-mint focus:outline-none focus:ring-1 focus:ring-mint/30 transition-all resize-none"
                      placeholder="Type your message here..."
                    />
                  </div>

                  {/* Submit button */}
                  <div className="form-element">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group relative px-6 py-3 bg-mint text-void font-mono font-medium rounded overflow-hidden transition-all hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <Terminal className="w-4 h-4 animate-pulse" />
                            TRANSMITTING...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            [ TRANSMIT ]
                          </>
                        )}
                      </span>
                    </button>
                    {submitError && (
                      <p className="mt-3 text-sm font-mono text-red-400">
                        {submitError}
                      </p>
                    )}
                  </div>
                </form>
              )}
            </TerminalWindow>
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            {/* Direct contact */}
            <TerminalWindow
              className="form-element"
              title="contact.info"
              contentClassName="p-6"
            >
              <div className="space-y-4">
                <a
                  href="mailto:agustinballesteros04@gmail.com"
                  className="flex min-w-0 items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors group"
                >
                  <div className="w-10 h-10 bg-mint/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-mint" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-sm text-muted-foreground">EMAIL</p>
                    <p className="font-mono text-sm text-foreground group-hover:text-mint transition-colors break-all">
                      agustinballesteros04@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://github.com/agus-balles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors group"
                >
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Github className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-sm text-muted-foreground">GITHUB</p>
                    <p className="font-mono text-sm text-foreground group-hover:text-mint transition-colors flex items-center gap-1 min-w-0">
                      <span className="break-all">github.com/agus-balles</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </p>
                  </div>
                </a>

                <a
                  href="https://agus-balles.ddns.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors group"
                >
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-cyber-blue" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-sm text-muted-foreground">WEBSITE</p>
                    <p className="font-mono text-sm text-foreground group-hover:text-mint transition-colors flex items-center gap-1 min-w-0">
                      <span className="break-all">agus-balles.ddns.info</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-cyber-blue" />
                  </div>
                  <div>
                    <p className="font-mono text-sm text-muted-foreground">LOCATION</p>
                    <p className="font-mono text-sm text-foreground">
                      Buenos Aires, Argentina
                    </p>
                  </div>
                </div>
              </div>
            </TerminalWindow>

            {/* Quick stats */}
            <TerminalWindow
              className="form-element"
              title="stats.json"
              contentClassName="p-6"
            >
              <pre className="font-mono text-sm text-muted-foreground overflow-x-auto whitespace-pre-wrap break-words sm:whitespace-pre sm:break-normal">
{`{
  "primary_focus": "Full-stack apps + Linux infrastructure",
  "response_time": "< 24h",
  "preferred_contact": "EMAIL",
  "timezone": "GMT-3 (Buenos Aires)",
  "languages": ["Spanish (Native)", "English (C1)"]
}`}
              </pre>
            </TerminalWindow>

            {/* Quote */}
            <div className="form-element border-l-2 border-mint pl-4 py-2">
              <p className="font-mono text-sm text-muted-foreground italic">
                &ldquo;Talk is cheap. Show me the code.&rdquo;
              </p>
              <p className="font-mono text-xs text-muted-foreground mt-1">
                — Linus Torvalds
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
            <Terminal className="w-4 h-4 text-mint" />
            <span>
              Built with <span className="text-mint">React</span> + <span className="text-cyber-blue">TypeScript</span> + <span className="text-foreground">Tailwind</span>
            </span>
          </div>
          
          <div className="font-mono text-xs text-muted-foreground">
            <span className="text-mint">©</span> {new Date().getFullYear()} Agustin Ballesteros
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
