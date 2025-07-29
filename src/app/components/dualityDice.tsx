"use client";

import { useState, useCallback } from "react";
import { motion, useAnimation } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";

const rollD12 = () => Math.ceil(Math.random() * 12);

export default function DualityDice() {
  const { isDark, toggleTheme } = useTheme();
  const [hope, setHope] = useState<number | null>(null);
  const [fear, setFear] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [critical, setCritical] = useState(false);

  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-3 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );

  const hopeControls = useAnimation();
  const fearControls = useAnimation();

  const rollDice = useCallback(() => {
    if (isRolling) return;

    setIsRolling(true);
    setCritical(false);

    // Remover await do stop pois pode ser sync
    hopeControls.stop();
    fearControls.stop();

    // Animação
    const animation = {
      rotateY: 1080,
      rotateX: 720,
      transition: {
        duration: 1.5,
        easing: "ease-out",
      },
    };

    // Rolagem dos dados
    const hopeRoll = rollD12();
    const fearRoll = rollD12();

    // Start animações (sem await)
    hopeControls.start(animation);
    fearControls.start(animation);

    // Depois do tempo da animação, atualizamos valores e resetamos rotações
    setTimeout(() => {
      setHope(hopeRoll);
      setFear(fearRoll);

      if (hopeRoll === fearRoll) setCritical(true);

      // Resetar rotação suavemente
      hopeControls.start({
        rotateY: 0,
        rotateX: 0,
        transition: { duration: 0.5 },
      });
      fearControls.start({
        rotateY: 0,
        rotateX: 0,
        transition: { duration: 0.5 },
      });

      // Depois do reset, libera botão
      setTimeout(() => {
        setIsRolling(false);
      }, 500);
    }, 1500);
  }, [isRolling, hopeControls, fearControls]);

  const hopeColor = isDark
    ? "bg-yellow-500 text-yellow-950 border-yellow-600"
    : "bg-yellow-400 text-yellow-900 border-yellow-500";

  const fearColor = isDark
    ? "bg-purple-800 text-purple-200 border-purple-700"
    : "bg-purple-700 text-purple-300 border-purple-600";

  const getDominant = () => {
    if (hope === null || fear === null) return null;
    if (hope === fear) return "critical";
    if (hope > fear) return "hope";
    return "fear";
  };

  const dominant = getDominant();

  return (
    <div
      className={`bg-${
        isDark ? "gray-800" : "white"
      } rounded-3xl p-8 max-w-md mx-auto shadow-lg text-center select-none`}
    >
      <ThemeToggle />
      <h2
        className={`text-3xl font-extrabold mb-6 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Duality Dice
      </h2>

      <button
        onClick={rollDice}
        disabled={isRolling}
        className={`mb-6 px-6 py-3 ${
          isDark ? "bg-indigo-600" : "bg-indigo-500"
        } hover:opacity-90 text-white rounded-xl font-semibold transition disabled:opacity-50`}
      >
        {isRolling ? "Rolling..." : "Roll Hope & Fear Dice"}
      </button>

      <div className="flex justify-center gap-12">
        <motion.div
          animate={hopeControls}
          className={`w-24 h-24 flex items-center justify-center rounded-xl border-8 ${hopeColor} text-6xl font-black shadow-lg`}
          style={{ perspective: 800 }}
          key={`hope-${hope !== null ? hope.toString() : "initial"}`}
        >
          {hope ?? "?"}
        </motion.div>

        <motion.div
          animate={fearControls}
          className={`w-24 h-24 flex items-center justify-center rounded-xl border-8 ${fearColor} text-6xl font-black shadow-lg`}
          style={{ perspective: 800 }}
          key={`fear-${fear !== null ? fear.toString() : "initial"}`}
        >
          {fear ?? "?"}
        </motion.div>
      </div>

      {dominant && (
        <p
          className={`mt-8 text-2xl font-bold ${
            dominant === "hope"
              ? isDark
                ? "text-yellow-400"
                : "text-yellow-600"
              : dominant === "fear"
              ? isDark
                ? "text-purple-400"
                : "text-purple-700"
              : isDark
              ? "text-green-400"
              : "text-green-600"
          }`}
        >
          {dominant === "critical"
            ? "🎉 CRITICAL! Hope wins on a tie!"
            : `Dominant: ${
                dominant.charAt(0).toUpperCase() + dominant.slice(1)
              }`}
        </p>
      )}
    </div>
  );
}
