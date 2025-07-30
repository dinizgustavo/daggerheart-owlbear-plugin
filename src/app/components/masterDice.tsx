"use client";

import { useState } from "react";
import DiceIcon from "./diceIcon";
import { DiceAnimator } from "./diceAnimator";

const rollD20 = () => Math.ceil(Math.random() * 20);

export default function MasterDice() {
  const [result, setResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [isCritical, setIsCritical] = useState(false);

  const handleRoll = async () => {
    if (isRolling) return;

    setIsRolling(true);
    setIsCritical(false);

    const roll = rollD20();

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setResult(roll);

    if (roll === 20 || roll === 1) {
      setIsCritical(true);
    }

    setIsRolling(false);
  };

  return (
    <div
      className="rounded-3xl p-8 max-w-md mx-auto text-center select-none
      bg-white dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800
      text-zinc-900 dark:text-zinc-100 shadow-xl dark:shadow-zinc-900 border border-zinc-200 dark:border-zinc-700 transition"
    >
      <h2 className="text-3xl font-extrabold mb-6">Master D20</h2>

      <button
        onClick={handleRoll}
        disabled={isRolling}
        className="mb-6 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500
        text-white rounded-xl font-semibold transition disabled:opacity-50"
      >
        {isRolling ? "Rolling..." : "Roll D20"}
      </button>

      <div className="flex justify-center">
        {/* <DiceAnimator isRolling={isRolling}>
          <DiceIcon type="d20" size={96} color="#4A5568" value={result} />
        </DiceAnimator> */}
        <DiceIcon type="d20" size={96} color="#4A5568" value={result} />
      </div>

      {result && isCritical && (
        <p
          className={`mt-8 text-2xl font-bold transition ${
            result === 20
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {result === 20 ? "🎯 Critical Success!" : "💥 Critical Failure!"}
        </p>
      )}
    </div>
  );
}
