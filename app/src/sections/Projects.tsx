import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Github, 
  ExternalLink, 
  Star, 
  GitFork, 
  Terminal,
  Film,
  Download,
  Workflow,
  Code2
} from 'lucide-react';
import TerminalWindow from '../components/TerminalWindow';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  status: string;
  type: string;
  url: string;
  icon: React.ElementType;
  tags: string[];
}

const projects: Project[] = [
  {
    name: 'Kew',
    description: 'Contributed to early development of the Kew terminal music player and handled Arch Linux packaging/distribution workflows.',
    language: 'C',
    languageColor: '#555555',
    stars: 2525,
    forks: 86,
    status: 'maintained',
    type: 'open_source_contribution',
    url: 'https://github.com/ravachol/kew',
    icon: Terminal,
    tags: ['cli', 'open-source', 'archlinux', 'packaging'],
  },
  {
    name: 'Anime-cli-es',
    description: 'CLI for searching, watching, and downloading Spanish-subbed anime from AnimeFLV, with provider selection and mpv/yt-dlp integration.',
    language: 'Python',
    languageColor: '#3776AB',
    stars: 3,
    forks: 0,
    status: 'stable',
    type: 'open_source_project',
    url: 'https://github.com/agus-balles/Anime-cli-es',
    icon: Film,
    tags: ['cli', 'scraping', 'mpv', 'yt-dlp', 'python'],
  },
  {
    name: 'multdownload',
    description: 'Python downloader that splits files into HTTP byte ranges and merges parts locally to improve throughput on bandwidth-constrained servers.',
    language: 'Python',
    languageColor: '#3776AB',
    stars: 0,
    forks: 0,
    status: 'completed',
    type: 'networking_utility',
    url: 'https://github.com/agus-balles/multdownload',
    icon: Download,
    tags: ['python', 'networking', 'range-requests', 'download'],
  },
  {
    name: 'aur-repos',
    description: 'AUR packaging repo with a scheduled GitHub Actions pipeline that checks upstream releases, updates PKGBUILD/.SRCINFO/checksums, and syncs changes to AUR package repositories.',
    language: 'Shell',
    languageColor: '#89E051',
    stars: 1,
    forks: 0,
    status: 'active',
    type: 'ci_cd_automation',
    url: 'https://github.com/agus-balles/aur-repos',
    icon: Workflow,
    tags: ['aur', 'github-actions', 'ci-cd', 'packaging', 'shell'],
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="section-heading mb-12">
          <span className="font-mono text-mint text-sm mb-2 block">// SECTION_02</span>
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            <span className="text-mint">{'>'}</span> SELECT * FROM PROJECTS
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Open-source and automation projects from my GitHub, plus my contribution work on Kew.
            These focus on CLI tooling, download/network utilities, and packaging workflows.
          </p>
        </div>

        {/* Projects grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>

        {/* View all link */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/agus-balles?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-muted-foreground font-mono text-sm rounded-sm hover:border-mint hover:text-mint transition-all group"
          >
            <Github className="w-4 h-4" />
            <span>VIEW_ALL_REPOSITORIES</span>
            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <TerminalWindow
      className="project-card"
      contentClassName="p-6"
      expandedContainerClassName="max-w-3xl"
      title={
        <>
          <project.icon className="w-3 h-3" />
          {project.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.md
        </>
      }
      expandedContent={
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h3 className="font-mono text-2xl sm:text-3xl font-semibold text-foreground">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                {project.description}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {project.stars}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-4 h-4" />
                {project.forks}
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="terminal-window p-4">
              <p className="font-mono text-xs text-muted-foreground mb-3">project.meta</p>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: project.languageColor }}
                  />
                  <span className="text-foreground">{project.language}</span>
                </div>
                <p className="text-muted-foreground">status: {project.status}</p>
                <p className="text-muted-foreground">type: {project.type}</p>
              </div>
            </div>

            <div className="terminal-window p-4">
              <p className="font-mono text-xs text-muted-foreground mb-3">tags</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-mono bg-muted text-muted-foreground rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
            <p className="font-mono text-xs text-muted-foreground">
              Press <span className="text-foreground">Esc</span> to close
            </p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-border text-muted-foreground font-mono text-sm rounded-sm hover:border-mint hover:text-mint transition-all"
            >
              <Code2 className="w-4 h-4" />
              <span>OPEN_LINK</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      }
    >
      <div>
        {/* Title and stats */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-mono text-lg font-semibold text-foreground group-hover:text-mint transition-colors">
            {project.name}
          </h3>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              {project.stars}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="w-3 h-3" />
              {project.forks}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-mono bg-muted text-muted-foreground rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          {/* Language */}
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: project.languageColor }}
            />
            <span className="text-xs font-mono text-muted-foreground">
              {project.language}
            </span>
          </div>

          {/* Links */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-mint transition-colors"
          >
            <Code2 className="w-4 h-4" />
            <span>source</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </TerminalWindow>
  );
};

export default Projects;
