"use client";

import { motion } from "framer-motion";

interface TokenButtonProps {
  onClick: () => void;
  disabled: boolean;
  isDark: boolean;
  children: string;
}

export default function TokenButton({
  onClick,
  disabled,
  isDark,
  children,
}: TokenButtonProps) {
  const greenStyle = disabled
    ? isDark
      ? "bg-zinc-600 cursor-not-allowed"
      : "bg-gray-300 cursor-not-allowed"
    : "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 cursor-pointer";

  const redStyle = disabled
    ? isDark
      ? "bg-zinc-600 cursor-not-allowed"
      : "bg-gray-300 cursor-not-allowed"
    : "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 cursor-pointer";

  const buttonStyle = children === "–" ? redStyle : greenStyle;

  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      whileTap={!disabled ? { scale: 0.9 } : undefined}
      className={`
        w-10 h-10 sm:w-12 sm:h-12 rounded-full text-white font-bold text-xl sm:text-2xl
        shadow ${buttonStyle} transition-colors duration-300 flex items-center justify-center
        select-none
      `}
      aria-disabled={disabled}
      type="button"
    >
      {children}
    </motion.button>
  );
}
