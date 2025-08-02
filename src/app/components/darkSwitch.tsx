"use client";

import { useTheme } from "../contexts/ThemeContext";

export default function DarkSwitch() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-colors duration-300
        text-sm sm:text-base
        ${isDark ? "bg-yellow-400 text-black" : "bg-gray-800 text-white"}
        hover:${isDark ? "bg-yellow-300" : "bg-gray-700"}
        active:scale-95 transform transition-transform
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${isDark ? "focus:ring-yellow-500" : "focus:ring-gray-500"}
      `}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="hidden sm:inline">
        {isDark ? "Light Mode" : "Dark Mode"}
      </span>
      <span className="sm:hidden">{isDark ? "☀️" : "🌙"}</span>
      <span className="hidden sm:inline ml-1">{isDark ? "☀️" : "🌙"}</span>
    </button>
  );
}
