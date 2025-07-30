"use client";

import { motion } from "motion/react";

interface DiceAnimatorProps {
  children: React.ReactNode;
  isRolling: boolean;
}

export function DiceAnimator({ children, isRolling }: DiceAnimatorProps) {
  return (
    <motion.div
      animate={
        isRolling
          ? {
              rotateY: 360,
              scale: [1, 1.05, 1],
            }
          : {
              rotateY: 360, // mantém rotação pra evitar glitch
              scale: 1,
            }
      }
      initial={{ rotateY: 0, scale: 1 }}
      transition={{
        duration: 1.5,
        rotateY: {
          duration: 1.5,
          ease: "easeOut",
          repeat: isRolling ? Infinity : 0,
        },
        scale: {
          duration: 0.75,
          times: [0, 0.5, 1],
          ease: "easeInOut",
        },
      }}
      style={{
        perspective: 800,
        transformStyle: "preserve-3d",
        transformOrigin: "50% 50%",
        backfaceVisibility: "visible",
      }}
    >
      {children}
    </motion.div>
  );
}
