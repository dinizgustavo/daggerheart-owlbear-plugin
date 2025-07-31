"use client";

import { useTrackerStore } from "@/stores/useTrackerStore";
import { motion } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";

interface TokenButtonProps {
  onClick: () => void;
  disabled: boolean;
  isDark: boolean;
  children: React.ReactNode;
}

function TokenButton({
  onClick,
  disabled,
  isDark,
  children,
}: TokenButtonProps) {
  const baseBg = disabled
    ? isDark
      ? "bg-zinc-600 cursor-not-allowed"
      : "bg-gray-300 cursor-not-allowed"
    : "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 cursor-pointer";

  const redBg = disabled
    ? isDark
      ? "bg-zinc-600 cursor-not-allowed"
      : "bg-gray-300 cursor-not-allowed"
    : "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 cursor-pointer";

  const bgClass = children === "–" ? redBg : baseBg;

  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      whileTap={!disabled ? { scale: 0.9 } : undefined}
      className={`
        w-10 h-10 sm:w-12 sm:h-12 rounded-full text-white font-bold text-xl sm:text-2xl
        shadow ${bgClass} transition-colors duration-300 flex items-center justify-center
        select-none
      `}
      aria-disabled={disabled}
      type="button"
    >
      {children}
    </motion.button>
  );
}

export default function DiceTokenBar() {
  const {
    mode,
    hope,
    fear,
    stress,
    addHope,
    removeHope,
    addFear,
    removeFear,
    addStress,
    removeStress,
  } = useTrackerStore();
  const { isDark } = useTheme();

  const hopeFearLabel = mode === "PLAYER" ? "Hope" : "Fear";
  const hopeFearValue = mode === "PLAYER" ? hope : fear;
  const addHopeFear = mode === "PLAYER" ? addHope : addFear;
  const removeHopeFear = mode === "PLAYER" ? removeHope : removeFear;

  const maxTokens = 10;
  const hopeFearPercent = Math.min((hopeFearValue / maxTokens) * 100, 100);
  const stressPercent = Math.min((stress / maxTokens) * 100, 100);

  const hopeFearBarColor =
    mode === "PLAYER"
      ? isDark
        ? "bg-purple-700"
        : "bg-purple-500"
      : isDark
      ? "bg-yellow-300"
      : "bg-yellow-400";

  const stressBarColor = isDark ? "bg-red-700" : "bg-red-500";

  return (
    <div className="flex flex-col items-center my-6 w-full px-4 max-w-md mx-auto space-y-8">
      {/* Hope/Fear Bar - Always centered */}
      <div className="w-full">
        <div className="flex justify-center mb-2">
          <span
            className={`font-semibold text-lg ${
              isDark ? "text-gray-200" : "text-gray-900"
            }`}
          >
            {hopeFearLabel} Tokens
          </span>
        </div>

        <div className="flex items-center justify-center space-x-4 mb-4">
          <TokenButton
            onClick={removeHopeFear}
            disabled={hopeFearValue === 0}
            isDark={isDark}
          >
            –
          </TokenButton>

          <span
            className={`text-3xl font-mono ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {hopeFearValue}
          </span>

          <TokenButton
            onClick={addHopeFear}
            disabled={hopeFearValue === maxTokens}
            isDark={isDark}
          >
            +
          </TokenButton>
        </div>

        <div
          className={`relative w-full h-5 rounded-full overflow-hidden shadow-inner transition-colors duration-300 ${
            isDark ? "bg-zinc-700" : "bg-gray-300"
          }`}
        >
          <motion.div
            className={`${hopeFearBarColor} h-full rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${hopeFearPercent}%` }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
          />
        </div>
      </div>

      {/* Stress Bar - Only for Player, side by side with Hope */}
      {mode === "PLAYER" && (
        <div className="w-full">
          <div className="flex justify-center mb-2">
            <span
              className={`font-semibold text-lg ${
                isDark ? "text-gray-200" : "text-gray-900"
              }`}
            >
              Stress Tokens
            </span>
          </div>

          <div className="flex items-center justify-center space-x-4 mb-4">
            <TokenButton
              onClick={removeStress}
              disabled={stress === 0}
              isDark={isDark}
            >
              –
            </TokenButton>

            <span
              className={`text-3xl font-mono ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {stress}
            </span>

            <TokenButton
              onClick={addStress}
              disabled={stress === maxTokens}
              isDark={isDark}
            >
              +
            </TokenButton>
          </div>

          <div
            className={`relative w-full h-5 rounded-full overflow-hidden shadow-inner transition-colors duration-300 ${
              isDark ? "bg-zinc-700" : "bg-gray-300"
            }`}
          >
            <motion.div
              className={`${stressBarColor} h-full rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${stressPercent}%` }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
