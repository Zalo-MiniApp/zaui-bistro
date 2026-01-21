import { VariantOption } from "@/types/product.types";
import QuantityStepper from "./quantity-stepper";
import { Text } from "zmp-ui";
import { formatCurrency } from "@/utils/format";

interface QuantityOptionProps {
  option: VariantOption;
  quantity: number;
  onQuantityChange: (optionId: string, quantity: number) => void;
}

export default function QuantityOption({
  option,
  quantity,
  onQuantityChange,
}: QuantityOptionProps) {
  const handleDecrease = () => {
    const newQuantity = Math.max(0, quantity - 1);
    onQuantityChange(option.id, newQuantity);
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    onQuantityChange(option.id, newQuantity);
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex flex-1 items-center gap-3">
        {option.image && (
          <img
            draggable={false}
            src={option.image}
            alt={option.name}
            className="h-10 w-10 rounded-lg object-cover"
          />
        )}

        <div className="flex flex-col gap-2">
          <div className="text-small-m text-text-primary">{option.name}</div>
          <div className="text-small-m font-medium text-primary">
            {formatCurrency(option.extraPrice)}
          </div>
        </div>
      </div>

      <QuantityStepper
        value={quantity}
        onDecrease={handleDecrease}
        onIncrease={handleIncrease}
        minValue={0}
        size="medium"
        variant="rounded"
      />
    </div>
  );
}
