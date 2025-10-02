import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../data/personalInfo';

const Hero = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const photoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <section id="hero" className="min-h-screen-safe mobile:min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-surface to-background relative overflow-hidden safe-x">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 xs:w-48 xs:h-48 sm:w-64 sm:h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 xs:w-64 xs:h-64 sm:w-96 sm:h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container relative z-10 py-8 xs:py-12 sm:py-16">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-8 xs:gap-10 sm:gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content Section */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <motion.div variants={itemVariants}>
              <motion.h1 
                className="text-responsive-2xl font-heading font-bold mb-4 xs:mb-5 sm:mb-6 text-shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Hi, I'm{' '}
                <span className="text-gradient block xs:inline">
                  {personalInfo.name}
                </span>
              </motion.h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.h2 
                className="text-responsive-lg text-text-secondary font-medium mb-6 xs:mb-7 sm:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {personalInfo.title}
              </motion.h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.p 
                className="text-responsive-sm text-text-secondary mb-6 xs:mb-7 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 xs:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Passionate full-stack developer with expertise in React.js, Node.js, and MongoDB. 
                I build scalable web applications and love mentoring aspiring developers.
              </motion.p>
            </motion.div>

            {/* Call-to-action buttons */}
            <motion.div 
              className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center lg:justify-start mb-6 xs:mb-7 sm:mb-8 px-4 xs:px-0"
              variants={itemVariants}
            >
              <motion.button
                onClick={scrollToContact}
                className="btn-primary flex items-center justify-center gap-2 touch-manipulation focus-visible-ring"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaEnvelope className="text-sm xs:text-base" />
                <span className="whitespace-nowrap">Get In Touch</span>
              </motion.button>
              
              <motion.button
                onClick={handleResumeDownload}
                className="btn-secondary flex items-center justify-center gap-2 touch-manipulation focus-visible-ring"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaDownload className="text-sm xs:text-base" />
                <span className="whitespace-nowrap">Download Resume</span>
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex justify-center lg:justify-start gap-4 xs:gap-5 sm:gap-6"
              variants={itemVariants}
            >
              {socialLinks.slice(0, 2).map((social, index) => {
                const IconComponent = social.name === 'LinkedIn' ? FaLinkedin : FaGithub;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl xs:text-2xl text-text-secondary hover:text-primary transition-colors duration-300 touch-manipulation focus-visible-ring p-2 -m-2 rounded-lg"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    aria-label={`Visit ${social.name} profile`}
                  >
                    <IconComponent />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          {/* Professional Photo Section */}
          <motion.div 
            className="flex-shrink-0 order-1 lg:order-2"
            variants={photoVariants}
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Photo placeholder with gradient border */}
              <div className="w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1">
                <div className="w-full h-full rounded-full bg-surface flex items-center justify-center overflow-hidden">
                  {/* Placeholder for professional photo */}
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 bg-primary/30 rounded-full mx-auto mb-3 xs:mb-4 flex items-center justify-center">
                        <span className="text-2xl xs:text-3xl sm:text-4xl font-bold text-primary">PK</span>
                      </div>
                      <p className="text-text-secondary text-xs xs:text-sm">Professional Photo</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements around photo */}
              <motion.div
                className="absolute -top-2 -right-2 xs:-top-3 xs:-right-3 sm:-top-4 sm:-right-4 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 bg-primary rounded-full"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 xs:-bottom-3 xs:-left-3 sm:-bottom-4 sm:-left-4 w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 bg-secondary rounded-full"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-4 xs:bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            className="w-5 h-8 xs:w-6 xs:h-10 border-2 border-text-secondary rounded-full flex justify-center"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="w-0.5 h-2 xs:w-1 xs:h-3 bg-text-secondary rounded-full mt-1.5 xs:mt-2"
              animate={{
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;