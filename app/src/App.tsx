import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return;
    }

    // Initialize scroll-triggered animations
    const ctx = gsap.context(() => {
      // Animate sections on scroll
      const sections = document.querySelectorAll('.animate-section');
      
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { 
            opacity: 0, 
            y: 50 
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-void text-foreground overflow-x-hidden">
      {/* Custom cursor - hidden on mobile */}
      <CustomCursor />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      
      {/* Background grid pattern */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />
      
      {/* Noise overlay */}
      <div className="fixed inset-0 noise-overlay pointer-events-none z-[1]" />
    </div>
  );
}

export default App;
