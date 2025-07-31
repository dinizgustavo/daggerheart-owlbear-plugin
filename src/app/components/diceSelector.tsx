"use client";

interface DiceSelectorProps {
  selected: string;
  onSelect: (type: string) => void;
}

export default function DiceSelector({
  selected,
  onSelect,
}: DiceSelectorProps) {
  const diceTypes = ["d4", "d6", "d8", "d10", "d12", "d20", "d100"];

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {diceTypes.map((type) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className={`px-3 py-1 rounded-md transition ${
            selected === type
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          }`}
        >
          {type.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
