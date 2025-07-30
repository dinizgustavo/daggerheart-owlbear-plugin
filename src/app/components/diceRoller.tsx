"use client";

import { useState } from "react";
import DiceIcon from "./diceIcon";
import DiceSelector from "./diceSelector";

type DiceType = "d4" | "d6" | "d8" | "d10" | "d12" | "d20" | "d100";

const diceSides: Record<DiceType, number> = {
  d4: 4,
  d6: 6,
  d8: 8,
  d10: 10,
  d12: 12,
  d20: 20,
  d100: 100,
};

export default function DiceRoller() {
  const [selectedDice, setSelectedDice] = useState<DiceType>("d20");
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState<number[]>([]);

  const rollDice = () => {
    const sides = diceSides[selectedDice];
    const rolls = Array.from({ length: quantity }, () =>
      Math.ceil(Math.random() * sides)
    );
    setResults(rolls);
  };

  return (
    <div
      className="rounded-3xl p-8 max-w-2xl mx-auto select-none
  bg-white dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800
  text-zinc-900 dark:text-zinc-100 shadow-xl dark:shadow-zinc-900 border border-zinc-200 dark:border-zinc-700 transition"
    >
      <h2 className="text-3xl font-extrabold mb-6 text-center">Dice Roller</h2>

      {/* Seletor de dados */}
      <div className="mb-6">
        <DiceSelector selected={selectedDice} onSelect={setSelectedDice} />
      </div>

      {/* Controles quantidade e dado */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition"
        >
          -
        </button>

        <div className="relative">
          <DiceIcon type={selectedDice} size={100} value={null} />
          <span className="absolute -bottom-3 right-1 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full shadow">
            x{quantity}
          </span>
        </div>

        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition"
        >
          +
        </button>
      </div>

      {/* Botão rolar */}
      <button
        onClick={rollDice}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition"
      >
        Rolar {quantity} {selectedDice}
      </button>

      {/* Resultados */}
      {results.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mt-6 min-h-[160px]">
          {results.map((r, i) => (
            <DiceIcon key={i} type={selectedDice} size={60} value={r} />
          ))}
        </div>
      )}
    </div>
  );
}
