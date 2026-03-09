import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Server, Package, Cpu } from 'lucide-react';
import TerminalWindow from '../components/TerminalWindow';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text scramble effect for heading
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

      // Content reveal
      const contentElements = contentRef.current?.querySelectorAll('.reveal-item');
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const systemSpecs = [
    { label: 'OS', value: 'Arch Linux', icon: Terminal },
    { label: 'SHELL', value: 'Fish', icon: Cpu },
    { label: 'EDITOR', value: 'Neovim', icon: Package },
    { label: 'STATUS', value: 'AVAILABLE', icon: Server },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="section-heading mb-12">
          <span className="font-mono text-mint text-sm mb-2 block">// SECTION_01</span>
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            <span className="text-mint">{'>'}</span> ABOUT_ME
          </h2>
        </div>

        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column - Bio */}
          <div className="space-y-6">
            <TerminalWindow
              className="reveal-item"
              contentClassName="p-6 font-mono text-sm space-y-4 text-muted-foreground leading-relaxed break-words"
              title="bio.txt"
            >
              <>
                <p>
                  <span className="text-mint">$</span> cat about_me.txt
                </p>
                <p>
                  I am a fourth-year Computer Science student at{' '}
                  <span className="text-foreground">UBA (Universidad de Buenos Aires)</span>,
                  currently pursuing the <span className="text-mint">MSc/LSc</span> track. I have
                  been coding since I was 15 and have built projects in Python, Java, C#, Rust,
                  and C.
                </p>
                <p>
                  I worked as a <span className="text-cyber-blue">Full-stack Developer</span>{' '}
                  (06/2025 - January 2026), where I designed and built a multi-tenant web platform for
                  martial arts school federations using Python, Django, PostgreSQL, JavaScript,
                  and Bootstrap.
                </p>
                <p>
                  Before that, I worked as a Systems and Network Administrator for a law firm
                  (02/2022 - 01/2025), maintaining network infrastructure, server operations, and
                  web services.
                </p>
                <p>
                  Outside work and university, I contribute to open source, maintain Arch Linux
                  packaging workflows, and keep building self-hosted projects with a focus on
                  reliability and clean architecture.
                </p>
              </>
            </TerminalWindow>

            {/* Education */}
            <TerminalWindow
              className="reveal-item"
              contentClassName="p-6 font-mono text-sm"
              title="education.json"
            >
              <div>
                <pre className="text-muted-foreground overflow-x-auto whitespace-pre-wrap break-words sm:whitespace-pre sm:break-normal">
{`{
  "degrees": [
    {
      "degree": "BSc in Computer Science",
      "institution": "Universidad de Buenos Aires",
      "period": "06/2022 - 06/2025",
      "status": "Completed"
    },
    {
      "degree": "MSc/LSc in Computer Science",
      "institution": "Universidad de Buenos Aires",
      "period": "06/2022 - 06/2027",
      "status": "Fourth Year Student"
    }
  ],
  "previous_education": [
    "Economic Sciences - Bartolome Mitre Day School 
                (01/2017 - 11/2022, average: 9/10)"
  ],
  "focus": [
    "Backend Architecture",
    "Systems and Networking",
    "Open Source",
    "Linux Infrastructure"
  ]
}`}
                </pre>
              </div>
            </TerminalWindow>
          </div>

          {/* Right column - System specs */}
          <div className="space-y-6">
            <div className="reveal-item">
              <h3 className="font-mono text-lg text-foreground mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-mint" />
                SYSTEM_SPECS
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {systemSpecs.map((spec, index) => (
                  <div
                    key={spec.label}
                    className="terminal-window p-4 card-lift"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <spec.icon className="w-4 h-4 text-mint" />
                      <span className="font-mono text-xs text-muted-foreground">
                        {spec.label}
                      </span>
                    </div>
                    <span className="font-mono text-sm text-foreground font-medium">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience highlights */}
            <TerminalWindow
              className="reveal-item"
              contentClassName="p-6 space-y-4 font-mono text-sm"
              title="experience.log"
            >
              <>
                <div className="flex items-start gap-3">
                  <span className="text-mint mt-1">{'>'}</span>
                  <div>
                    <p className="text-foreground">Full-stack Developer</p>
                    <p className="text-muted-foreground text-xs">
                      Built a multi-tenant federation platform with Django, PostgreSQL, JavaScript,
                      and Bootstrap (06/2025 - January 2026)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-mint mt-1">{'>'}</span>
                  <div>
                    <p className="text-foreground">Systems and Network Administrator</p>
                    <p className="text-muted-foreground text-xs">
                      Managed a law firm&apos;s network infrastructure and website operations
                      (02/2022 - 01/2025)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-mint mt-1">{'>'}</span>
                  <div>
                    <p className="text-foreground">Open Source Contributor (Kew)</p>
                    <p className="text-muted-foreground text-xs">
                      Contributed to early development of the Kew CLI music player (2.5k+ stars)
                      and maintained Arch Linux packaging/distribution
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-mint mt-1">{'>'}</span>
                  <div>
                    <p className="text-foreground">Linux Systems Management</p>
                    <p className="text-muted-foreground text-xs">
                      6+ years working with Linux infrastructure, self-hosting, containers,
                      web security, and AWS deployments
                    </p>
                  </div>
                </div>
              </>
            </TerminalWindow>

            {/* Philosophy quote */}
            <div className="reveal-item border-l-2 border-mint pl-4 py-2">
              <p className="font-mono text-sm text-muted-foreground italic">
                &ldquo;I enjoy building software that is practical for users and rigorous under the hood.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
