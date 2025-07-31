"use client";

import { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({
  label,
  color,
  onChange,
}: ColorPickerProps) {
  const [currentColor, setCurrentColor] = useState(color);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (color: string) => {
    setCurrentColor(color);
    onChange(color);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <label className="text-sm font-medium">{label}</label>

      <button
        onClick={() => setIsOpen(true)}
        className="w-8 h-8 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer"
        style={{ backgroundColor: currentColor }}
        aria-label={`Selecionar cor para ${label}`}
      />

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm">
            <h3 className="font-medium mb-3">Selecionar cor para {label}</h3>

            <HexColorPicker
              color={currentColor}
              onChange={handleChange}
              style={{ width: "100%", height: "200px" }}
            />

            <div className="flex items-center gap-2 mt-3">
              <span className="text-sm">Hex:</span>
              <HexColorInput
                color={currentColor}
                onChange={handleChange}
                prefixed
                className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 flex-1"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <span className="text-xs text-gray-600 dark:text-gray-400">
        {currentColor}
      </span>
    </div>
  );
}
