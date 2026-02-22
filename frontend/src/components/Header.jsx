import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaDownload } from 'react-icons/fa';
import { personalInfo } from '../data/personalInfo';
import logo from '../assets/prince.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavClick = (href) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = personalInfo.resumeUrl;
    link.download = 'Prince_Kumar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/98 backdrop-blur-md shadow-lg border-b border-border/50' 
            : 'bg-background/95 backdrop-blur-md border-b border-border/30'
        }`}
      >
        <nav className="w-full">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 xs:h-16 sm:h-16 lg:h-20">
              
              {/* Logo/Name - Optimized for all screens */}
              <div className="flex-shrink-0 z-50">
                <a 
                  href="#home" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#home');
                  }}
                  className="flex items-center gap-1.5 xs:gap-2 group"
                  aria-label="Go to home section"
                >
                  <img 
                    src={logo} 
                    alt="Prince Kumar Logo" 
                    className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-300"
                  />
                  <span className="text-base xs:text-lg sm:text-xl lg:text-2xl font-heading font-bold text-gradient group-hover:scale-105 transition-transform duration-300">
                    {personalInfo.name.split(' ')[0]}
                    <span className="hidden xs:inline"> {personalInfo.name.split(' ').slice(1).join(' ')}</span>
                  </span>
                </a>
              </div>

              {/* Desktop Navigation - Hidden on mobile/tablet */}
              <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="text-text-secondary hover:text-primary px-3 xl:px-4 py-2 text-sm xl:text-base font-medium transition-all duration-300 relative group rounded-lg hover:bg-surface/50"
                    aria-label={`Go to ${item.name.toLowerCase()} section`}
                  >
                    {item.name}
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/4 rounded-full"></span>
                  </a>
                ))}
              </div>

              {/* Desktop Resume Button */}
              <div className="hidden lg:flex items-center">
                <button
                  onClick={handleResumeDownload}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium px-4 xl:px-5 py-2 xl:py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
                  aria-label="Download resume PDF"
                >
                  <FaDownload className="text-sm" />
                  <span className="text-sm xl:text-base">Resume</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden relative z-50 p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-surface/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <FaTimes className="w-5 h-5 xs:w-6 xs:h-6" />
                ) : (
                  <FaBars className="w-5 h-5 xs:w-6 xs:h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Menu - Slide from right */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] xs:w-[320px] sm:w-[360px] bg-surface border-l border-border shadow-2xl z-40 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 xs:p-5 sm:p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <img 
                src={logo} 
                alt="Prince Kumar" 
                className="w-8 h-8 xs:w-9 xs:h-9 rounded-full object-cover ring-2 ring-primary/30"
              />
              <span className="text-lg xs:text-xl font-heading font-bold text-gradient">
                Menu
              </span>
            </div>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex-1 overflow-y-auto py-4 px-3 xs:px-4 sm:px-5">
            <div className="space-y-1">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="flex items-center gap-3 px-4 py-3.5 xs:py-4 text-text-secondary hover:text-primary hover:bg-background/80 rounded-lg transition-all duration-300 group text-base xs:text-lg font-medium"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary group-hover:scale-150 transition-all duration-300"></span>
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Footer with Resume Button */}
          <div className="p-4 xs:p-5 sm:p-6 border-t border-border space-y-3 xs:space-y-4">
            <button
              onClick={() => {
                handleResumeDownload();
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium px-4 py-3 xs:py-3.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 text-sm xs:text-base"
              aria-label="Download resume PDF"
            >
              <FaDownload className="text-sm xs:text-base" />
              <span>Download Resume</span>
            </button>
            
            <p className="text-center text-xs xs:text-sm text-text-secondary">
              © {new Date().getFullYear()} {personalInfo.name}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
