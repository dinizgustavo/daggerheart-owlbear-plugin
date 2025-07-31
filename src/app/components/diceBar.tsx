"use client";

import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Die } from "./die";
import { motion } from "framer-motion";

type DiceType = 4 | 6 | 8 | 10 | 12 | 20 | 100;

const diceList: DiceType[] = [4, 6, 8, 10, 12, 20, 100];

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

export default function DiceBar() {
  const { isDark } = useTheme();

  const [selectedDice, setSelectedDice] = useState<DiceType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [rollResults, setRollResults] = useState<number[]>([]);
  const [history, setHistory] = useState<
    { dice: DiceType; quantity: number; results: number[] }[]
  >([]);

  // Cores base para dados ajustadas para dark/light mode
  const baseColor = isDark ? "#1F2937" : "#E5E7EB"; // fundo do dado
  const edgeColor = isDark ? "#9CA3AF" : "#374151"; // borda do dado
  const textColor = isDark ? "#F9FAFB" : "#111827"; // número do dado
  const textOutline = isDark ? "#000000" : "#FFFFFF"; // contorno texto

  // Função para rolar vários dados e devolver array de resultados
  const rollDice = (dice: DiceType, qty: number): number[] => {
    const results = [];
    for (let i = 0; i < qty; i++) {
      results.push(Math.floor(Math.random() * dice) + 1);
    }
    return results;
  };

  const onRollClick = () => {
    if (!selectedDice) return;
    setIsRolling(true);
    setRollResults([]);

    setTimeout(() => {
      const results = rollDice(selectedDice, quantity);
      setRollResults(results);
      setHistory((prev) => [
        { dice: selectedDice, quantity, results },
        ...prev,
      ]);
      setIsRolling(false);
    }, 800);
  };

  const increment = () => setQuantity((q) => (q < 20 ? q + 1 : q));
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : q));

  return (
    <div
      className={`rounded-3xl p-6 max-w-lg mx-auto border shadow-xl
      ${
        isDark
          ? "bg-gradient-to-br from-zinc-900 to-zinc-800 text-zinc-100 border-zinc-700"
          : "bg-white text-zinc-900 border-zinc-200"
      }`}
    >
      <h2 className="text-2xl font-extrabold mb-4 text-center">Dice Bar</h2>

      {/* Barra de dados */}
      <div className="flex justify-center gap-6 mb-6 flex-wrap">
        {diceList.map((d) => (
          <button
            key={d}
            onClick={() => {
              setSelectedDice(d);
              setQuantity(1);
              setRollResults([]);
            }}
            className={`p-1 rounded-md border-2 transition
              ${
                selectedDice === d
                  ? "border-indigo-500 scale-110"
                  : "border-transparent hover:border-indigo-300"
              }
              focus:outline-none`}
            aria-label={`Select d${d}`}
          >
            <Die
              sides={d === 100 ? 10 : d}
              size={48}
              baseColor={baseColor}
              edgeColor={edgeColor}
              textColor={textColor}
              textOutlineColor={textOutline}
              hideButton
              customValue={null}
              isRolling={false}
            />
          </button>
        ))}
      </div>

      {/* Controle de quantidade e botão de rolar */}
      {selectedDice && (
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <TokenButton
              onClick={decrement}
              disabled={quantity <= 1}
              isDark={isDark}
            >
              –
            </TokenButton>

            <div className="text-xl font-semibold min-w-[2.5rem] text-center">
              {quantity}
            </div>

            <TokenButton
              onClick={increment}
              disabled={quantity >= 20}
              isDark={isDark}
            >
              +
            </TokenButton>
          </div>

          <button
            onClick={onRollClick}
            disabled={isRolling}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold transition disabled:opacity-50"
          >
            {isRolling ? "Rolling..." : `Roll ${quantity}d${selectedDice}`}
          </button>
        </div>
      )}

      {/* Resultados individuais dos dados rolados */}
      {rollResults.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {rollResults.map((result, idx) => (
            <Die
              key={idx}
              sides={selectedDice === 100 ? 10 : selectedDice!}
              size={64}
              baseColor={baseColor}
              edgeColor={edgeColor}
              textColor={textColor}
              textOutlineColor={textOutline}
              customValue={result}
              hideButton
              isRolling={false}
            />
          ))}
        </div>
      )}

      {/* Histórico resumido */}
      {history.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2 text-center">Roll History</h3>
          <ul className="max-h-48 overflow-y-auto space-y-1 text-sm">
            {history.map((entry, i) => (
              <li
                key={i}
                className={`px-3 py-1 rounded ${
                  isDark
                    ? "bg-indigo-900 text-indigo-300"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {entry.quantity}d{entry.dice} rolled — Results:{" "}
                {entry.results.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
