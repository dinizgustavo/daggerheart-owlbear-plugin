"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { Die } from "./die";
import TokenButton from "./tokenButton";
import ColorPicker from "./colorPicker";

const rollD12 = () => Math.ceil(Math.random() * 12);

export default function DualityDice() {
  const { isDark } = useTheme();
  const [hope, setHope] = useState<number | null>(null);
  const [fear, setFear] = useState<number | null>(null);
  const [modifier, setModifier] = useState<number>(0);
  const [isRolling, setIsRolling] = useState(false);
  const [critical, setCritical] = useState(false);
  const [showColorPickers, setShowColorPickers] = useState(false);

  const [hopeColors, setHopeColors] = useState({
    fill: isDark ? "#F59E0B" : "#ffcc00",
    text: isDark ? "#F9FAFB" : "#111827",
  });

  const [fearColors, setFearColors] = useState({
    fill: isDark ? "#7C3AED" : "#C4B5FD",
    text: isDark ? "#F9FAFB" : "#111827",
  });

  const updateHopeColor = (property: keyof typeof hopeColors, value: string) =>
    setHopeColors((prev) => ({ ...prev, [property]: value }));

  const updateFearColor = (property: keyof typeof fearColors, value: string) =>
    setFearColors((prev) => ({ ...prev, [property]: value }));

  const handleRoll = async () => {
    if (isRolling) return;
    setIsRolling(true);
    setCritical(false);
    setHope(null);
    setFear(null);

    await new Promise((r) => setTimeout(r, 800));
    const hopeRoll = rollD12();
    const fearRoll = rollD12();
    setHope(hopeRoll);
    setFear(fearRoll);
    if (hopeRoll === fearRoll) setCritical(true);
    setIsRolling(false);
  };

  const getDominant = () => {
    if (hope === null || fear === null) return null;
    if (hope === fear) return "critical";
    return hope > fear ? "hope" : "fear";
  };

  const dominant = getDominant();
  const total =
    hope !== null && fear !== null ? hope + fear + modifier : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full max-w-md mx-auto rounded-3xl p-6 sm:p-8 text-center select-none
        ${
          isDark
            ? "bg-gradient-to-br from-zinc-900 to-zinc-800 text-zinc-100 border-zinc-700"
            : "bg-white text-zinc-900 border-zinc-200"
        }
        shadow-xl border transition`}
    >
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-6">Duality Dice</h2>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
        <button
          onClick={handleRoll}
          disabled={isRolling}
          className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold transition disabled:opacity-50"
        >
          {isRolling ? "Rolling..." : "Roll Hope & Fear"}
        </button>

        <button
          onClick={() => setShowColorPickers(!showColorPickers)}
          className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl font-semibold transition"
          aria-label="Change dice colors"
        >
          🎨
        </button>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">Modifier</label>
        <div className="flex items-center justify-center gap-4">
          <TokenButton
            onClick={() => setModifier((prev) => Math.max(0, prev - 1))}
            disabled={modifier <= 0 || isRolling}
            isDark={isDark}
          >
            –
          </TokenButton>
          <span className="text-xl font-semibold w-8 text-center">
            {modifier}
          </span>
          <TokenButton
            onClick={() => setModifier((prev) => Math.min(10, prev + 1))}
            disabled={modifier >= 10 || isRolling}
            isDark={isDark}
          >
            +
          </TokenButton>
        </div>
      </div>

      {showColorPickers && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
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
              label="Text"
              color={hopeColors.text}
              onChange={(c) => updateHopeColor("text", c)}
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
              label="Text"
              color={fearColors.text}
              onChange={(c) => updateFearColor("text", c)}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 mb-4">
        <Die
          sides={12}
          size={96}
          baseColor={hopeColors.fill}
          textColor={hopeColors.text}
          customValue={hope}
          isRolling={isRolling}
          hideButton
        />
        <Die
          sides={12}
          size={96}
          baseColor={fearColors.fill}
          textColor={fearColors.text}
          customValue={fear}
          isRolling={isRolling}
          hideButton
        />
      </div>

      {dominant && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-6 space-y-2"
        >
          <p
            className={`text-xl sm:text-2xl font-bold ${
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
          </p>

          {dominant !== "critical" && total !== undefined && (
            <p className="text-base sm:text-lg font-medium">
              Total = {hope} + {fear} + {modifier} ={" "}
              <span className="font-bold">{total}</span>
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
