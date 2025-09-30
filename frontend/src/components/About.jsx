import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaLightbulb, FaUsers, FaRocket } from 'react-icons/fa';
import { personalInfo } from '../data/personalInfo';

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
    <section id="about" className="section-padding bg-gradient-to-b from-background to-surface">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              About <span className="text-gradient">Me</span>
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Professional Summary */}
            <motion.div variants={itemVariants}>
              <motion.h3 
                className="text-2xl lg:text-3xl font-heading font-semibold text-text-primary mb-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Passionate Developer & Mentor
              </motion.h3>
              
              <motion.div 
                className="space-y-4 text-text-secondary leading-relaxed"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-lg">
                  {personalInfo.summary}
                </p>
                
                <p>
                  Currently working as an Associate Software Developer at Terawe Technology, 
                  I specialize in building robust web applications using modern technologies. 
                  My experience spans from developing HRMS portals to collaborating with 
                  industry giants like Microsoft on app modernization projects.
                </p>
                
                <p>
                  Beyond coding, I'm passionate about sharing knowledge and have mentored 
                  over 400 students in Data Structures and Algorithms. I believe in 
                  continuous learning and staying updated with the latest technologies 
                  to deliver innovative solutions.
                </p>
              </motion.div>

              {/* Key Stats */}
              <motion.div 
                className="grid grid-cols-2 gap-6 mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">400+</div>
                  <div className="text-text-secondary">Students Mentored</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">3+</div>
                  <div className="text-text-secondary">Major Projects</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Highlights Grid */}
            <motion.div 
              className="grid sm:grid-cols-2 gap-6"
              variants={itemVariants}
            >
              {highlights.map((highlight, index) => {
                const IconComponent = highlight.icon;
                return (
                  <motion.div
                    key={highlight.title}
                    className="card group cursor-pointer"
                    variants={cardVariants}
                    whileHover="hover"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <motion.div 
                      className="text-primary text-3xl mb-4 group-hover:text-secondary transition-colors duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent />
                    </motion.div>
                    <h4 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-gradient transition-all duration-300">
                      {highlight.title}
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {highlight.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.p 
              className="text-lg text-text-secondary mb-6 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              I'm always excited to work on challenging projects and collaborate with 
              talented teams. Let's build something amazing together!
            </motion.p>
            
            <motion.button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Let's Connect
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;