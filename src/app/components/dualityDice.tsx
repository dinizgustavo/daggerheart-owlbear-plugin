"use client";

import { useState } from "react";
import DiceIcon from "@/app/components/diceIcon";
import { DiceAnimator } from "./diceAnimator";

const rollD12 = () => Math.ceil(Math.random() * 12);

export default function DualityDice() {
  const [hope, setHope] = useState<number | null>(null);
  const [fear, setFear] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [critical, setCritical] = useState(false);

  const handleRoll = async () => {
    if (isRolling) return;

    setIsRolling(true);
    setCritical(false);

    const hopeRoll = rollD12();
    const fearRoll = rollD12();

    await new Promise((resolve) => setTimeout(resolve, 1500));

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

  const hopeColor = "#F0E68C"; // amarelo claro
  const fearColor = "#DDA0DD"; // roxo claro

  return (
    <div
      className="rounded-3xl p-8 max-w-md mx-auto text-center select-none
      bg-white dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800
      text-zinc-900 dark:text-zinc-100 shadow-xl dark:shadow-zinc-900 border border-zinc-200 dark:border-zinc-700 transition"
    >
      <h2 className="text-3xl font-extrabold mb-6">Duality Dice</h2>

      <button
        onClick={handleRoll}
        disabled={isRolling}
        className="mb-6 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500
        text-white rounded-xl font-semibold transition disabled:opacity-50"
      >
        {isRolling ? "Rolling..." : "Roll Hope & Fear Dice"}
      </button>

      <div className="flex justify-center gap-12">
        {/* <DiceAnimator isRolling={isRolling}>
          <DiceIcon type="d12" size={96} color={hopeColor} value={hope} />
        </DiceAnimator> */}
        <DiceIcon type="d12" size={96} color={hopeColor} value={hope} />

        {/* <DiceAnimator isRolling={isRolling}>
          <DiceIcon type="d12" size={96} color={fearColor} value={fear} />
        </DiceAnimator> */}
        <DiceIcon type="d12" size={96} color={fearColor} value={fear} />
      </div>

      {dominant && (
        <p
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
        </p>
      )}
    </div>
  );
}
