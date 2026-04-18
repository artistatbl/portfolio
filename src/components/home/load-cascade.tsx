"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface LoadCascadeProps {
  children: ReactNode;
}

const containerVariants = {
  hidden: {},
  visible: (shouldReduceMotion: boolean) => ({
    transition: shouldReduceMotion
      ? { staggerChildren: 0 }
      : {
          delayChildren: 0.1,
          staggerChildren: 0.14,
        },
  }),
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  visible: (shouldReduceMotion: boolean) => ({
    opacity: 1,
    y: 0,
    transition: shouldReduceMotion
      ? { duration: 0.01 }
      : {
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        },
  }),
};

export function LoadCascade({ children }: LoadCascadeProps) {
  const shouldReduceMotion = useReducedMotion();
  const items = Children.toArray(children);

  return (
    <motion.div
      className="space-y-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      custom={shouldReduceMotion}
    >
      {items.map((child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          custom={shouldReduceMotion}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
