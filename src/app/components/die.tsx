"use client";

import { useState, useCallback, useEffect } from "react";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { DiceAnimation } from "./diceAnimation";
import { useTheme } from "../contexts/ThemeContext";

interface DieProps {
  sides: 4 | 6 | 8 | 10 | 12 | 20;
  size?: number;
  smSize?: number;
  mdSize?: number;
  onRoll?: (result: number) => void;
  color?: string;
  baseColor?: string;
  edgeColor?: string;
  textColor?: string;
  textOutlineColor?: string;
  customValue?: number | null;
  isRolling?: boolean;
  hideButton?: boolean; // <- Nova prop
}

export const Die = ({
  sides,
  size = 100,
  onRoll,
  color,
  baseColor,
  edgeColor,
  textColor,
  textOutlineColor,
  customValue,
  isRolling: externalRolling = false,
  hideButton = false, // <- Add default value here
}: DieProps) => {
  const { isDark } = useTheme();

  const [value, setValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const roll = useCallback(() => {
    setIsRolling(true);
    setValue(null);

    setTimeout(() => {
      const roll = new DiceRoll(`d${sides}`);
      setValue(roll.total);
      setIsRolling(false);
      onRoll?.(roll.total);
    }, 800);
  }, [sides, onRoll]);

  // Se customValue mudar, atualiza o valor exibido
  useEffect(() => {
    if (typeof customValue === "number") {
      setValue(customValue);
    }
  }, [customValue]);

  // Define as cores padrão com fallback ao modo dark/light
  const resolvedBaseColor = baseColor ?? (isDark ? "#1F2937" : "#E5E7EB"); // fundo do dado
  const resolvedEdgeColor = edgeColor ?? (isDark ? "#9CA3AF" : "#374151"); // borda do dado
  const resolvedTextColor = textColor ?? (isDark ? "#F9FAFB" : "#111827"); // número do dado

  return (
    <div className="flex flex-col items-center gap-3">
      <DiceAnimation isRolling={isRolling || externalRolling}>
        <div className="relative" style={{ width: size, height: size }}>
          <div
            style={{
              width: size,
              height: size,
              backgroundColor: resolvedBaseColor,
              WebkitMaskImage: `url(/dice/d${sides}.svg)`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskImage: `url(/dice/d${sides}.svg)`,
              maskRepeat: "no-repeat",
              maskSize: "contain",
            }}
          />
          {value !== null && (
            <span
              className="absolute inset-0 flex items-center justify-center font-bold"
              style={{
                fontSize: size / 3,
                color: resolvedTextColor,
              }}
            >
              {value}
            </span>
          )}
        </div>
      </DiceAnimation>

      {!hideButton && (
        <button
          onClick={roll}
          disabled={isRolling}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {isRolling ? `Rolling...` : `Roll D${sides}`}
        </button>
      )}
    </div>
  );
};
