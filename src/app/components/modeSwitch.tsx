"use client";

import { useTrackerStore } from "@/stores/useTrackerStore";
import { motion } from "motion/react";
import { User, Eye } from "lucide-react";

export default function ModeSwitch() {
  const { mode, setMode } = useTrackerStore();

  const modes = [
    { label: "PLAYER", icon: <User className="w-5 h-5 mr-2" /> },
    { label: "DM", icon: <Eye className="w-5 h-5 mr-2" /> },
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="grid grid-cols-2 border-2 border-neutral-300 dark:border-neutral-700 rounded-xl overflow-hidden shadow-md">
        {modes.map(({ label, icon }) => {
          const isActive = mode === label;
          return (
            <motion.button
              key={label}
              onClick={() => setMode(label as "PLAYER" | "DM")}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800 hover:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
                }`}
            >
              {icon}
              {label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
