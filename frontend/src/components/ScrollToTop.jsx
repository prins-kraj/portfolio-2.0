import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = ({ 
  showAfter = 300,
  className = '',
  size = 'md'
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-14 h-14 text-lg'
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0
    },
    hover: {
      scale: 1.1,
      y: -2
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={`
            fixed bottom-6 right-6 z-40 
            ${sizeClasses[size]}
            bg-primary hover:bg-primary/90 
            text-white rounded-full 
            shadow-lg hover:shadow-xl 
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
            touch-manipulation
            ${className}
          `}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileHover="hover"
          whileTap="tap"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          transition={{
            duration: 0.2,
            ease: "easeOut"
          }}
        >
          <FaArrowUp className="mx-auto" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;