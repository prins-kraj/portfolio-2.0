import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaHeart, FaArrowUp } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../data/personalInfo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   });
  // };

  const getIconComponent = (iconName) => {
    const icons = {
      FaLinkedin,
      FaGithub,
      FaEnvelope,
      FaPhone
    };
    return icons[iconName] || FaEnvelope;
  };

  return (
    <footer className="bg-surface border-t border-border safe-bottom">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 xs:py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-7 sm:gap-8">
            
            {/* About Section */}
            <div className="lg:col-span-2">
              <h3 className="text-lg xs:text-xl font-heading font-semibold text-text-primary mb-3 xs:mb-4">
                {personalInfo.name}
              </h3>
              <p className="text-text-secondary text-sm xs:text-base mb-4 xs:mb-5 sm:mb-6 leading-relaxed">
                {personalInfo.title} passionate about creating innovative web solutions 
                and mentoring aspiring developers. Always eager to take on new challenges 
                and contribute to meaningful projects.
              </p>
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-3 xs:gap-4">
                {socialLinks.map((link, index) => {
                  const IconComponent = getIconComponent(link.icon);
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 xs:w-10 xs:h-10 bg-background border border-border rounded-lg flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all duration-300 hover:scale-110 touch-manipulation"
                      aria-label={link.name}
                    >
                      <IconComponent className="text-base xs:text-lg" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base xs:text-lg font-heading font-semibold text-text-primary mb-3 xs:mb-4">
                Quick Links
              </h4>
              <ul className="space-y-1.5 xs:space-y-2">
                {[
                  { name: 'About', href: '#about' },
                  { name: 'Experience', href: '#experience' },
                  { name: 'Projects', href: '#projects' },
                  { name: 'Skills', href: '#skills' },
                  { name: 'Contact', href: '#contact' }
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-text-secondary text-sm xs:text-base hover:text-primary transition-colors duration-300 touch-manipulation inline-block py-1"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-base xs:text-lg font-heading font-semibold text-text-primary mb-3 xs:mb-4">
                Get In Touch
              </h4>
              <div className="space-y-2.5 xs:space-y-3">
                <div className="flex items-start space-x-2.5 xs:space-x-3">
                  <FaEnvelope className="text-primary flex-shrink-0 mt-0.5 text-sm xs:text-base" />
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="text-text-secondary hover:text-primary transition-colors duration-300 text-xs xs:text-sm break-words touch-manipulation"
                  >
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex items-start space-x-2.5 xs:space-x-3">
                  <FaPhone className="text-primary flex-shrink-0 mt-0.5 text-sm xs:text-base" />
                  <a 
                    href={`tel:${personalInfo.phone}`}
                    className="text-text-secondary hover:text-primary transition-colors duration-300 text-xs xs:text-sm break-words touch-manipulation"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border py-4 xs:py-5 sm:py-6">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-3 xs:space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-text-secondary text-xs xs:text-sm text-center">
              <p className="flex items-center flex-wrap justify-center gap-1">
                <span>© {currentYear} {personalInfo.name}.</span>
                <span className="flex items-center gap-1">
                  Made with 
                  <FaHeart className="text-red-500 animate-pulse" /> 
                  and React.js
                </span>
              </p>
            </div>

            {/* Back to Top Button */}
            {/* <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-all duration-300 group"
              aria-label="Back to top"
            >
              <span className="text-sm">Back to top</span>
              <FaArrowUp className="text-sm group-hover:-translate-y-1 transition-transform duration-300" />
            </button> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;