"use client";

import { useTrackerStore } from "@/stores/useTrackerStore";
import { motion } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";
import TokenButton from "./tokenButton";
import { useState } from "react";

export default function DiceTokenBar() {
  const { mode, hope, fear, stress, setHope, setFear, setStress } =
    useTrackerStore();
  const { isDark } = useTheme();

  // Estados
  const [maxHope, setMaxHope] = useState(10);
  const [maxFear, setMaxFear] = useState(5);
  const [maxStress, setMaxStress] = useState(10);
  const [maxHealth, setMaxHealth] = useState(5);
  const [currentHealth, setCurrentHealth] = useState(5);
  const [maxArmor, setMaxArmor] = useState(3);
  const [currentArmor, setCurrentArmor] = useState(3);
  const [evasion, setEvasion] = useState(0);
  const [majorDamage, setMajorDamage] = useState(0);
  const [severeDamage, setSevereDamage] = useState(0);

  // Funções de incremento/decremento (mesmas do código anterior)
  const incrementHope = () => hope < maxHope && setHope(hope + 1);
  const decrementHope = () => hope > 0 && setHope(hope - 1);
  const incrementFear = () => fear < maxFear && setFear(fear + 1);
  const decrementFear = () => fear > 0 && setFear(fear - 1);
  const incrementStress = () => stress < maxStress && setStress(stress + 1);
  const decrementStress = () => stress > 0 && setStress(stress - 1);
  const incrementHealth = () =>
    currentHealth < maxHealth && setCurrentHealth(currentHealth + 1);
  const decrementHealth = () =>
    currentHealth > 0 && setCurrentHealth(currentHealth - 1);
  const incrementArmor = () =>
    currentArmor < maxArmor && setCurrentArmor(currentArmor + 1);
  const decrementArmor = () =>
    currentArmor > 0 && setCurrentArmor(currentArmor - 1);

  // Variáveis condicionais
  const hopeFearLabel = mode === "PLAYER" ? "Hope" : "Fear";
  const hopeFearValue = mode === "PLAYER" ? hope : fear;
  const maxHopeFear = mode === "PLAYER" ? maxHope : maxFear;
  const incrementHopeFear = mode === "PLAYER" ? incrementHope : incrementFear;
  const decrementHopeFear = mode === "PLAYER" ? decrementHope : decrementFear;

  const hopeFearPercent = Math.min((hopeFearValue / maxHopeFear) * 100, 100);
  const stressPercent = Math.min((stress / maxStress) * 100, 100);

  const hopeFearBarColor =
    mode === "PLAYER"
      ? isDark
        ? "bg-yellow-700"
        : "bg-yellow-500"
      : isDark
      ? "bg-yellow-300"
      : "bg-yellow-400";

  const stressBarColor = isDark ? "bg-red-700" : "bg-red-500";

  // Renderizar corações de vida
  const renderHearts = () => {
    return Array.from({ length: maxHealth }, (_, i) => (
      <button
        key={i}
        onClick={() => setCurrentHealth(i + 1)}
        className="transition-transform hover:scale-110 active:scale-95"
      >
        {i < currentHealth ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-7 h-7 ${isDark ? "text-red-500" : "text-red-600"}`}
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-7 h-7 ${isDark ? "text-red-900" : "text-red-300"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        )}
      </button>
    ));
  };

  // Renderizar ícones de armadura
  const renderArmor = () => {
    return Array.from({ length: maxArmor }, (_, i) => (
      <button
        key={i}
        onClick={() => setCurrentArmor(i + 1)}
        className="transition-transform hover:scale-110 active:scale-95"
      >
        {i < currentArmor ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-7 h-7 ${isDark ? "text-blue-400" : "text-blue-600"}`}
          >
            <path
              fillRule="evenodd"
              d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-7 h-7 ${isDark ? "text-blue-800" : "text-blue-300"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z"
            />
          </svg>
        )}
      </button>
    ));
  };

  return (
    <div className="flex flex-col items-center w-full px-2 sm:px-4 max-w-md mx-auto space-y-4">
      {/* Hope & Stress Tokens */}
      <div
        className={`w-full rounded-2xl sm:rounded-3xl p-4 border shadow-inner ${
          isDark
            ? "bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700"
            : "bg-white border-zinc-200"
        }`}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Hope/Fear */}
          <div className="flex-1">
            <div className="flex justify-center mb-1 sm:mb-2">
              <span
                className={`font-semibold ${
                  isDark ? "text-gray-200" : "text-gray-900"
                }`}
              >
                {hopeFearLabel} Tokens
              </span>
            </div>

            <div className="flex justify-center items-center gap-2 mb-2">
              <label
                className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Max:
              </label>
              <input
                type="number"
                min={1}
                max={999}
                value={maxHopeFear}
                onChange={(e) => {
                  const val = Math.max(
                    1,
                    Math.min(999, Number(e.target.value))
                  );
                  mode === "PLAYER" ? setMaxHope(val) : setMaxFear(val);
                  if (hopeFearValue > val)
                    mode === "PLAYER" ? setHope(val) : setFear(val);
                }}
                className={`w-16 px-2 py-1 rounded border text-center ${
                  isDark
                    ? "bg-zinc-800 border-zinc-600 text-gray-200"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
              <TokenButton
                onClick={decrementHopeFear}
                disabled={hopeFearValue === 0}
                isDark={isDark}
              >
                –
              </TokenButton>
              <span
                className={`text-2xl font-mono ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {hopeFearValue}
              </span>
              <TokenButton
                onClick={incrementHopeFear}
                disabled={hopeFearValue === maxHopeFear}
                isDark={isDark}
              >
                +
              </TokenButton>
            </div>

            <div
              className={`relative w-full h-3 sm:h-4 rounded-full overflow-hidden ${
                isDark ? "bg-zinc-700" : "bg-gray-200"
              }`}
            >
              <motion.div
                className={`h-full rounded-full ${hopeFearBarColor}`}
                initial={{ width: 0 }}
                animate={{ width: `${hopeFearPercent}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              />
            </div>
          </div>

          {/* Stress */}
          <div className="flex-1">
            <div className="flex justify-center mb-1 sm:mb-2">
              <span
                className={`font-semibold ${
                  isDark ? "text-gray-200" : "text-gray-900"
                }`}
              >
                Stress Tokens
              </span>
            </div>

            <div className="flex justify-center items-center gap-2 mb-2">
              <label
                className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Max:
              </label>
              <input
                type="number"
                min={1}
                max={999}
                value={maxStress}
                onChange={(e) => {
                  const val = Math.max(
                    1,
                    Math.min(999, Number(e.target.value))
                  );
                  setMaxStress(val);
                  if (stress > val) setStress(val);
                }}
                className={`w-16 px-2 py-1 rounded border text-center ${
                  isDark
                    ? "bg-zinc-800 border-zinc-600 text-gray-200"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
              <TokenButton
                onClick={decrementStress}
                disabled={stress === 0}
                isDark={isDark}
              >
                –
              </TokenButton>
              <span
                className={`text-2xl font-mono ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {stress}
              </span>
              <TokenButton
                onClick={incrementStress}
                disabled={stress === maxStress}
                isDark={isDark}
              >
                +
              </TokenButton>
            </div>

            <div
              className={`relative w-full h-3 sm:h-4 rounded-full overflow-hidden ${
                isDark ? "bg-zinc-700" : "bg-gray-200"
              }`}
            >
              <motion.div
                className={`h-full rounded-full ${stressBarColor}`}
                initial={{ width: 0 }}
                animate={{ width: `${stressPercent}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Health Points */}
      <div
        className={`w-full rounded-2xl sm:rounded-3xl p-4 border shadow-inner ${
          isDark
            ? "bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700"
            : "bg-white border-zinc-200"
        }`}
      >
        <div className="flex justify-between items-center mb-3">
          <span
            className={`font-semibold ${
              isDark ? "text-gray-200" : "text-gray-900"
            }`}
          >
            Health Points
          </span>
          <div className="flex items-center gap-2">
            <label
              className={`text-sm ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Evasion:
            </label>
            <input
              type="number"
              min="0"
              max="99"
              value={evasion}
              onChange={(e) =>
                setEvasion(Math.max(0, Math.min(99, Number(e.target.value))))
              }
              className={`w-12 sm:w-14 px-2 py-1 rounded border text-center ${
                isDark
                  ? "bg-zinc-800 border-zinc-600 text-gray-200"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
        </div>

        <div className="flex flex-col items-center mb-3">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-2">
            <div className="flex items-center gap-1 sm:gap-2">
              <label
                className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Max:
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={maxHealth}
                onChange={(e) => {
                  const val = Math.max(1, Math.min(20, Number(e.target.value)));
                  setMaxHealth(val);
                  if (currentHealth > val) setCurrentHealth(val);
                }}
                className={`w-12 sm:w-14 px-2 py-1 rounded border text-center ${
                  isDark
                    ? "bg-zinc-800 border-zinc-600 text-gray-200"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <TokenButton
                onClick={decrementHealth}
                disabled={currentHealth === 0}
                isDark={isDark}
              >
                –
              </TokenButton>
              <span
                className={`text-xl font-mono ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {currentHealth}/{maxHealth}
              </span>
              <TokenButton
                onClick={incrementHealth}
                disabled={currentHealth === maxHealth}
                isDark={isDark}
              >
                +
              </TokenButton>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-3">
            {renderHearts()}
          </div>
        </div>

        {/* Major & Severe Damage */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <div className="flex flex-col items-center">
            <label
              className={`text-xs sm:text-sm ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Major Damage
            </label>
            <input
              type="number"
              min="0"
              max="99"
              value={majorDamage}
              onChange={(e) =>
                setMajorDamage(
                  Math.max(0, Math.min(99, Number(e.target.value)))
                )
              }
              className={`w-full px-2 py-1 rounded border text-center ${
                isDark
                  ? "bg-zinc-800 border-zinc-600 text-gray-200"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          <div className="flex flex-col items-center">
            <label
              className={`text-xs sm:text-sm ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Severe Damage
            </label>
            <input
              type="number"
              min="0"
              max="99"
              value={severeDamage}
              onChange={(e) =>
                setSevereDamage(
                  Math.max(0, Math.min(99, Number(e.target.value)))
                )
              }
              className={`w-full px-2 py-1 rounded border text-center ${
                isDark
                  ? "bg-zinc-800 border-zinc-600 text-gray-200"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Armor Points */}
      <div
        className={`w-full rounded-2xl sm:rounded-3xl p-4 border shadow-inner ${
          isDark
            ? "bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700"
            : "bg-white border-zinc-200"
        }`}
      >
        <div className="flex justify-center mb-2 sm:mb-3">
          <span
            className={`font-semibold ${
              isDark ? "text-gray-200" : "text-gray-900"
            }`}
          >
            Armor Points
          </span>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-2">
            <div className="flex items-center gap-1 sm:gap-2">
              <label
                className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Max:
              </label>
              <input
                type="number"
                min={0}
                max={10}
                value={maxArmor}
                onChange={(e) => {
                  const val = Math.max(0, Math.min(10, Number(e.target.value)));
                  setMaxArmor(val);
                  if (currentArmor > val) setCurrentArmor(val);
                }}
                className={`w-12 sm:w-14 px-2 py-1 rounded border text-center ${
                  isDark
                    ? "bg-zinc-800 border-zinc-600 text-gray-200"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <TokenButton
                onClick={decrementArmor}
                disabled={currentArmor === 0}
                isDark={isDark}
              >
                –
              </TokenButton>
              <span
                className={`text-xl font-mono ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {currentArmor}/{maxArmor}
              </span>
              <TokenButton
                onClick={incrementArmor}
                disabled={currentArmor === maxArmor}
                isDark={isDark}
              >
                +
              </TokenButton>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
            {renderArmor()}
          </div>
        </div>
      </div>
    </div>
  );
}
