import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Cpu, 
  Terminal, 
  Database, 
  Network, 
  GitBranch, 
  Container,
  Server,
  Code2,
  Package,
  Wrench,
  Workflow,
  Languages,
  GraduationCap,
  Cloud,
  ShieldCheck
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  experience: string;
  category: string;
  icon: React.ElementType;
  color: string;
}

const skills: Skill[] = [
  { name: 'Python', level: 95, experience: '6+ years', category: 'Languages', icon: Code2, color: '#3776AB' },
  { name: 'Java', level: 75, experience: '3+ years', category: 'Languages', icon: Code2, color: '#B07219' },
  { name: 'Rust', level: 68, experience: '2+ years', category: 'Languages', icon: Code2, color: '#DEA584' },
  { name: 'C', level: 68, experience: '2+ years', category: 'Languages', icon: Code2, color: '#555555' },
  { name: 'Linux System Mgmt', level: 95, experience: '6+ years', category: 'Systems', icon: Terminal, color: '#FCC624' },
  { name: 'Network Admin', level: 88, experience: '2022 - 2025', category: 'Systems', icon: Network, color: '#00CCFF' },
  { name: 'Server Admin', level: 88, experience: '2022 - 2025', category: 'Systems', icon: Server, color: '#00FF9D' },
  { name: 'Containers', level: 80, experience: 'Docker deployments', category: 'Systems', icon: Container, color: '#2496ED' },
  { name: 'Cloud Hosting', level: 78, experience: 'AWS + self-hosted', category: 'Systems', icon: Cloud, color: '#FF9900' },
  { name: 'Web Security', level: 76, experience: 'Hardening + ops', category: 'Systems', icon: ShieldCheck, color: '#2DD4BF' },
  { name: 'Django', level: 85, experience: 'Professional use', category: 'Tools', icon: Database, color: '#092E20' },
  { name: 'PostgreSQL', level: 84, experience: 'Professional use', category: 'Tools', icon: Database, color: '#336791' },
  { name: 'Docker', level: 86, experience: 'Build + deploy', category: 'Tools', icon: Container, color: '#2496ED' },
  { name: 'Make', level: 74, experience: 'Automation scripts', category: 'Tools', icon: Wrench, color: '#A855F7' },
  { name: 'GitHub Actions', level: 78, experience: 'CI pipelines', category: 'Tools', icon: Workflow, color: '#2088FF' },
  { name: 'Jenkins', level: 70, experience: 'CI/CD workflows', category: 'Tools', icon: Server, color: '#D24939' },
  { name: 'Git', level: 90, experience: 'Daily workflow', category: 'Tools', icon: GitBranch, color: '#F05032' },
  { name: 'Arch Packaging', level: 85, experience: 'AUR + Kew', category: 'Tools', icon: Package, color: '#1793D1' },
];

const highlights = [
  {
    title: '6+ Years',
    subtitle: 'Linux systems management',
    icon: Terminal,
    colorClass: 'text-mint',
  },
  {
    title: 'BSc in Computer Science',
    subtitle: 'Completed in 06/2025',
    icon: GraduationCap,
    colorClass: 'text-cyber-blue',
  },
  {
    title: 'Bilingual',
    subtitle: 'Spanish + English (C1)',
    icon: Languages,
    colorClass: 'text-mint',
  },
  {
    title: 'MSc/LSc',
    subtitle: '4th year at UBA',
    icon: Cpu,
    colorClass: 'text-cyber-blue',
  },
  {
    title: 'Open Source',
    subtitle: 'Kew + Arch packaging',
    icon: Package,
    colorClass: 'text-mint',
  },
  {
    title: 'Infra Focus',
    subtitle: 'Containers + networking',
    icon: Network,
    colorClass: 'text-cyber-blue',
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

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

      // Skill cards animation
      const skillCards = skillsRef.current?.querySelectorAll('.skill-card');
      if (skillCards) {
        gsap.fromTo(
          skillCards,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: skillsRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Canvas particle network effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    let animationId: number;
    let frameCount = 0;

    const animate = () => {
      frameCount++;
      // Render every 2nd frame for performance
      if (frameCount % 2 !== 0) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 157, 0.3)';
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 255, 157, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Group skills by category
  const categories = ['Languages', 'Systems', 'Tools'];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="section-heading mb-12">
          <span className="font-mono text-mint text-sm mb-2 block">// SECTION_03</span>
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            <span className="text-mint">{'>'}</span> CORE_COMPETENCIES
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            My stack combines professional full-stack development with Linux infrastructure
            management. These skills are based on current work, prior systems roles, and
            open-source contributions.
          </p>
        </div>

        {/* Skills grid */}
        <div ref={skillsRef} className="space-y-12">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="font-mono text-lg text-mint mb-6 flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                {category.toUpperCase()}
              </h3>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <div key={item.title} className="terminal-window p-6 text-center card-lift">
              <item.icon className={`w-8 h-8 mx-auto mb-3 ${item.colorClass}`} />
              <h4 className="font-mono text-foreground font-medium mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillCard = ({ skill }: { skill: Skill }) => {
  return (
    <div className="skill-card terminal-window p-4 card-lift group">
      <div className="flex items-center gap-3 mb-3">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${skill.color}15` }}
        >
          <skill.icon className="w-5 h-5" style={{ color: skill.color }} />
        </div>
        <div>
          <h4 className="font-mono text-sm font-medium text-foreground group-hover:text-mint transition-colors">
            {skill.name}
          </h4>
          <span className="text-xs text-muted-foreground">
            {skill.experience} · {skill.level}%
          </span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="skill-bar h-full rounded-full transition-all duration-1000"
          style={{ 
            backgroundColor: skill.color,
            width: `${skill.level}%`
          }}
        />
      </div>
    </div>
  );
};

export default Skills;
