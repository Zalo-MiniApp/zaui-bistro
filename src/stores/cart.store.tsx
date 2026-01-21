import { create } from "zustand";
import { CartItem, SelectedVariant } from "@/types/cart.types";

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  checkoutSheetVisible: boolean;
  addToCart: (item: Omit<CartItem, "id">) => void;
  updateCartItem: (id: string, item: Omit<CartItem, "id">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  openCheckoutSheet: () => void;
  closeCheckoutSheet: () => void;
}

// Helper function to generate unique ID based on product and variants
const generateCartItemId = (item: Omit<CartItem, "id">): string => {
  const variantsString = item.selectedVariants
    .map((v) => `${v.groupId}-${v.optionId}-${v.quantity || 1}`)
    .sort()
    .join("|");
  return `${item.productId}-${variantsString}-${item.note || ""}`;
};

// Helper function to calculate totals
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce((total, item) => {
    const variantsTotal = item.selectedVariants.reduce(
      (sum, variant) => sum + variant.extraPrice * (variant.quantity || 1),
      0
    );
    const itemPrice = item.basePrice + variantsTotal;
    return total + itemPrice * item.quantity;
  }, 0);
  return { totalItems, totalAmount };
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  totalItems: 0,
  totalAmount: 0,
  checkoutSheetVisible: false,

  addToCart: (newItem) => {
    const itemId = generateCartItemId(newItem);

    set((state) => {
      const existingItemIndex = state.items.findIndex((item) => item.id === itemId);

      let newItems: CartItem[];
      if (existingItemIndex !== -1) {
        // Item exists, increase quantity
        newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + newItem.quantity,
        };
      } else {
        // New item, add to cart
        newItems = [...state.items, { ...newItem, id: itemId }];
      }

      const { totalItems, totalAmount } = calculateTotals(newItems);
      return { items: newItems, totalItems, totalAmount };
    });
  },

  updateCartItem: (id, updatedItem) => {
    set((state) => {
      // Remove the old item and add the updated one
      const newItems = state.items.filter((item) => item.id !== id);
      const newItemId = generateCartItemId(updatedItem);

      // Check if the updated item matches an existing item
      const existingItemIndex = newItems.findIndex((item) => item.id === newItemId);

      if (existingItemIndex !== -1) {
        // Merge quantities if the updated item matches an existing one
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + updatedItem.quantity,
        };
      } else {
        // Add as new item
        newItems.push({ ...updatedItem, id: newItemId });
      }

      const { totalItems, totalAmount } = calculateTotals(newItems);
      return { items: newItems, totalItems, totalAmount };
    });
  },

  updateQuantity: (id, quantity) => {
    set((state) => {
      let newItems: CartItem[];
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        newItems = state.items.filter((item) => item.id !== id);
      } else {
        newItems = state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
      }

      const { totalItems, totalAmount } = calculateTotals(newItems);
      return { items: newItems, totalItems, totalAmount };
    });
  },

  removeItem: (id) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== id);
      const { totalItems, totalAmount } = calculateTotals(newItems);
      return { items: newItems, totalItems, totalAmount };
    });
  },

  clearCart: () => {
    set({ items: [], totalItems: 0, totalAmount: 0 });
  },

  openCheckoutSheet: () => {
    set({ checkoutSheetVisible: true });
  },

  closeCheckoutSheet: () => {
    set({ checkoutSheetVisible: false });
  },
}));
