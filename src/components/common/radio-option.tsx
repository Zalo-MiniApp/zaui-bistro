import { VariantOption } from "@/types/product.types";
import { formatCurrency } from "@/utils/format";

interface RadioOptionProps {
  option: VariantOption;
  isSelected: boolean;
  groupName: string;
  onSelect: (optionId: string) => void;
}

export default function RadioOption({
  option,
  isSelected,
  groupName,
  onSelect,
}: RadioOptionProps) {
  const id = `${groupName}-${option.id}`;

  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center justify-between rounded-lg py-2 transition`}
    >
      <input
        id={id}
        type="radio"
        name={groupName}
        value={option.id}
        checked={isSelected}
        onChange={() => onSelect(option.id)}
        className="hidden"
      />

      <div className="flex items-center gap-2">
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
            isSelected ? "bg-primary" : "bg-white"
          } `}
        >
          <div className="h-2 w-2 rounded-full bg-white" />
        </div>
        <span className="ml-2 text-large text-text-primary">{option.name}</span>

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
    </label>
  );
}
