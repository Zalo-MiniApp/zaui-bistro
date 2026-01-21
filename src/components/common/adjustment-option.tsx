import { VariantOption } from "@/types/product.types";
import QuantityStepper from "./quantity-stepper";
import { Text } from "zmp-ui";
import { copy } from "@/constants/copy";

interface AdjustmentOptionProps {
  option: VariantOption;
  value: number;
  onValueChange: (optionId: string, value: number) => void;
}

export default function AdjustmentOption({
  option,
  value,
  onValueChange,
}: AdjustmentOptionProps) {
  const step = typeof option.step === "number" ? option.step : 1;
  const maxValue = typeof option.maxValue === "number" ? option.maxValue : 100;

  const handleDecrease = () => {
    const newValue = Math.max(0, value - step);
    onValueChange(option.id, newValue);
  };

  const handleIncrease = () => {
    const newValue = Math.min(maxValue, value + step);
    onValueChange(option.id, newValue);
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div className="text-large text-text-primary">{option.name}</div>

      <QuantityStepper
        value={value}
        onDecrease={handleDecrease}
        onIncrease={handleIncrease}
        minValue={0}
        maxValue={maxValue}
        size="medium"
        variant="rounded"
        displaySuffix={copy.common.percentSuffix}
        className="gap-1"
      />
    </div>
  );
}
