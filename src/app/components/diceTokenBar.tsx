"use client";

import { useTrackerStore } from "@/stores/useTrackerStore";
import { motion } from "motion/react";

export default function DiceTokenBar() {
  const { mode, hope, fear, addHope, removeHope, addFear, removeFear } =
    useTrackerStore();

  const label = mode === "PLAYER" ? "Hope" : "Fear";
  const value = mode === "PLAYER" ? hope : fear;
  const add = mode === "PLAYER" ? addHope : addFear;
  const remove = mode === "PLAYER" ? removeHope : removeFear;

  const maxTokens = 10;
  const progressPercent = Math.min((value / maxTokens) * 100, 100);

  const barColor =
    mode === "PLAYER"
      ? "bg-yellow-400 dark:bg-yellow-300"
      : "bg-purple-400 dark:bg-yellow-300";

  return (
    <div className="flex flex-col items-center my-6 w-full px-4 max-w-md mx-auto">
      <span className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-200">
        {label} Tokens
      </span>

      <div className="flex items-center space-x-4 mb-4">
        <motion.button
          onClick={remove}
          className="w-10 h-10 rounded-full bg-red-500 text-white font-bold text-xl shadow hover:bg-red-600 dark:shadow-zinc-800"
          whileTap={{ scale: 0.9 }}
        >
          –
        </motion.button>

        <span className="text-3xl font-mono text-gray-900 dark:text-white">
          {value}
        </span>

        <motion.button
          onClick={add}
          className="w-10 h-10 rounded-full bg-green-500 text-white font-bold text-xl shadow hover:bg-green-600 dark:shadow-zinc-800"
          whileTap={{ scale: 0.9 }}
        >
          +
        </motion.button>
      </div>

      {/* Barra de progresso animada */}
      <div className="relative w-full h-5 bg-gray-300 dark:bg-zinc-700 rounded-full overflow-hidden shadow-inner transition-colors duration-300">
        <motion.div
          className={`${barColor} h-full rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
        />
      </div>
    </div>
  );
}
