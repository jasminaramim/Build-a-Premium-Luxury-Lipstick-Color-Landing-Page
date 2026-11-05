import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface FadeUpProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  blur?: boolean;
  className?: string;
}

// Slow, ultra-smooth luxury curve for all headings and section titles
const LUXURY_SLOW_EASE = [0.19, 1, 0.22, 1];

export const FadeUp: React.FC<FadeUpProps> = ({
  children,
  delay = 0,
  duration = 1.25,
  distance = 36,
  blur = true,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: distance,
        filter: blur ? 'blur(8px)' : 'none',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration,
        delay,
        ease: LUXURY_SLOW_EASE,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.16,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  distance?: number;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  distance = 32,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: distance,
          filter: 'blur(6px)',
        },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 1.05,
            ease: LUXURY_SLOW_EASE,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface ScaleInProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  delay = 0,
  duration = 1.2,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.94,
        filter: 'blur(8px)',
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration,
        delay,
        ease: LUXURY_SLOW_EASE,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
