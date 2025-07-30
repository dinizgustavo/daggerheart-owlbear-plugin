// components/DiceSelector.tsx
import DiceIcon from "./diceIcon";

interface DiceSelectorProps {
  onSelect: (type: diceType) => void;
  selected: diceType;
}
type diceType = "d4" | "d6" | "d8" | "d10" | "d12" | "d20" | "d100";
const diceTypes: diceType[] = ["d4", "d6", "d8", "d10", "d12", "d20", "d100"];

export default function DiceSelector({
  onSelect,
  selected,
}: DiceSelectorProps) {
  return (
    <div className="flex gap-4 p-2 overflow-x-auto">
      {diceTypes.map((type) => (
        <div key={type}>
          <DiceIcon
            type={type}
            size={60}
            color={type === selected ? "#facc15" : "#ccc"}
            onClick={() => onSelect(type)}
          />
        </div>
      ))}
    </div>
  );
}
