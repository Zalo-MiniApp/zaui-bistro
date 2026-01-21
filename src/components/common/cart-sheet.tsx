import { Button, Sheet, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "./vectors";
import CartItemCard from "./cart-item-card";
import { CartItem } from "@/types/cart.types";
import { copy } from "@/constants/copy";
import { formatCurrency } from "@/utils/format";
import { calculateCartTotal } from "@/utils/cart";

interface CartSheetProps {
  visible: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onConfirm: () => void;
}

export default function CartSheet({
  visible,
  onClose,
  items,
  onUpdateQuantity,
  onConfirm,
}: CartSheetProps) {
  const navigate = useNavigate();

  const handleEdit = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (item) {
      navigate(
        `/product/${item.productId}?editCartItemId=${encodeURIComponent(itemId)}`,
      );
      onClose();
    }
  };

  const totalAmount = calculateCartTotal(items);

  return (
    <Sheet autoHeight visible={visible} onClose={onClose}>
      <div className="relative flex max-h-[70vh] w-full flex-col overflow-y-scroll bg-white">
        <div className="flex items-center px-4 py-2">
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
            {copy.common.updateCart}
          </div>
        </div>

        <div className="w-full overflow-y-auto bg-elevation-01 p-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-16">
              <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-neutral100">
                <svg
                  className="h-16 w-16 text-text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <Text className="mb-1 text-base font-medium text-text-primary">
                {copy.cart.empty}
              </Text>
              <Text size="xSmall" className="text-center text-text-secondary">
                {copy.cart.emptyHint}
              </Text>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  variant="editable"
                  onUpdateQuantity={onUpdateQuantity}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-divider01 border-t px-4 py-4">
            <div className="mb-4 flex items-center justify-between">
              <Text className="text-base font-medium">{copy.common.total}</Text>
              <Text className="text-base font-medium text-primary">
                {formatCurrency(totalAmount)}
              </Text>
            </div>
            <Button
              onClick={onConfirm}
              className="w-full rounded-lg bg-primary py-3 font-medium text-white active:bg-primary active:opacity-50"
              fullWidth
            >
              {copy.common.confirm}
            </Button>
          </div>
        )}
      </div>
    </Sheet>
  );
}
