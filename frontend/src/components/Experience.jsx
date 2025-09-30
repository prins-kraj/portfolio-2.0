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
          className="text-4xl lg:text-5xl font-bold text-text-primary mb-4"
          variants={itemVariants}
        >
          Professional <span className="text-gradient">Experience</span>
        </motion.h2>
        
        <motion.p 
          className="text-text-secondary text-lg mb-12 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          My journey in software development and technology
        </motion.p>

        <div className="max-w-4xl mx-auto">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="relative mb-12 last:mb-0"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Timeline line */}
              {index !== experience.length - 1 && (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0.5 h-12 bg-gradient-to-b from-primary to-transparent hidden lg:block" />
              )}
              
              {/* Experience Card */}
              <div className="card hover:border-primary/50 relative">
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-6 h-6 bg-primary rounded-full border-4 border-background hidden lg:block" />
                
                <div className="text-left">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-text-primary mb-2">
                        {exp.title}
                      </h3>
                      <div className="flex items-center text-primary font-semibold text-lg mb-2">
                        <FiBriefcase className="mr-2" />
                        {exp.company}
                      </div>
                    </div>
                    
                    <div className="flex flex-col lg:items-end text-text-secondary">
                      <div className="flex items-center mb-1">
                        <FiCalendar className="mr-2" />
                        {exp.duration}
                      </div>
                      <div className="flex items-center">
                        <FiMapPin className="mr-2" />
                        {exp.location} • {exp.type}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <ul className="space-y-3">
                      {exp.description.map((desc, idx) => (
                        <li key={idx} className="text-text-secondary leading-relaxed flex items-start">
                          <span className="text-accent mr-3 mt-2 text-xs">▶</span>
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-text-primary font-semibold mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          className="px-3 py-1 bg-primary/10 border border-primary/30 text-primary rounded-full text-sm font-medium"
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
                    <h4 className="text-text-primary font-semibold mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-text-secondary flex items-start">
                          <span className="text-accent mr-3 mt-1">✓</span>
                          {achievement}
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