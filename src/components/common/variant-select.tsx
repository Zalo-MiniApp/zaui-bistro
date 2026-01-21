import { VariantGroup } from "@/types/product.types";
import AdjustmentOption from "./adjustment-option";
import CheckboxOption from "./checkbox-option";
import QuantityOption from "./quantity-option";
import RadioOption from "./radio-option";
import { Text } from "zmp-ui";

interface VariantSelectProps {
  variantGroup: VariantGroup;
  selectedOptionId?: string;
  selectedOptionIds?: string[];
  selectedValues?: Record<string, number>;
  onSelect?: (optionId: string) => void;
  onValueChange?: (optionId: string, value: number) => void;
}

export default function VariantSelect({
  variantGroup,
  selectedOptionId,
  selectedOptionIds = [],
  selectedValues = {},
  onSelect,
  onValueChange,
}: VariantSelectProps) {
  if (
    variantGroup.type !== "SINGLE" &&
    variantGroup.type !== "MULTIPLE" &&
    variantGroup.type !== "ADJUSTMENT" &&
    variantGroup.type !== "QUANTITY"
  ) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="text-variant-title">{variantGroup.title}</div>
      <div className="text-small text-text-secondary">
        {variantGroup.description}
      </div>
      <hr className="border-border-primary mt-2" />

      <div className="flex flex-col gap-1">
        {variantGroup.options.map((option, index) => (
          <div key={option.id}>
            {variantGroup.type === "SINGLE" && (
              <RadioOption
                option={option}
                isSelected={selectedOptionId === option.id}
                groupName={variantGroup.title}
                onSelect={onSelect!}
              />
            )}

            {variantGroup.type === "MULTIPLE" && (
              <CheckboxOption
                option={option}
                isSelected={selectedOptionIds.includes(option.id)}
                groupName={variantGroup.title}
                onSelect={onSelect!}
              />
            )}

            {variantGroup.type === "ADJUSTMENT" && (
              <AdjustmentOption
                option={option}
                value={
                  selectedValues[option.id] ||
                  (typeof option.value === "number" ? option.value : 0)
                }
                onValueChange={onValueChange!}
              />
            )}

            {variantGroup.type === "QUANTITY" && (
              <QuantityOption
                option={option}
                quantity={
                  selectedValues[option.id] ||
                  (typeof option.value === "number" ? option.value : 0)
                }
                onQuantityChange={onValueChange!}
              />
            )}

            {index < variantGroup.options.length - 1 && (
              <hr className="border-border-primary" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
