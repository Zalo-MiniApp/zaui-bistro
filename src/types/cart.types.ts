export interface SelectedVariant {
  groupId: number | string;
  groupTitle: string;
  optionId: number | string;
  optionName: string;
  extraPrice: number;
  quantity?: number; // For QUANTITY type variants
}

export interface CartItem {
  id: string; // Unique cart item ID (combination of product + variants)
  productId: number;
  productName: string;
  productImage: string;
  basePrice: number;
  selectedVariants: SelectedVariant[];
  quantity: number;
  note?: string;
}
