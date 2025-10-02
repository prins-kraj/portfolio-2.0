import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  ripple = true,
  ...props 
}) => {
  const baseClasses = 'relative overflow-hidden font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background touch-manipulation';
  
  const variants = {
    primary: 'bg-primary hover:bg-primary/90 text-white focus:ring-primary',
    secondary: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    accent: 'bg-accent hover:bg-accent/90 text-white focus:ring-accent',
    ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface/50 focus:ring-primary',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: disabled ? 1 : 1.02,
      transition: { duration: 0.1, ease: "easeOut" }
    },
    tap: { 
      scale: disabled ? 1 : 0.98,
      transition: { duration: 0.05, ease: "easeInOut" }
    }
  };

  const rippleVariants = {
    initial: { scale: 0, opacity: 0.5 },
    animate: { 
      scale: 4, 
      opacity: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const loadingSpinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const handleClick = (e) => {
    if (disabled || loading) return;
    
    // Create ripple effect
    if (ripple) {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      const rippleElement = document.createElement('div');
      rippleElement.className = 'absolute bg-white/20 rounded-full pointer-events-none';
      rippleElement.style.width = rippleElement.style.height = size + 'px';
      rippleElement.style.left = x + 'px';
      rippleElement.style.top = y + 'px';
      rippleElement.style.transform = 'scale(0)';
      rippleElement.style.animation = 'ripple 0.6s ease-out';
      
      button.appendChild(rippleElement);
      
      setTimeout(() => {
        rippleElement.remove();
      }, 600);
    }
    
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  return (
    <>
      <style jsx>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
      
      <motion.button
        className={buttonClasses}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        <div className="flex items-center justify-center gap-2">
          {/* Loading spinner */}
          {loading && (
            <motion.div
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              variants={loadingSpinnerVariants}
              animate="animate"
            />
          )}
          
          {/* Left icon */}
          {icon && iconPosition === 'left' && !loading && (
            <span className="flex-shrink-0">{icon}</span>
          )}
          
          {/* Button text */}
          <span className={loading ? 'opacity-0' : 'opacity-100'}>
            {children}
          </span>
          
          {/* Right icon */}
          {icon && iconPosition === 'right' && !loading && (
            <span className="flex-shrink-0">{icon}</span>
          )}
        </div>
      </motion.button>
    </>
  );
};

export default AnimatedButton;