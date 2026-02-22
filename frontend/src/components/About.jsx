import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaLightbulb, FaUsers, FaRocket } from 'react-icons/fa';
import { personalInfo } from '../data/personalInfo';
import ScrollReveal from './ScrollReveal';
import AnimatedCard from './AnimatedCard';
import AnimatedButton from './AnimatedButton';

const About = () => {
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

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const highlights = [
    {
      icon: FaCode,
      title: "Full-Stack Development",
      description: "Expertise in React.js, Node.js, Express.js, and MongoDB for building scalable web applications."
    },
    {
      icon: FaRocket,
      title: "Project Leadership",
      description: "Led development of HRMS portals and project management systems at Terawe Technology."
    },
    {
      icon: FaUsers,
      title: "Mentorship",
      description: "Mentored 400+ students in Data Structures and Algorithms at Coding Ninja."
    },
    {
      icon: FaLightbulb,
      title: "Innovation",
      description: "Collaborated with Microsoft on app modernization using React.js and Redux."
    }
  ];

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-background to-surface scroll-mt-14 xs:scroll-mt-16 lg:scroll-mt-20">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <ScrollReveal direction="up" className="text-center mb-12 xs:mb-14 sm:mb-16">
            <h2 className="text-responsive-xl font-heading font-bold text-text-primary mb-3 xs:mb-4 px-4 xs:px-0">
              About <span className="text-gradient">Me</span>
            </h2>
            <motion.div 
              className="w-16 xs:w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 'auto' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8 xs:gap-10 sm:gap-12 lg:gap-16 items-center">
            {/* Professional Summary */}
            <div>
              <ScrollReveal direction="left" delay={0.2}>
                <h3 className="text-responsive-lg font-heading font-semibold text-text-primary mb-4 xs:mb-5 sm:mb-6 px-4 xs:px-0">
                  Passionate Developer & Mentor
                </h3>
              </ScrollReveal>
              
              <ScrollReveal direction="left" delay={0.4}>
                <div className="space-responsive text-text-secondary leading-relaxed px-4 xs:px-0">
                  <p className="text-responsive-sm">
                    {personalInfo.summary}
                  </p>
                  
                  <p className="text-sm xs:text-base">
                    Currently working as an Associate Software Developer at Terawe Technology, 
                    I specialize in building robust web applications using modern technologies. 
                    My experience spans from developing HRMS portals to collaborating with 
                    industry giants like Microsoft on app modernization projects.
                  </p>
                  
                  <p className="text-sm xs:text-base">
                    Beyond coding, I'm passionate about sharing knowledge and have mentored 
                    over 400 students in Data Structures and Algorithms. I believe in 
                    continuous learning and staying updated with the latest technologies 
                    to deliver innovative solutions.
                  </p>
                </div>
              </ScrollReveal>

              {/* Key Stats */}
              <ScrollReveal direction="up" delay={0.6}>
                <div className="grid grid-cols-2 gap-4 xs:gap-5 sm:gap-6 mt-6 xs:mt-7 sm:mt-8 px-4 xs:px-0">
                  <AnimatedCard className="text-center p-4 xs:p-5 sm:p-6 bg-surface/30 rounded-lg border border-border/20">
                    <motion.div 
                      className="text-2xl xs:text-3xl font-bold text-primary mb-1 xs:mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.8, type: "spring", stiffness: 200 }}
                    >
                      400+
                    </motion.div>
                    <div className="text-text-secondary text-xs xs:text-sm">Students Mentored</div>
                  </AnimatedCard>
                  <AnimatedCard className="text-center p-4 xs:p-5 sm:p-6 bg-surface/30 rounded-lg border border-border/20">
                    <motion.div 
                      className="text-2xl xs:text-3xl font-bold text-secondary mb-1 xs:mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1, type: "spring", stiffness: 200 }}
                    >
                      3+
                    </motion.div>
                    <div className="text-text-secondary text-xs xs:text-sm">Major Projects</div>
                  </AnimatedCard>
                </div>
              </ScrollReveal>
            </div>

            {/* Highlights Grid */}
            <div className="grid-responsive-1-2 gap-4 xs:gap-5 sm:gap-6">
              {highlights.map((highlight, index) => {
                const IconComponent = highlight.icon;
                return (
                  <ScrollReveal 
                    key={highlight.title}
                    direction="right" 
                    delay={index * 0.1}
                  >
                    <AnimatedCard 
                      className="card group cursor-pointer h-full"
                      hoverY={-8}
                      borderGlow={true}
                    >
                      <motion.div 
                        className="text-primary text-2xl xs:text-3xl mb-3 xs:mb-4 group-hover:text-secondary transition-colors duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconComponent />
                      </motion.div>
                      <h4 className="text-base xs:text-lg font-semibold text-text-primary mb-2 group-hover:text-gradient transition-all duration-300">
                        {highlight.title}
                      </h4>
                      <p className="text-text-secondary text-xs xs:text-sm leading-relaxed">
                        {highlight.description}
                      </p>
                    </AnimatedCard>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <ScrollReveal direction="up" delay={0.8} className="text-center mt-12 xs:mt-14 sm:mt-16">
            <p className="text-responsive-sm text-text-secondary mb-4 xs:mb-5 sm:mb-6 max-w-2xl mx-auto px-4 xs:px-0">
              I'm always excited to work on challenging projects and collaborate with 
              talented teams. Let's build something amazing together!
            </p>
            
            <AnimatedButton
              variant="primary"
              size="lg"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="focus-visible-ring"
            >
              Let's Connect
            </AnimatedButton>
          </ScrollReveal>
        </motion.div>
      </div>
    </section>
  );
};

export default About;