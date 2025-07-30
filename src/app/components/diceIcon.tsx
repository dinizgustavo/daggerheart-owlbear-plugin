// components/DiceIcon.tsx
import React from "react";
import { motion } from "motion/react";

interface DiceIconProps {
  type: "d4" | "d6" | "d8" | "d10" | "d12" | "d20" | "d100";
  size?: number;
  color?: string;
  onClick?: () => void;
  value?: number | null; // Optional value for displaying the rolled number
}

export default function DiceIcon({
  type,
  size = 100,
  color = "#cccccc",
  onClick,
  value,
}: DiceIconProps) {
  const diceMap: Record<string, JSX.Element> = {
    d4: (
      <polygon
        points="50,5 95,90 5,90"
        fill={color}
        stroke="#000"
        strokeWidth="2"
      />
    ),
    d6: (
      <rect
        x="10"
        y="10"
        width="80"
        height="80"
        fill={color}
        stroke="#000"
        strokeWidth="2"
      />
    ),
    d8: (
      <polygon
        points="50,5 95,50 50,95 5,50"
        fill={color}
        stroke="#000"
        strokeWidth="2"
      />
    ),
    d10: (
      <polygon
        points="50,5 90,35 75,90 25,90 10,35"
        fill={color}
        stroke="#000"
        strokeWidth="2"
      />
    ),
    d12: (
      <polygon
        points="50,5 85,20 95,55 75,90 25,90 5,55 15,20"
        fill={color}
        stroke="#000"
        strokeWidth="2"
      />
    ),
    d20: (
      <>
        <polygon
          points="50,5 85,20 95,55 75,90 25,90 5,55 15,20"
          fill={color}
          stroke="#000"
          strokeWidth="2"
        />
        <polygon
          points="50,5 75,90 25,90"
          fill="#bbbbbb"
          stroke="#000"
          strokeWidth="2"
        />
      </>
    ),
    d100: (
      <>
        <polygon
          points="50,5 90,35 75,90 25,90 10,35"
          fill={color}
          stroke="#000"
          strokeWidth="2"
        />
        <polygon
          points="130,5 170,35 155,90 105,90 90,35"
          fill="#bbbbbb"
          stroke="#000"
          strokeWidth="2"
        />
      </>
    ),
  };

  return (
    <motion.svg
      viewBox={type === "d100" ? "0 0 220 100" : "0 0 100 100"}
      width={size}
      height={size}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9, rotate: 15 }}
      onClick={onClick}
      className="cursor-pointer transition-all"
    >
      {diceMap[type]}
      {/* Adicione o número aqui */}
      {value !== null && (
        <text
          x="50"
          y="55"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#000000"
          fontSize="30"
          fontWeight="bold"
        >
          {value}
        </text>
      )}
    </motion.svg>
  );
}
