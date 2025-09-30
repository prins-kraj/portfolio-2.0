import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  SiJavascript, SiPython, SiCplusplus, SiTypescript,
  SiReact, SiHtml5, SiCss3, SiTailwindcss, SiBootstrap, SiRedux,
  SiNodedotjs, SiExpress, SiFlask, SiPostman,
  SiMongodb, SiMysql, SiPostgresql,
  SiGit, SiGithub, SiDocker, SiVercel
} from 'react-icons/si';
import { VscVscode } from "react-icons/vsc";
import { FaJava } from "react-icons/fa";
import { skills, skillStats } from '../data/skills';

const iconMap = {
  SiJavascript, SiPython, SiCplusplus, FaJava, SiTypescript,
  SiReact, SiHtml5, SiCss3, SiTailwindcss, SiBootstrap, SiRedux,
  SiNodedotjs, SiExpress, SiFlask, SiPostman,
  SiMongodb, SiMysql, SiPostgresql,
  SiGit, SiGithub, VscVscode, SiDocker, SiVercel
};

const SkillCard = ({ skill, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const IconComponent = iconMap[skill.icon];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className="group relative bg-surface border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {IconComponent && (
            <IconComponent 
              className="text-2xl transition-colors duration-300 group-hover:scale-110"
              style={{ color: skill.color }}
            />
          )}
          <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors duration-300">
            {skill.name}
          </h3>
        </div>
        <span className="text-sm font-semibold text-text-secondary group-hover:text-primary transition-colors duration-300">
          {skill.level}%
        </span>
      </div>
      
      <div className="relative">
        <div className="w-full bg-border rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            animate={{ width: isVisible ? `${skill.level}%` : 0 }}
            transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
          />
        </div>
        
        {/* Animated glow effect */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${skill.level}%` : 0 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

const SkillCategory = ({ categoryName, categorySkills, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="mb-12"
    >
      <h3 className="text-xl font-semibold text-text-primary mb-6 text-center">
        <span className="relative">
          {categoryName}
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
          />
        </span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categorySkills.map((skill, skillIndex) => (
          <SkillCard 
            key={skill.name} 
            skill={skill} 
            index={skillIndex + index * 3}
          />
        ))}
      </div>
    </motion.div>
  );
};

const SkillStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 mb-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <motion.div
            className="text-3xl font-bold text-primary mb-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            {skillStats.totalSkills}+
          </motion.div>
          <p className="text-text-secondary">Technical Skills</p>
        </div>
        
        <div>
          <motion.div
            className="text-3xl font-bold text-secondary mb-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            {skillStats.averageLevel}%
          </motion.div>
          <p className="text-text-secondary">Average Proficiency</p>
        </div>
        
        <div>
          <motion.div
            className="text-3xl font-bold text-accent mb-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            5+
          </motion.div>
          <p className="text-text-secondary">Years Experience</p>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          Technical <span className="text-gradient">Skills</span>
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          A comprehensive overview of my technical expertise across various programming languages, 
          frameworks, and development tools.
        </p>
      </motion.div>

      <SkillStats />

      <div className="text-left">
        {Object.entries(skills).map(([categoryName, categorySkills], index) => (
          <SkillCategory
            key={categoryName}
            categoryName={categoryName}
            categorySkills={categorySkills}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Skills;