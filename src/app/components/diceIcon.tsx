import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface DiceIconProps {
  type: "d4" | "d6" | "d8" | "d10" | "d12" | "d20" | "d100";
  size?: number;
  color?: string;
  onClick?: () => void;
  value?: number | null;
  isRolling?: boolean;
}

export default function DiceIcon({
  type,
  size = 100,
  color = "#cccccc",
  onClick,
  value,
  isRolling = false,
}: DiceIconProps) {
  const rotationAxis = useRef({
    x: Math.random() * 360,
    y: Math.random() * 360,
    z: Math.random() * 360,
  });

  // Atualiza o eixo de rotação quando começa uma nova rolagem
  useEffect(() => {
    if (isRolling) {
      rotationAxis.current = {
        x: Math.random() * 360,
        y: Math.random() * 360,
        z: Math.random() * 360,
      };
    }
  }, [isRolling]);

  const diceMap: Record<string, React.ReactNode> = {
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
        rx="10"
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
      <polygon
        points="50,5 85,20 95,55 75,90 25,90 5,55 15,20"
        fill={color}
        stroke="#000"
        strokeWidth="2"
      />
    ),
    d100: (
      <rect
        x="10"
        y="10"
        width="200"
        height="80"
        fill={color}
        stroke="#000"
        strokeWidth="2"
        rx="15"
      />
    ),
  };

  return (
    <motion.div
      animate={
        isRolling
          ? {
              rotateX: rotationAxis.current.x + 360 * 5,
              rotateY: rotationAxis.current.y + 360 * 5,
              rotateZ: rotationAxis.current.z + 360 * 5,
            }
          : {}
      }
      transition={{
        duration: 1.5,
        ease: "easeInOut",
        repeat: isRolling ? Infinity : 0,
      }}
      className="relative"
      style={{ width: size, height: size }}
    >
      <motion.svg
        viewBox={type === "d100" ? "0 0 220 100" : "0 0 100 100"}
        width={size}
        height={size}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className="cursor-pointer absolute"
      >
        {diceMap[type]}
        {typeof value === "number" && !isRolling && (
          <text
            x={type === "d100" ? "110" : "50"}
            y={type === "d100" ? "60" : "55"}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#000000"
            fontSize={type === "d100" ? "40" : "30"}
            fontWeight="bold"
          >
            {value}
          </text>
        )}

        {isRolling && (
          <text
            x={type === "d100" ? "110" : "50"}
            y={type === "d100" ? "60" : "55"}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#000000"
            fontSize={type === "d100" ? "40" : "30"}
            fontWeight="bold"
          >
            {Math.floor(Math.random() * 20) + 1}
          </text>
        )}
      </motion.svg>

      {/* Efeito de brilho durante a rolagem */}
      {isRolling && (
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            opacity: [0, 0.3, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
          }}
          style={{
            background: `radial-gradient(circle, white 0%, transparent 70%)`,
            mixBlendMode: "overlay",
          }}
        />
      )}
    </motion.div>
  );
}
