import { useState } from "react";
import { CartIcon } from "./vectors";
import CartSheet from "./cart-sheet";
import CheckoutSheet from "./checkout-sheet";
import { useCartStore } from "@/stores/cart.store";
import { Button } from "zmp-ui";
import { copy } from "@/constants/copy";
import { formatCount } from "@/utils/format";
import { useNavigate } from "react-router-dom";

interface CartFloatButtonProps {
  itemCount: number;
}

export default function CartFloatButton({ itemCount }: CartFloatButtonProps) {
  const navigate = useNavigate();
  const [cartSheetVisible, setCartSheetVisible] = useState(false);

  const {
    items,
    updateQuantity,
    checkoutSheetVisible,
    closeCheckoutSheet,
    openCheckoutSheet,
  } = useCartStore();

  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleConfirmCart = () => {
    // Close cart sheet and open checkout sheet
    setCartSheetVisible(false);
    openCheckoutSheet();
  };

  const handleCheckout = () => {
    closeCheckoutSheet();
    navigate("/checkout");
  };

  return (
    <>
      <Button
        onClick={() => setCartSheetVisible(true)}
        className="absolute -top-14 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black shadow-lg active:bg-black"
        aria-label={copy.cart.title}
        fullWidth
        variant="tertiary"
        size="small"
      >
        <CartIcon className="h-6 w-6 text-white" />

        {itemCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-white">
            {formatCount(itemCount)}
          </span>
        )}
      </Button>

      <CartSheet
        visible={cartSheetVisible}
        onClose={() => setCartSheetVisible(false)}
        items={items}
        onUpdateQuantity={handleUpdateQuantity}
        onConfirm={handleConfirmCart}
      />

      <CheckoutSheet
        visible={checkoutSheetVisible}
        onClose={closeCheckoutSheet}
        items={items}
        onCheckout={handleCheckout}
      />
    </>
  );
}
