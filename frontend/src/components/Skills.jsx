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
import ScrollReveal from './ScrollReveal';
import AnimatedCard from './AnimatedCard';

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
    const timer = setTimeout(() => setIsVisible(true), index * 50);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <AnimatedCard 
      className="group relative bg-surface border border-border rounded-lg xs:rounded-xl p-4 xs:p-5 sm:p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
      hoverScale={1.03}
      hoverY={-3}
      borderGlow={true}
    >
      <div className="flex items-center justify-between mb-3 xs:mb-4">
        <div className="flex items-center space-x-2 xs:space-x-3 min-w-0">
          {IconComponent && (
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <IconComponent 
                className="text-lg xs:text-xl sm:text-2xl transition-colors duration-300 flex-shrink-0"
                style={{ color: skill.color }}
              />
            </motion.div>
          )}
          <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors duration-300 text-sm xs:text-base truncate">
            {skill.name}
          </h3>
        </div>
        <span className="text-xs xs:text-sm font-semibold text-text-secondary group-hover:text-primary transition-colors duration-300 flex-shrink-0">
          {skill.level}%
        </span>
      </div>
      
      <div className="relative">
        <div className="w-full bg-border rounded-full h-1.5 xs:h-2 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: index * 0.05, ease: "easeOut" }}
          />
        </div>
        
        {/* Animated glow effect */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-sm"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.05 + 0.1, ease: "easeOut" }}
        />
      </div>
    </AnimatedCard>
  );
};

const SkillCategory = ({ categoryName, categorySkills, index }) => {
  return (
    <ScrollReveal direction="up" delay={index * 0.1} className="mb-8 xs:mb-10 sm:mb-12">
      <h3 className="text-lg xs:text-xl font-semibold text-text-primary mb-4 xs:mb-5 sm:mb-6 text-center px-4 xs:px-0">
        <span className="relative">
          {categoryName}
          <motion.div
            className="absolute -bottom-1 xs:-bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </span>
      </h3>
      
      <div className="grid-responsive-1-2-3 gap-3 xs:gap-4 sm:gap-5 lg:gap-6">
        {categorySkills.map((skill, skillIndex) => (
          <ScrollReveal 
            key={skill.name}
            direction="up"
            delay={skillIndex * 0.05}
          >
            <SkillCard 
              skill={skill} 
              index={skillIndex}
            />
          </ScrollReveal>
        ))}
      </div>
    </ScrollReveal>
  );
};

const SkillStats = () => {
  return (
    <ScrollReveal direction="scale" delay={0.3}>
      <AnimatedCard className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg xs:rounded-xl p-4 xs:p-5 sm:p-6 mb-8 xs:mb-10 sm:mb-12">
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 text-center">
          <div>
            <motion.div
              className="text-2xl xs:text-3xl font-bold text-primary mb-1 xs:mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200 }}
            >
              {skillStats.totalSkills}+
            </motion.div>
            <p className="text-text-secondary text-xs xs:text-sm">Technical Skills</p>
          </div>
          
          <div>
            <motion.div
              className="text-2xl xs:text-3xl font-bold text-secondary mb-1 xs:mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7, type: "spring", stiffness: 200 }}
            >
              {skillStats.averageLevel}%
            </motion.div>
            <p className="text-text-secondary text-xs xs:text-sm">Average Proficiency</p>
          </div>
          
          <div>
            <motion.div
              className="text-2xl xs:text-3xl font-bold text-accent mb-1 xs:mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9, type: "spring", stiffness: 200 }}
            >
              5+
            </motion.div>
            <p className="text-text-secondary text-xs xs:text-sm">Years Experience</p>
          </div>
        </div>
      </AnimatedCard>
    </ScrollReveal>
  );
};

const Skills = () => {
  return (
    <div className="text-center">
      <ScrollReveal direction="up" className="mb-8 xs:mb-10 sm:mb-12">
        <h2 className="text-responsive-xl font-bold text-text-primary mb-3 xs:mb-4 px-4 xs:px-0">
          Technical <span className="text-gradient">Skills</span>
        </h2>
        <p className="text-responsive-sm text-text-secondary max-w-2xl mx-auto px-4 xs:px-0">
          A comprehensive overview of my technical expertise across various programming languages, 
          frameworks, and development tools.
        </p>
      </ScrollReveal>

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