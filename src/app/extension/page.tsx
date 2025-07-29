"use client";

import { useEffect, useState } from "react";
import DualityDice from "@/app/components/dualityDice";
import { useTheme } from "../contexts/ThemeContext";

export default function Extension() {
  const { isDark } = useTheme();

  return (
    <main
      className={`min-h-screen ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      } py-16 px-8`}
    >
      <h1
        className={`text-center text-4xl font-extrabold mb-12 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Daggerheart Toolkit
      </h1>
      <DualityDice />
    </main>
  );
}
