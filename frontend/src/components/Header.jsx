import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaDownload } from 'react-icons/fa';
import { personalInfo } from '../data/personalInfo';
import logo from '../assets/prince.png'

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
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = personalInfo.resumeUrl;
    link.download = 'Prince_Kumar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-top safe-x ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-custom shadow-lg border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container">
        <div className="flex items-center justify-between h-14 xs:h-16 lg:h-20">
          {/* Logo/Name */}
          <div className="flex-shrink-0 min-w-0">
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="text-lg xs:text-xl lg:text-2xl font-heading font-bold text-gradient hover:scale-105 transition-transform duration-300 focus-visible-ring rounded-md p-1 -m-1 touch-manipulation truncate flex flex-row items-center"
              aria-label="Go to home section"
            >
              <img src={logo} alt="" className='w-8 h-8'/>
              {personalInfo.name.split(' ')[0]} {/* Show first name on mobile */}
              <span className="hidden xs:inline"> {personalInfo.name.split(' ').slice(1).join(' ')}</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-6 xl:ml-10 flex items-baseline space-x-4 xl:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="text-text-secondary hover:text-primary px-2 xl:px-3 py-2 text-sm xl:text-base font-medium transition-colors duration-300 relative group focus-visible-ring rounded-md touch-manipulation"
                  aria-label={`Go to ${item.name.toLowerCase()} section`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Resume Download Button - Desktop */}
          <div className="hidden lg:block">
            <button
              onClick={handleResumeDownload}
              className="btn-primary flex items-center space-x-2 focus-visible-ring touch-manipulation"
              aria-label="Download resume PDF"
            >
              <FaDownload className="text-sm" />
              <span className="hidden xl:inline">Resume</span>
              <span className="xl:hidden">CV</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text-secondary hover:text-primary p-2 rounded-md transition-colors duration-300 focus-visible-ring touch-manipulation"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <FaTimes className="h-5 w-5 xs:h-6 xs:w-6" />
              ) : (
                <FaBars className="h-5 w-5 xs:h-6 xs:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-96 opacity-100' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
          aria-hidden={!isMenuOpen}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-surface/95 backdrop-blur-custom rounded-lg mt-2 border border-border">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-text-secondary hover:text-primary hover:bg-background/50 block px-3 py-3 text-base font-medium rounded-md transition-all duration-300 focus-visible-ring touch-manipulation"
                tabIndex={isMenuOpen ? 0 : -1}
                aria-label={`Go to ${item.name.toLowerCase()} section`}
              >
                {item.name}
              </a>
            ))}
            
            {/* Mobile Resume Button */}
            <div className="px-3 py-2">
              <button
                onClick={() => {
                  handleResumeDownload();
                  setIsMenuOpen(false);
                }}
                className="btn-primary w-full flex items-center justify-center space-x-2 focus-visible-ring touch-manipulation"
                tabIndex={isMenuOpen ? 0 : -1}
                aria-label="Download resume PDF"
              >
                <FaDownload className="text-sm" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;