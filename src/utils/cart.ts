import { copy } from "@/constants/copy";
import { CartItem } from "@/types/cart.types";

type VariantFormatOptions = {
  separator?: string;
  emptyLabel?: string;
  percentSuffix?: string;
};

export const calculateCartItemPrice = (item: CartItem) => {
  const variantsTotal = item.selectedVariants.reduce(
    (sum, variant) => sum + variant.extraPrice * (variant.quantity || 1),
    0,
  );
  return item.basePrice + variantsTotal;
};

export const calculateCartTotal = (items: CartItem[]) =>
  items.reduce(
    (sum, item) => sum + calculateCartItemPrice(item) * item.quantity,
    0,
  );

export const formatVariantWithPercentage = (
  variants: CartItem["selectedVariants"],
  options: VariantFormatOptions = {},
) => {
  const {
    separator = copy.common.listSeparator,
    emptyLabel = "",
    percentSuffix = copy.common.percentSuffix,
  } = options;

  if (variants.length === 0) {
    return emptyLabel;
  }

  const parts = variants.map((variant) => {
    if (variant.quantity && variant.quantity !== 1) {
      return `${variant.optionName} ${variant.quantity}${percentSuffix}`;
    }
    return variant.optionName;
  });

  return parts.join(separator);
};
