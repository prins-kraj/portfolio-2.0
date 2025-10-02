import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ 
  children, 
  className = '',
  hoverScale = 1.02,
  hoverY = -5,
  tapScale = 0.98,
  borderGlow = false,
  ...props 
}) => {
  const cardVariants = {
    initial: {
      scale: 1,
      y: 0,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    },
    hover: {
      scale: hoverScale,
      y: hoverY,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: tapScale,
      transition: {
        duration: 0.1,
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0 },
    hover: { 
      opacity: borderGlow ? 0.1 : 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      className={`relative ${className}`}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {/* Glow effect */}
      {borderGlow && (
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-0"
          variants={glowVariants}
        />
      )}
      
      {/* Card content */}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
};

export default AnimatedCard;