import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaHeart, FaArrowUp } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../data/personalInfo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* About Section */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                {personalInfo.name}
              </h3>
              <p className="text-text-secondary mb-6 leading-relaxed">
                {personalInfo.title} passionate about creating innovative web solutions 
                and mentoring aspiring developers. Always eager to take on new challenges 
                and contribute to meaningful projects.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => {
                  const IconComponent = getIconComponent(link.icon);
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-background border border-border rounded-lg flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all duration-300 hover:scale-110"
                      aria-label={link.name}
                    >
                      <IconComponent className="text-lg" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-heading font-semibold text-text-primary mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
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
                      className="text-text-secondary hover:text-primary transition-colors duration-300"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-heading font-semibold text-text-primary mb-4">
                Get In Touch
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-primary flex-shrink-0" />
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="text-text-secondary hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhone className="text-primary flex-shrink-0" />
                  <a 
                    href={`tel:${personalInfo.phone}`}
                    className="text-text-secondary hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-text-secondary text-sm">
              <p className="flex items-center">
                © {currentYear} {personalInfo.name}. Made with 
                <FaHeart className="text-red-500 mx-1 animate-pulse" /> 
                and React.js
              </p>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-all duration-300 group"
              aria-label="Back to top"
            >
              <span className="text-sm">Back to top</span>
              <FaArrowUp className="text-sm group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;