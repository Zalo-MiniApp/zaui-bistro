import { Button, Sheet, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "./vectors";
import CartItemCard from "./cart-item-card";
import { CartItem } from "@/types/cart.types";
import { useCartStore } from "@/stores/cart.store";
import { copy } from "@/constants/copy";
import { formatCurrency } from "@/utils/format";
import { calculateCartTotal } from "@/utils/cart";

interface CheckoutSheetProps {
  visible: boolean;
  onClose: () => void;
  items: CartItem[];
  onCheckout: () => void;
}

export default function CheckoutSheet({
  visible,
  onClose,
  items,
  onCheckout,
}: CheckoutSheetProps) {
  const navigate = useNavigate();
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const handleEdit = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (item) {
      navigate(
        `/product/${item.productId}?editCartItemId=${encodeURIComponent(itemId)}`,
      );
      onClose();
    }
  };

  const handleCheckout = () => {
    onCheckout();
  };

  const totalAmount = calculateCartTotal(items);

  return (
    <Sheet autoHeight visible={visible} onClose={onClose}>
      <div className="flex max-h-[70vh] flex-col bg-white">
        <div className="relative flex items-center px-4 py-2">
          <Button
            onClick={onClose}
            className="absolute flex h-8 w-8 items-center justify-center bg-transparent active:bg-transparent"
            type="neutral"
            size="small"
            fullWidth
          >
            <CloseIcon />
          </Button>
          <div className="flex-1 py-1 text-center text-xlarge-m">
            {copy.cart.title}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-elevation-01 p-2">
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                variant="editable"
                onUpdateQuantity={updateQuantity}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </div>

        <div className="border-divider01 border-t px-4 py-4">
          <div className="mb-4 flex items-center justify-between">
            <Text className="text-base font-medium">{copy.common.total}</Text>
            <Text className="text-base font-medium text-primary">
              {formatCurrency(totalAmount)}
            </Text>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              className="flex-1 rounded-lg bg-neutral400 py-3 font-medium text-text-primary active:bg-neutral400/50"
              type="neutral"
            >
              {copy.common.close}
            </Button>
            <Button
              onClick={handleCheckout}
              className="flex-1 rounded-lg bg-primary py-3 font-medium text-white active:bg-primary/50"
            >
              {copy.cart.checkout}
            </Button>
          </div>
        </div>
      </div>
    </Sheet>
  );
}
