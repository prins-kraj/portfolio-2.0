import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaTrophy, 
  FaGraduationCap, 
  FaCode, 
  FaMicrosoft,
  FaExternalLinkAlt,
  FaCertificate,
  FaStar,
  FaCalendarAlt
} from 'react-icons/fa';
import { achievements, certifications } from '../data/skills';

const iconMap = {
  FaTrophy,
  FaGraduationCap,
  FaCode,
  FaMicrosoft
};

const AchievementCard = ({ achievement, index }) => {
  const IconComponent = iconMap[achievement.icon] || FaTrophy;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="group relative bg-surface border border-border rounded-lg xs:rounded-xl p-4 xs:p-5 sm:p-6 lg:p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex flex-col xs:flex-row items-start justify-between mb-4 xs:mb-5 sm:mb-6 gap-3">
          <div className="flex items-start xs:items-center space-x-3 xs:space-x-4 w-full xs:w-auto">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg xs:rounded-xl flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300"
            >
              <IconComponent 
                className="text-lg xs:text-xl sm:text-2xl"
                style={{ color: achievement.color }}
              />
            </motion.div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base xs:text-lg sm:text-xl font-semibold text-text-primary group-hover:text-primary transition-colors duration-300 mb-1 xs:mb-2 break-words">
                {achievement.title}
              </h3>
              <div className="flex items-center text-xs xs:text-sm text-text-secondary">
                <FaCalendarAlt className="mr-1.5 xs:mr-2 flex-shrink-0" />
                <span className="break-words">{achievement.date}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-text-secondary text-sm xs:text-base mb-4 xs:mb-5 sm:mb-6 leading-relaxed break-words">
          {achievement.description}
        </p>

        <div className="space-y-2 xs:space-y-3 mb-4 xs:mb-5 sm:mb-6">
          {achievement.details.map((detail, detailIndex) => (
            <motion.div
              key={detailIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 + detailIndex * 0.1 }}
              className="flex items-start space-x-2 xs:space-x-3"
            >
              <FaStar className="text-accent mt-0.5 xs:mt-1 flex-shrink-0 text-xs xs:text-sm" />
              <span className="text-text-secondary text-xs xs:text-sm break-words">{detail}</span>
            </motion.div>
          ))}
        </div>

        {achievement.links.length > 0 && (
          <div className="flex flex-wrap gap-2 xs:gap-3">
            {achievement.links.map((link, linkIndex) => (
              <motion.a
                key={linkIndex}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-1.5 xs:space-x-2 bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 xs:px-4 xs:py-2 rounded-lg text-xs xs:text-sm font-medium transition-all duration-300 border border-primary/20 hover:border-primary/40 touch-manipulation"
              >
                <span className="break-words">{link.name}</span>
                <FaExternalLinkAlt className="flex-shrink-0" size={10} />
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const CertificationCard = ({ certification, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      className="bg-surface border border-border rounded-lg xs:rounded-xl p-4 xs:p-5 sm:p-6 hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10"
    >
      <div className="flex flex-col xs:flex-row items-start justify-between mb-3 xs:mb-4 gap-3">
        <div className="flex items-start xs:items-center space-x-2.5 xs:space-x-3 w-full xs:w-auto min-w-0">
          <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <FaCertificate className="text-secondary text-base xs:text-lg sm:text-xl" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-text-primary text-sm xs:text-base break-words">{certification.name}</h4>
            <p className="text-xs xs:text-sm text-text-secondary break-words">{certification.issuer}</p>
          </div>
        </div>
        <span className="text-xs text-text-secondary bg-border/50 px-2 py-1 rounded flex-shrink-0 self-start xs:self-auto">
          {certification.date}
        </span>
      </div>

      <div className="mb-3 xs:mb-4">
        <p className="text-xs text-text-secondary break-words">Credential ID: {certification.credentialId}</p>
      </div>

      <div className="flex flex-wrap gap-1.5 xs:gap-2">
        {certification.skills.map((skill, skillIndex) => (
          <span
            key={skillIndex}
            className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full break-words"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    { label: "Major Achievements", value: "4+", color: "text-primary" },
    { label: "Certifications", value: "2+", color: "text-secondary" },
    { label: "Students Mentored", value: "400+", color: "text-accent" },
    { label: "Problems Solved", value: "500+", color: "text-primary" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 lg:gap-6 mb-8 xs:mb-10 sm:mb-12"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
          className="text-center bg-surface/50 border border-border rounded-lg xs:rounded-xl p-3 xs:p-4 sm:p-5 lg:p-6 hover:border-primary/30 transition-all duration-300"
        >
          <motion.div
            className={`text-xl xs:text-2xl sm:text-3xl font-bold mb-1 xs:mb-2 ${stat.color}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
          >
            {stat.value}
          </motion.div>
          <p className="text-text-secondary text-xs xs:text-sm break-words">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

const Achievements = () => {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 xs:mb-10 sm:mb-12"
      >
        <h2 className="text-responsive-xl font-bold text-text-primary mb-3 xs:mb-4 px-4 xs:px-0">
          Achievements & <span className="text-gradient">Recognition</span>
        </h2>
        <p className="text-responsive-sm text-text-secondary max-w-3xl mx-auto px-4 xs:px-0">
          Highlighting key milestones, competitive programming achievements, certifications, 
          and professional recognition throughout my development journey.
        </p>
      </motion.div>

      <StatsSection />

      <div className="text-left mb-10 xs:mb-12 sm:mb-14 lg:mb-16">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg xs:text-xl sm:text-2xl font-semibold text-text-primary mb-5 xs:mb-6 sm:mb-8 text-center px-4 xs:px-0"
        >
          Major Achievements
        </motion.h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="text-left">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-lg xs:text-xl sm:text-2xl font-semibold text-text-primary mb-5 xs:mb-6 sm:mb-8 text-center px-4 xs:px-0"
        >
          Certifications
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6">
          {certifications.map((certification, index) => (
            <CertificationCard
              key={certification.id}
              certification={certification}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;