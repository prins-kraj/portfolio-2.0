import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ 
  variant = 'text', 
  width = '100%', 
  height = '1rem',
  className = '',
  count = 1,
  spacing = '0.5rem'
}) => {
  const baseClasses = 'bg-surface/50 rounded animate-pulse';
  
  const variants = {
    text: `h-4 ${baseClasses}`,
    title: `h-8 ${baseClasses}`,
    avatar: `w-12 h-12 rounded-full ${baseClasses}`,
    card: `h-48 ${baseClasses}`,
    button: `h-10 ${baseClasses}`,
    image: `aspect-video ${baseClasses}`,
    custom: baseClasses
  };

  const skeletonClass = variant === 'custom' 
    ? `${variants.custom} ${className}` 
    : `${variants[variant]} ${className}`;

  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: { x: '100%' }
  };

  const Skeleton = ({ index = 0 }) => (
    <div 
      className={`relative overflow-hidden ${skeletonClass}`}
      style={{ 
        width: variant === 'custom' ? width : undefined,
        height: variant === 'custom' ? height : undefined,
        marginBottom: index < count - 1 ? spacing : 0
      }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );

  if (count === 1) {
    return <Skeleton />;
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} index={index} />
      ))}
    </div>
  );
};

// Pre-built skeleton components for common use cases
export const TextSkeleton = ({ lines = 3, ...props }) => (
  <SkeletonLoader variant="text" count={lines} {...props} />
);

export const CardSkeleton = ({ ...props }) => (
  <div className="card">
    <SkeletonLoader variant="image" className="mb-4" />
    <SkeletonLoader variant="title" className="mb-2" />
    <TextSkeleton lines={2} />
    <div className="flex gap-2 mt-4">
      <SkeletonLoader variant="button" width="80px" />
      <SkeletonLoader variant="button" width="100px" />
    </div>
  </div>
);

export const ProfileSkeleton = ({ ...props }) => (
  <div className="flex items-center gap-4">
    <SkeletonLoader variant="avatar" />
    <div className="flex-1">
      <SkeletonLoader variant="text" width="120px" className="mb-2" />
      <SkeletonLoader variant="text" width="80px" />
    </div>
  </div>
);

export default SkeletonLoader;