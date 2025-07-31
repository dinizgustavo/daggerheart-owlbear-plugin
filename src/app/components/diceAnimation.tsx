"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DiceAnimationProps {
  children: ReactNode;
  isRolling: boolean;
}

export const DiceAnimation = ({ children, isRolling }: DiceAnimationProps) => {
  return (
    <motion.div
      animate={
        isRolling
          ? {
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }
          : {}
      }
      transition={{
        duration: 0.8,
        repeat: isRolling ? Infinity : 0,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};
