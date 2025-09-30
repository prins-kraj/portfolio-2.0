import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiCalendar } from 'react-icons/fi';
import { projects, projectCategories } from '../data/projects';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
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
    <div className="w-full">
      {/* Section Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          A showcase of my recent work, featuring full-stack applications built with modern technologies
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {projectCategories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category.value
                ? 'bg-primary text-white shadow-lg transform scale-105'
                : 'bg-surface text-text-secondary hover:bg-surface/80 hover:text-text-primary'
            }`}
          >
            {category.name}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            variants={cardVariants}
            className="group"
          >
            <div className="card h-full flex flex-col overflow-hidden">
              {/* Project Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiCode className="text-4xl text-primary/60" />
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Completed' 
                      ? 'bg-accent/20 text-accent' 
                      : 'bg-secondary/20 text-secondary'
                  }`}>
                    {project.status}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Project Content */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors duration-300">
                    {project.name}
                  </h3>
                  <div className="flex items-center text-text-secondary text-sm">
                    <FiCalendar className="mr-1" />
                    {project.endDate}
                  </div>
                </div>

                <p className="text-text-secondary mb-4 flex-1 leading-relaxed">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-text-primary mb-2">Key Features:</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    {project.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                    {project.features.length > 3 && (
                      <li className="text-primary text-xs">
                        +{project.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-surface/50 text-text-secondary text-xs rounded-full border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-surface border border-border rounded-lg text-text-secondary hover:text-text-primary hover:border-primary transition-all duration-300 group/btn"
                  >
                    <FiGithub className="group-hover/btn:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-medium">Code</span>
                    <FiExternalLink className="text-xs opacity-60" />
                  </a>
                  
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-blue-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="text-sm font-medium">Live Demo</span>
                      <FiExternalLink className="text-xs" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FiCode className="text-4xl text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary">No projects found in this category.</p>
        </motion.div>
      )}
    </div>
  );
};

export default Projects;