import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar, FiAward, FiBookOpen, FiStar } from 'react-icons/fi';
import { education } from '../data/experience';

const Education = () => {
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
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
          Academic <span className="text-gradient">Background</span>
        </motion.h2>
        
        <motion.p 
          className="text-responsive-sm text-text-secondary mb-8 xs:mb-10 sm:mb-12 max-w-2xl mx-auto px-4 xs:px-0"
          variants={itemVariants}
        >
          My educational foundation in computer science and engineering
        </motion.p>

        <div className="max-w-4xl mx-auto">
          {education.map((edu) => (
            <motion.div
              key={edu.id}
              className="relative"
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Education Card */}
              <div className="card hover:border-primary/50 text-left relative overflow-hidden my-4">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 xs:w-32 xs:h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full transform translate-x-12 xs:translate-x-16 -translate-y-12 xs:-translate-y-16" />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 xs:mb-5 sm:mb-6">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <motion.h3 
                        className="text-xl xs:text-2xl lg:text-3xl font-bold text-text-primary mb-2 break-words"
                        whileHover={{ color: "rgb(59, 130, 246)" }}
                        transition={{ duration: 0.2 }}
                      >
                        {edu.degree}
                      </motion.h3>
                      
                      <div className="flex items-center text-primary font-semibold text-base xs:text-lg mb-2 xs:mb-3">
                        <FiBookOpen className="mr-2 flex-shrink-0" />
                        <span className="break-words">{edu.field}</span>
                      </div>
                      
                      <div className="text-text-secondary text-base xs:text-lg font-medium mb-3 xs:mb-4 break-words">
                        {edu.institution}
                      </div>
                    </div>
                    
                    {/* CGPA Badge */}
                    <motion.div 
                      className="bg-gradient-to-r from-accent to-primary p-3 xs:p-4 rounded-xl text-center min-w-[100px] xs:min-w-[120px] lg:ml-6"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-white font-bold text-xl xs:text-2xl">{edu.grade.number}</div>
                      <div className="text-white/90 text-xs xs:text-sm font-medium">{edu.grade.type}</div>
                    </motion.div>
                  </div>

                  {/* Duration and Location */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 xs:gap-3 sm:gap-4 mb-4 xs:mb-5 sm:mb-6 text-text-secondary text-sm xs:text-base">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2 text-primary flex-shrink-0" />
                      <span className="font-medium break-words">{edu.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <FiMapPin className="mr-2 text-primary flex-shrink-0" />
                      <span className="font-medium break-words">{edu.location}</span>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <div className="flex items-center mb-3 xs:mb-4">
                      <FiAward className="mr-2 text-accent flex-shrink-0" />
                      <h4 className="text-text-primary font-semibold text-base xs:text-lg">Academic Highlights</h4>
                    </div>
                    
                    <div className="grid gap-2 xs:gap-3">
                      {edu.achievements.map((achievement, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-start p-2.5 xs:p-3 bg-surface/50 rounded-lg border border-border/50"
                          whileHover={{ 
                            backgroundColor: "rgba(30, 41, 59, 0.8)",
                            borderColor: "rgba(59, 130, 246, 0.3)"
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <FiStar className="text-accent mr-2 xs:mr-3 mt-0.5 xs:mt-1 flex-shrink-0 text-sm xs:text-base" />
                          <span className="text-text-secondary text-sm xs:text-base leading-relaxed break-words">{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Academic Info */}
        <motion.div 
          className="mt-8 xs:mt-10 sm:mt-12 p-4 xs:p-5 sm:p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg xs:text-xl font-bold text-text-primary mb-2 xs:mb-3">Academic Focus</h3>
          <p className="text-text-secondary text-sm xs:text-base leading-relaxed">
            Specialized in <span className="text-primary font-semibold">Software Development</span> and{' '}
            <span className="text-primary font-semibold">Data Structures & Algorithms</span>, with a strong 
            foundation in computer science fundamentals and practical application development.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Education;