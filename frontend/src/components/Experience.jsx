import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar, FiBriefcase, FiExternalLink } from 'react-icons/fi';
import { experience } from '../data/experience';

const Experience = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="text-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2 
          className="text-responsive-xl font-bold text-text-primary mb-3 xs:mb-4 px-4 xs:px-0"
          variants={itemVariants}
        >
          Professional <span className="text-gradient">Experience</span>
        </motion.h2>
        
        <motion.p 
          className="text-responsive-sm text-text-secondary mb-8 xs:mb-10 sm:mb-12 max-w-2xl mx-auto px-4 xs:px-0"
          variants={itemVariants}
        >
          My journey in software development and technology
        </motion.p>

        <div className="max-w-4xl mx-auto">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="relative mb-8 xs:mb-10 sm:mb-12 last:mb-0"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Timeline line */}
              {index !== experience.length - 1 && (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0.5 h-8 xs:h-10 sm:h-12 bg-gradient-to-b from-primary to-transparent hidden lg:block" />
              )}
              
              {/* Experience Card */}
              <div className="card hover:border-primary/50 relative">
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-6 h-6 bg-primary rounded-full border-4 border-background hidden lg:block" />
                
                <div className="text-left">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 xs:mb-5 sm:mb-6">
                    <div className="mb-3 lg:mb-0">
                      <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-text-primary mb-2">
                        {exp.title}
                      </h3>
                      <div className="flex items-center text-primary font-semibold text-base xs:text-lg mb-2">
                        <FiBriefcase className="mr-2 flex-shrink-0" />
                        <span className="break-words">{exp.company}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col lg:items-end text-text-secondary text-sm xs:text-base space-y-1">
                      <div className="flex items-center">
                        <FiCalendar className="mr-2 flex-shrink-0" />
                        <span className="break-words">{exp.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <FiMapPin className="mr-2 flex-shrink-0" />
                        <span className="break-words">{exp.location} • {exp.type}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4 xs:mb-5 sm:mb-6">
                    <ul className="space-y-2 xs:space-y-3">
                      {exp.description.map((desc, idx) => (
                        <li key={idx} className="text-text-secondary text-sm xs:text-base leading-relaxed flex items-start">
                          <span className="text-accent mr-2 xs:mr-3 mt-1 xs:mt-2 text-xs flex-shrink-0">▶</span>
                          <span className="break-words">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4 xs:mb-5 sm:mb-6">
                    <h4 className="text-text-primary font-semibold mb-2 xs:mb-3 text-sm xs:text-base">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-1.5 xs:gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          className="px-2 py-1 xs:px-3 xs:py-1 bg-primary/10 border border-primary/30 text-primary rounded-full text-xs xs:text-sm font-medium"
                          whileHover={{ 
                            scale: 1.05,
                            backgroundColor: "rgba(59, 130, 246, 0.2)"
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-text-primary font-semibold mb-2 xs:mb-3 text-sm xs:text-base">Key Achievements:</h4>
                    <ul className="space-y-1.5 xs:space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-text-secondary text-sm xs:text-base flex items-start">
                          <span className="text-accent mr-2 xs:mr-3 mt-0.5 xs:mt-1 flex-shrink-0">✓</span>
                          <span className="break-words">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Experience;