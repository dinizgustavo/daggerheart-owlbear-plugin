"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { Die } from "./die";
import ColorPicker from "./colorPicker";

export default function MasterDice() {
  const { isDark } = useTheme();

  const [diceColors, setDiceColors] = useState({
    fill: isDark ? "#1F2937" : "#F3F4F6", // cinza escuro / cinza claro
    edge: isDark ? "#9CA3AF" : "#4B5563", // cinza médio / cinza escuro
    text: isDark ? "#F9FAFB" : "#111827", // quase branco / quase preto
    outline: isDark ? "#000000" : "#FFFFFF", // preto / branco
  });

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [rollResult, setRollResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const updateDiceColor = (key: keyof typeof diceColors, value: string) => {
    setDiceColors((prev) => ({ ...prev, [key]: value }));
  };

  const rollMasterDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    setRollResult(null);

    setTimeout(() => {
      const roll = Math.ceil(Math.random() * 20);
      setRollResult(roll);
      setIsRolling(false);
    }, 800);
  };

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
      <h2 className="text-3xl font-extrabold mb-6">Master D20</h2>

      {/* Botões abaixo do título */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={rollMasterDice}
          disabled={isRolling}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition disabled:opacity-50"
        >
          {isRolling ? "Rolling..." : "Roll Master D20"}
        </button>

        {/* <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl font-semibold transition"
          aria-label="Change dice colors"
        >
          🎨
        </button> */}
      </div>

      {/* Seletor de cores em linha */}
      {/* {showColorPicker && (
        <div className="flex justify-center gap-6 mb-6 max-w-lg mx-auto">
          <ColorPicker
            label="Fill"
            color={diceColors.fill}
            onChange={(c) => updateDiceColor("fill", c)}
          />
          <ColorPicker
            label="Edge"
            color={diceColors.edge}
            onChange={(c) => updateDiceColor("edge", c)}
          />
          <ColorPicker
            label="Text"
            color={diceColors.text}
            onChange={(c) => updateDiceColor("text", c)}
          />
          <ColorPicker
            label="Outline"
            color={diceColors.outline}
            onChange={(c) => updateDiceColor("outline", c)}
          />
        </div>
      )} */}

      {/* Dado */}
      <Die
        sides={20}
        size={150}
        baseColor={diceColors.fill}
        edgeColor={diceColors.edge}
        textColor={diceColors.text}
        textOutlineColor={diceColors.outline}
        hideButton
        customValue={rollResult}
        isRolling={isRolling}
      />

      {/* Resultado */}
      {rollResult !== null && (
        <p
          className={`mt-6 text-2xl font-bold ${
            rollResult === 20
              ? "text-green-500"
              : rollResult === 1
              ? "text-red-600"
              : isDark
              ? "text-gray-300"
              : "text-gray-800"
          }`}
        >
          {rollResult === 20
            ? "🎉 Critical Hit!"
            : rollResult === 1
            ? "💀 Critical Fail!"
            : `Result: ${rollResult}`}
        </p>
      )}
    </motion.div>
  );
}
