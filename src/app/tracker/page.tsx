"use client";

import { useEffect, useState } from "react";
import DualityDice from "@/app/components/dualityDice";
import MasterDice from "@/app/components/masterDice";
import ModeSwitch from "@/app/components/modeSwitch";
import DiceRoller from "@/app/components/diceRoller";
import DarkSwitch from "@/app/components/darkSwitch";
import { useTheme } from "../contexts/ThemeContext";
import DiceTokenBar from "../components/diceTokenBar";
import { useTrackerStore } from "@/stores/useTrackerStore";

export default function Tracker() {
  const { isDark } = useTheme();
  const { mode } = useTrackerStore();

  return (
    <main
      className={`min-h-screen flex items-center justify-center ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      } py-16 px-4`}
    >
      <div
        className={`w-full max-w-3xl p-6 rounded-2xl shadow-2xl ${
          isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold">Daggerheart Toolkit</h1>
          <DarkSwitch />
        </div>

        <div className="flex justify-center mb-6">
          <ModeSwitch />
        </div>

        <div className="flex flex-col items-center gap-6">
          {mode === "PLAYER" ? <DualityDice /> : <MasterDice />}
          <DiceTokenBar />
          <DiceRoller />
        </div>
      </div>
    </main>
  );
}
