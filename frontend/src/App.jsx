import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleSmoothScroll = (e) => {
      const target = e.target.getAttribute('href');
      if (target && target.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Add event listeners to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // Cleanup event listeners
    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden">
      <Header />
      
      <main className="relative w-full">
        <section id="home" className="scroll-mt-14 xs:scroll-mt-16 lg:scroll-mt-20">
          <Hero />
        </section>
        
        <About />
        
        <section id="experience" className="section-padding bg-surface/30 scroll-mt-14 xs:scroll-mt-16 lg:scroll-mt-20">
          <div className="container">
            <Experience />
          </div>
        </section>
        
        <section id="projects" className="section-padding scroll-mt-14 xs:scroll-mt-16 lg:scroll-mt-20">
          <div className="container">
            <Projects />
          </div>
        </section>
        
        <section id="skills" className="section-padding bg-surface/30 scroll-mt-14 xs:scroll-mt-16 lg:scroll-mt-20">
          <div className="container">
            <Skills />
          </div>
        </section>
        
        <section id="education" className="section-padding scroll-mt-14 xs:scroll-mt-16 lg:scroll-mt-20">
          <div className="container">
            <Education />
          </div>
        </section>
        
        <section id="achievements" className="section-padding bg-surface/30 scroll-mt-14 xs:scroll-mt-16 lg:scroll-mt-20">
          <div className="container">
            <Achievements />
          </div>
        </section>
        
        <section id="contact" className="section-padding scroll-mt-14 xs:scroll-mt-16 lg:scroll-mt-20">
          <div className="container">
            <Contact />
          </div>
        </section>
      </main>
      
      <Footer />
      <ScrollToTop showAfter={400} />
    </div>
  );
}

export default App;
