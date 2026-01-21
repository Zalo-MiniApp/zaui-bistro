import { CartItem } from "@/types/cart.types";
import QuantityStepper from "./quantity-stepper";
import { Button, Text } from "zmp-ui";
import { copy } from "@/constants/copy";
import { formatCurrency } from "@/utils/format";
import {
  calculateCartItemPrice,
  formatVariantWithPercentage,
} from "@/utils/cart";

interface CartItemCardProps {
  item: CartItem;
  variant?: "editable" | "readonly";
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onEdit?: (id: string) => void;
}

export default function CartItemCard({
  item,
  variant = "readonly",
  onUpdateQuantity,
  onEdit,
}: CartItemCardProps) {
  const itemPrice = calculateCartItemPrice(item);

  return (
    <div className="flex gap-3 rounded-lg bg-white p-2">
      <img
        draggable={false}
        src={item.productImage}
        alt={item.productName}
        className="h-10 w-10 rounded-lg object-cover"
      />
      <div className="flex-1">
        <Text className="text-base font-medium">{item.productName}</Text>
        <Text size="xSmall" className="text-text-secondary">
          {formatVariantWithPercentage(item.selectedVariants, {
            emptyLabel: variant === "editable" ? copy.common.defaultOption : "",
          })}
        </Text>
        <Text className="mt-1 text-sm font-medium text-primary">
          {formatCurrency(itemPrice)}
        </Text>
        {onEdit && (
          <Button
            onClick={() => onEdit(item.id)}
            className="mt-1 rounded-full bg-neutral400 px-2 py-1 text-sm text-text-secondary active:bg-neutral400"
            size="small"
            type="neutral"
          >
            {copy.common.edit}
          </Button>
        )}
      </div>
      <QuantityStepper
        value={item.quantity}
        onDecrease={() =>
          onUpdateQuantity?.(item.id, Math.max(0, item.quantity - 1))
        }
        onIncrease={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
        minValue={0}
        size="large"
        variant="rounded"
      />
    </div>
  );
}
