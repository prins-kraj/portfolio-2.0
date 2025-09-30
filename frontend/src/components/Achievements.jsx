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
      className="group relative bg-surface border border-border rounded-xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300"
            >
              <IconComponent 
                className="text-2xl"
                style={{ color: achievement.color }}
              />
            </motion.div>
            <div>
              <h3 className="text-xl font-semibold text-text-primary group-hover:text-primary transition-colors duration-300 mb-2">
                {achievement.title}
              </h3>
              <div className="flex items-center text-sm text-text-secondary">
                <FaCalendarAlt className="mr-2" />
                {achievement.date}
              </div>
            </div>
          </div>
        </div>

        <p className="text-text-secondary mb-6 leading-relaxed">
          {achievement.description}
        </p>

        <div className="space-y-3 mb-6">
          {achievement.details.map((detail, detailIndex) => (
            <motion.div
              key={detailIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 + detailIndex * 0.1 }}
              className="flex items-start space-x-3"
            >
              <FaStar className="text-accent mt-1 flex-shrink-0" size={12} />
              <span className="text-text-secondary text-sm">{detail}</span>
            </motion.div>
          ))}
        </div>

        {achievement.links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {achievement.links.map((link, linkIndex) => (
              <motion.a
                key={linkIndex}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-primary/20 hover:border-primary/40"
              >
                <span>{link.name}</span>
                <FaExternalLinkAlt size={12} />
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
      className="bg-surface border border-border rounded-xl p-6 hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg flex items-center justify-center">
            <FaCertificate className="text-secondary text-xl" />
          </div>
          <div>
            <h4 className="font-semibold text-text-primary">{certification.name}</h4>
            <p className="text-sm text-text-secondary">{certification.issuer}</p>
          </div>
        </div>
        <span className="text-xs text-text-secondary bg-border/50 px-2 py-1 rounded">
          {certification.date}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-xs text-text-secondary mb-2">Credential ID: {certification.credentialId}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {certification.skills.map((skill, skillIndex) => (
          <span
            key={skillIndex}
            className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full"
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
      className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
          className="text-center bg-surface/50 border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300"
        >
          <motion.div
            className={`text-3xl font-bold mb-2 ${stat.color}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
          >
            {stat.value}
          </motion.div>
          <p className="text-text-secondary text-sm">{stat.label}</p>
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
        className="mb-12"
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          Achievements & <span className="text-gradient">Recognition</span>
        </h2>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          Highlighting key milestones, competitive programming achievements, certifications, 
          and professional recognition throughout my development journey.
        </p>
      </motion.div>

      <StatsSection />

      <div className="text-left mb-16">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl font-semibold text-text-primary mb-8 text-center"
        >
          Major Achievements
        </motion.h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
          className="text-2xl font-semibold text-text-primary mb-8 text-center"
        >
          Certifications
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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