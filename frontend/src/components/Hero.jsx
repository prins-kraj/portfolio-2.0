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
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-surface to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content Section */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div variants={itemVariants}>
              <motion.h2 
                className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Hi, I'm{' '}
                <span className="text-gradient">
                  {personalInfo.name}
                </span>
              </motion.h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.h2 
                className="text-xl sm:text-2xl lg:text-3xl text-text-secondary font-medium mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {personalInfo.title}
              </motion.h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.p 
                className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
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
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              variants={itemVariants}
            >
              <motion.button
                onClick={scrollToContact}
                className="btn-primary flex items-center justify-center gap-2"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaEnvelope />
                Get In Touch
              </motion.button>
              
              <motion.button
                onClick={handleResumeDownload}
                className="btn-secondary flex items-center justify-center gap-2"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaDownload />
                Download Resume
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex justify-center lg:justify-start gap-6"
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
                    className="text-2xl text-text-secondary hover:text-primary transition-colors duration-300"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    <IconComponent />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          {/* Professional Photo Section */}
          <motion.div 
            className="flex-shrink-0"
            variants={photoVariants}
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Photo placeholder with gradient border */}
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1">
                <div className="w-full h-full rounded-full bg-surface flex items-center justify-center overflow-hidden">
                  {/* Placeholder for professional photo */}
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-primary/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary">PK</span>
                      </div>
                      <p className="text-text-secondary text-sm">Professional Photo</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements around photo */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full"
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
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full"
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
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-text-secondary rounded-full flex justify-center"
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
              className="w-1 h-3 bg-text-secondary rounded-full mt-2"
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