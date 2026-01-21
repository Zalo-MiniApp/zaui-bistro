import { VariantOption } from "@/types/product.types";
import { formatCurrency } from "@/utils/format";

interface CheckboxOptionProps {
  option: VariantOption;
  isSelected: boolean;
  groupName: string;
  onSelect: (optionId: string) => void;
}

export default function CheckboxOption({
  option,
  isSelected,
  groupName,
  onSelect,
}: CheckboxOptionProps) {
  const id = `${groupName}-${option.id}`;

  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center justify-between rounded-lg py-2 transition"
    >
      <input
        id={id}
        type="checkbox"
        name={groupName}
        value={option.id}
        checked={isSelected}
        onChange={() => onSelect(option.id)}
        className="hidden"
      />

      <div className="flex items-center gap-2">
        <span className="text-large text-text-primary">{option.name}</span>

        {option.extraPrice > 0 && (
          <span className="text-base text-primary">
            (+{formatCurrency(option.extraPrice)})
          </span>
        )}
        {option.extraPrice === 0 && (
          <span className="text-base text-text-primary">
            (+{formatCurrency(option.extraPrice)})
          </span>
        )}
      </div>
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-lg border-2 transition ${isSelected ? "border-primary bg-primary" : "border-neutral-300 bg-white"} `}
      >
        {isSelected && (
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={4}
          >
            <path d="M4 10l5 5 8-8" />
          </svg>
        )}
      </div>
    </label>
  );
}
