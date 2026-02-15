import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiCalendar } from 'react-icons/fi';
import { projects, projectCategories } from '../data/projects';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTechnology, setSelectedTechnology] = useState('all');
  
  // Get all unique technologies from projects
  const allTechnologies = [...new Set(projects.flatMap(project => project.technologies))];
  const technologyFilters = [
    { name: "All Tech", value: "all" },
    ...allTechnologies.slice(0, 8).map(tech => ({ name: tech, value: tech })) // Show top 8 technologies
  ];
  
  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
    const technologyMatch = selectedTechnology === 'all' || project.technologies.includes(selectedTechnology);
    return categoryMatch && technologyMatch;
  });

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
        className="text-center mb-8 xs:mb-10 sm:mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-responsive-xl font-bold text-text-primary mb-3 xs:mb-4 px-4 xs:px-0">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-responsive-sm text-text-secondary max-w-2xl mx-auto px-4 xs:px-0">
          A showcase of my recent work, featuring full-stack applications built with modern technologies
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <div className="mb-8 xs:mb-10 sm:mb-12 space-y-4 xs:space-y-5 sm:space-y-6">
        {/* Category Filters */}
        {/* <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-base xs:text-lg font-semibold text-text-primary mb-3 xs:mb-4 px-4 xs:px-0">Filter by Category</h3>
          <div className="flex flex-wrap justify-center gap-2 xs:gap-3 px-4 xs:px-0">
            {projectCategories.map((category) => (
              <button
                key={category.value}
                onClick={() => {
                  setSelectedCategory(category.value);
                  setSelectedTechnology('all'); // Reset technology filter when category changes
                }}
                className={`px-3 py-2 xs:px-4 xs:py-2.5 sm:px-6 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm xs:text-base touch-manipulation focus-visible-ring ${
                  selectedCategory === category.value
                    ? 'bg-primary text-white shadow-lg transform scale-105'
                    : 'bg-surface text-text-secondary hover:bg-surface/80 hover:text-text-primary'
                }`}
                aria-pressed={selectedCategory === category.value}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div> */}

        {/* Technology Filters */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-base xs:text-lg font-semibold text-text-primary mb-3 xs:mb-4 px-4 xs:px-0">Filter by Technology</h3>
          <div className="flex flex-wrap justify-center gap-1.5 xs:gap-2 px-4 xs:px-0">
            {technologyFilters.map((tech) => (
              <button
                key={tech.value}
                onClick={() => setSelectedTechnology(tech.value)}
                className={`px-2.5 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-2 rounded-full text-xs xs:text-sm font-medium transition-all duration-300 touch-manipulation focus-visible-ring ${
                  selectedTechnology === tech.value
                    ? 'bg-secondary text-white shadow-lg transform scale-105'
                    : 'bg-surface/50 text-text-secondary hover:bg-surface hover:text-text-primary border border-border'
                }`}
                aria-pressed={selectedTechnology === tech.value}
              >
                {tech.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Active Filters Display */}
        {(selectedCategory !== 'all' || selectedTechnology !== 'all') && (
          <motion.div 
            className="flex flex-wrap justify-center gap-2 items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-text-secondary text-sm">Active filters:</span>
            {selectedCategory !== 'all' && (
              <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full flex items-center gap-2">
                {selectedCategory}
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className="hover:text-white transition-colors"
                >
                  ×
                </button>
              </span>
            )}
            {selectedTechnology !== 'all' && (
              <span className="px-3 py-1 bg-secondary/20 text-secondary text-sm rounded-full flex items-center gap-2">
                {selectedTechnology}
                <button 
                  onClick={() => setSelectedTechnology('all')}
                  className="hover:text-white transition-colors"
                >
                  ×
                </button>
              </span>
            )}
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setSelectedTechnology('all');
              }}
              className="text-text-secondary hover:text-accent text-sm underline"
            >
              Clear all
            </button>
          </motion.div>
        )}
      </div>

      {/* Results Counter */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-text-secondary">
          Showing <span className="text-primary font-semibold">{filteredProjects.length}</span> of{' '}
          <span className="text-text-primary font-semibold">{projects.length}</span> projects
        </p>
      </motion.div>

      {/* Projects Grid */}
      <motion.div 
        className="grid-responsive-1-2-3 gap-4 xs:gap-5 sm:gap-6 lg:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        key={`${selectedCategory}-${selectedTechnology}`} // Re-trigger animation on filter change
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FiCode className="text-4xl text-text-secondary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-text-primary mb-2">No projects found</h3>
          <p className="text-text-secondary mb-4">
            No projects match your current filter criteria.
          </p>
          <button 
            onClick={() => {
              setSelectedCategory('all');
              setSelectedTechnology('all');
            }}
            className="btn-secondary"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Projects;