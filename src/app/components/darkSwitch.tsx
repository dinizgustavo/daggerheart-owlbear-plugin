"use client";

import { useTheme } from "../contexts/ThemeContext";

export default function darkSwitch() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 rounded-full transition-colors duration-300 ${
        isDark ? "bg-yellow-400 text-black" : "bg-gray-800 text-white"
      }`}
    >
      {isDark ? "Modo Claro ☀️" : "Modo Escuro 🌙"}
    </button>
  );
}
