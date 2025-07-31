"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { Die } from "./die"; // Usando o componente genérico
import ColorPicker from "./colorPicker";

const rollD12 = () => Math.ceil(Math.random() * 12);

export default function DualityDice() {
  const { isDark } = useTheme();
  const [hope, setHope] = useState<number | null>(null);
  const [fear, setFear] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [critical, setCritical] = useState(false);

  const [hopeColors, setHopeColors] = useState({
    fill: isDark ? "#F59E0B" : "#FDE68A", // amarelão escuro / amarelo claro
    edge: isDark ? "#B45309" : "#CA8A04", // borda amarelo queimado
    text: isDark ? "#F9FAFB" : "#111827", // texto claro / texto escuro
    outline: isDark ? "#000000" : "#FFFFFF", // contorno preto / branco
  });

  const [fearColors, setFearColors] = useState({
    fill: isDark ? "#7C3AED" : "#C4B5FD", // roxo escuro / roxo claro
    edge: isDark ? "#5B21B6" : "#7C3AED", // borda roxo mais escuro
    text: isDark ? "#F9FAFB" : "#111827", // texto claro / texto escuro
    outline: isDark ? "#000000" : "#FFFFFF", // contorno preto / branco
  });

  const [showColorPickers, setShowColorPickers] = useState(false);

  const updateHopeColor = (
    property: keyof typeof hopeColors,
    value: string
  ) => {
    setHopeColors((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const updateFearColor = (
    property: keyof typeof fearColors,
    value: string
  ) => {
    setFearColors((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const handleRoll = async () => {
    if (isRolling) return;

    setIsRolling(true);
    setCritical(false);
    setHope(null);
    setFear(null);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const hopeRoll = rollD12();
    const fearRoll = rollD12();

    setHope(hopeRoll);
    setFear(fearRoll);

    if (hopeRoll === fearRoll) {
      setCritical(true);
    }

    setIsRolling(false);
  };

  const getDominant = () => {
    if (hope === null || fear === null) return null;
    if (hope === fear) return "critical";
    if (hope > fear) return "hope";
    return "fear";
  };

  const dominant = getDominant();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-3xl p-8 max-w-md mx-auto text-center select-none
        ${
          isDark
            ? "bg-gradient-to-br from-zinc-900 to-zinc-800 text-zinc-100 border-zinc-700"
            : "bg-white text-zinc-900 border-zinc-200"
        }
        shadow-xl border transition`}
    >
      <h2 className="text-3xl font-extrabold mb-6">Duality Dice</h2>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={handleRoll}
          disabled={isRolling}
          className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold transition disabled:opacity-50"
        >
          {isRolling ? "Rolling..." : "Roll Hope & Fear"}
        </button>

        {/* <button
          onClick={() => setShowColorPickers(!showColorPickers)}
          className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl font-semibold transition"
          aria-label="Change dice colors"
        >
          🎨
        </button> */}
      </div>

      {/* {showColorPickers && (
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <h4 className="text-lg font-semibold mb-2 text-yellow-600 dark:text-yellow-300">
              Hope Dice
            </h4>
            <ColorPicker
              label="Fill"
              color={hopeColors.fill}
              onChange={(c) => updateHopeColor("fill", c)}
            />
            <ColorPicker
              label="Edge"
              color={hopeColors.edge}
              onChange={(c) => updateHopeColor("edge", c)}
            />
            <ColorPicker
              label="Text"
              color={hopeColors.text}
              onChange={(c) => updateHopeColor("text", c)}
            />
            <ColorPicker
              label="Outline"
              color={hopeColors.outline}
              onChange={(c) => updateHopeColor("outline", c)}
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2 text-purple-600 dark:text-purple-300">
              Fear Dice
            </h4>
            <ColorPicker
              label="Fill"
              color={fearColors.fill}
              onChange={(c) => updateFearColor("fill", c)}
            />
            <ColorPicker
              label="Edge"
              color={fearColors.edge}
              onChange={(c) => updateFearColor("edge", c)}
            />
            <ColorPicker
              label="Text"
              color={fearColors.text}
              onChange={(c) => updateFearColor("text", c)}
            />
            <ColorPicker
              label="Outline"
              color={fearColors.outline}
              onChange={(c) => updateFearColor("outline", c)}
            />
          </div>
        </div>
      )} */}

      <div className="flex justify-center gap-12">
        <Die
          sides={12}
          size={96}
          baseColor={hopeColors.fill}
          edgeColor={hopeColors.edge}
          textColor={hopeColors.text}
          textOutlineColor={hopeColors.outline}
          customValue={hope}
          isRolling={isRolling}
          hideButton
        />

        <Die
          sides={12}
          size={96}
          baseColor={fearColors.fill}
          edgeColor={fearColors.edge}
          textColor={fearColors.text}
          textOutlineColor={fearColors.outline}
          customValue={fear}
          isRolling={isRolling}
          hideButton
        />
      </div>

      {dominant && (
        <motion.p
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`mt-8 text-2xl font-bold transition ${
            dominant === "hope"
              ? "text-yellow-500 dark:text-yellow-300"
              : dominant === "fear"
              ? "text-purple-700 dark:text-purple-300"
              : "text-green-600 dark:text-green-400"
          }`}
        >
          {dominant === "critical"
            ? "🎉 CRITICAL!"
            : `Dominant: ${
                dominant.charAt(0).toUpperCase() + dominant.slice(1)
              }`}
        </motion.p>
      )}
    </motion.div>
  );
}
