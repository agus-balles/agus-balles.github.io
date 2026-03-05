import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, Github, GitBranch, Linkedin, FileText } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState('');
  const fullText =
    'WELCOME. I BUILD FULL-STACK PLATFORMS, LINUX INFRASTRUCTURE, AND OPEN-SOURCE TOOLS.';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title scramble animation
      const titleChars = titleRef.current?.querySelectorAll('.char');
      if (titleChars) {
        gsap.fromTo(
          titleChars,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.05,
            stagger: 0.03,
            ease: 'power2.out',
            delay: 0.3,
          }
        );
      }

      // Subtitle fade in
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 1.2, ease: 'power2.out' }
      );

      // Prompt fade in
      gsap.fromTo(
        promptRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 1.5 }
      );
    }, heroRef);

    // Typing effect
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => {
      ctx.revert();
      clearInterval(typingInterval);
    };
  }, []);

  // Split title into characters for animation
  const titleText = 'AGUSTIN_BALLESTEROS';
  const titleChars = titleText.split('').map((char, i) => (
    <span key={i} className="char inline-block">
      {char === '_' ? <span className="text-muted-foreground">_</span> : char}
    </span>
  ));

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden"
    >
      {/* Matrix rain background effect */}
      <MatrixRain />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Status indicator */}
        <div className="flex items-center justify-center gap-2 mb-8 font-mono text-sm text-muted-foreground">
          <span className="w-2 h-2 bg-mint rounded-full animate-pulse" />
          <span>[SYSTEM READY]</span>
          <span className="text-mint/50">|</span>
          <span>UBA_CS_4TH_YEAR</span>
          <span className="text-mint/50">|</span>
          <span>CODING_6+_YEARS</span>
        </div>

        {/* Main title */}
        <h1
          ref={titleRef}
          className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-mint mb-4 glow-text tracking-tight"
        >
          {titleChars}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-mono text-lg sm:text-xl md:text-2xl text-foreground/80 mb-8"
        >
          <span className="text-mint">FULLSTACK_DEV</span>
          <span className="text-muted-foreground"> // </span>
          <span>SYSTEMS_ADMIN</span>
          <span className="text-muted-foreground"> // </span>
          <span className="text-cyber-blue">OPEN_SOURCE</span>
        </p>

        {/* Command prompt */}
        <div
          ref={promptRef}
          className="font-mono text-sm sm:text-base text-muted-foreground mb-12"
        >
          <span className="text-mint">{'>'}</span>{' '}
          <span className="typing-cursor">{typedText}</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="group relative px-8 py-3 bg-mint text-void font-mono font-medium rounded-sm overflow-hidden transition-all hover:shadow-glow"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="relative z-10">[ VIEW_PROJECTS ]</span>
            <div className="absolute inset-0 bg-mint-dark transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </a>
          
          <a
            href="https://github.com/agus-balles"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-border text-muted-foreground font-mono text-sm rounded-sm hover:border-mint hover:text-mint transition-all"
          >
            <Github className="w-4 h-4" />
            <span>github.com/agus-balles</span>
          </a>
        </div>

        {/* Quick stats */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-mint" />
            <span>FULLSTACK_DEV_2025_2026</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 flex items-center justify-center text-mint">#</span>
            <span>SYSADMIN_2022_2025</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 flex items-center justify-center text-mint">~</span>
            <span>EN_ES_BILINGUAL</span>
          </div>
        </div>

        {/* Profile/CV buttons */}
        <div className="flex items-center justify-center gap-5 mt-14 sm:mt-16">
          <a
            href="https://linkedin.com/in/agustin-ballesteros-agus-balles"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            aria-label="LinkedIn profile"
            className="terminal-window group relative flex h-14 w-14 items-center justify-center rounded-sm border border-mint/45 bg-void/80 text-mint/90 shadow-[0_0_14px_rgba(0,255,157,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:border-mint hover:text-mint-light hover:shadow-[0_0_28px_rgba(0,255,157,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60"
          >
            <Linkedin className="h-5 w-5" />
          </a>

          <a
            href="mailto:agustinballesteros04@gmail.com?subject=CV%20request%20(Spanish)"
            title="Request CV Spanish"
            aria-label="Request CV in Spanish by email"
            className="terminal-window group relative flex h-14 w-14 items-center justify-center rounded-sm border border-cyber-blue/45 bg-void/80 text-cyber-blue shadow-[0_0_14px_rgba(0,204,255,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:border-cyber-blue hover:text-cyber-blue hover:shadow-[0_0_28px_rgba(0,204,255,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-blue/60"
          >
            <FileText className="h-5 w-5" />
            <span className="absolute bottom-1 right-1 font-mono text-[9px] leading-none tracking-wider text-cyber-blue/90">
              ES
            </span>
          </a>

          <a
            href="mailto:agustinballesteros04@gmail.com?subject=CV%20request%20(English)"
            title="Request CV English"
            aria-label="Request CV in English by email"
            className="terminal-window group relative flex h-14 w-14 items-center justify-center rounded-sm border border-mint/45 bg-void/80 text-mint/90 shadow-[0_0_14px_rgba(0,255,157,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:border-mint hover:text-mint-light hover:shadow-[0_0_28px_rgba(0,255,157,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60"
          >
            <FileText className="h-5 w-5" />
            <span className="absolute bottom-1 right-1 font-mono text-[9px] leading-none tracking-wider text-mint/90">
              EN
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="font-mono text-xs">SCROLL_DOWN</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-20 left-4 font-mono text-xs text-muted-foreground/30 hidden sm:block">
        <div>// INIT_SEQUENCE</div>
        <div>// LOADING_MODULES...</div>
        <div>// OK</div>
      </div>
      
      <div className="absolute top-20 right-4 font-mono text-xs text-muted-foreground/30 text-right hidden sm:block">
        <div>UNIVERSIDAD DE</div>
        <div>BUENOS AIRES</div>
        <div>COMPUTER SCIENCE</div>
        <div>MSc/LSc</div>
      </div>
    </section>
  );
};

// Matrix rain background component
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Matrix characters - using code-related symbols
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');
    
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    let animationId: number;
    let frameCount = 0;

    const draw = () => {
      frameCount++;
      // Render every 2nd frame for performance (30fps)
      if (frameCount % 2 !== 0) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(0, 255, 157, 0.15)';
      ctx.font = `${fontSize}px JetBrains Mono`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
};

export default Hero;
