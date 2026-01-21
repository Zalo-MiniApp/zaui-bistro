import { Product, VariantGroup } from "@/types/product.types";

interface SelectedVariant {
  groupId: number | string;
  groupTitle: string;
  optionId: number | string;
  optionName: string;
  extraPrice: number;
  quantity?: number;
}

/**
 * Get default variants for a product
 * - For SINGLE type: select first option
 * - For MULTIPLE type: no default selection
 * - For ADJUSTMENT type: use defaultValue if available
 * - For QUANTITY type: use defaultValue or 0
 */
export function getDefaultVariants(product: Product): SelectedVariant[] {
  const defaultVariants: SelectedVariant[] = [];

  product.variantGroups.forEach((group: VariantGroup) => {
    if (group.type === "SINGLE" && group.options.length > 0) {
      // For SINGLE type, select the first option (or one with defaultValue = true)
      const defaultOption = group.options.find(opt => opt.defaultValue === true) || group.options[0];
      defaultVariants.push({
        groupId: group.id,
        groupTitle: group.title,
        optionId: defaultOption.id,
        optionName: defaultOption.name,
        extraPrice: defaultOption.extraPrice,
      });
    } else if (group.type === "ADJUSTMENT" || group.type === "QUANTITY") {
      // For ADJUSTMENT and QUANTITY types, use defaultValue if available
      group.options.forEach((option) => {
        if (option.defaultValue !== undefined && option.defaultValue !== null && option.defaultValue !== false) {
          const quantity = typeof option.defaultValue === 'number'
            ? option.defaultValue
            : parseInt(String(option.defaultValue)) || 0;

          if (quantity > 0) {
            defaultVariants.push({
              groupId: group.id,
              groupTitle: group.title,
              optionId: option.id,
              optionName: option.name,
              extraPrice: option.extraPrice,
              quantity: quantity,
            });
          }
        }
      });
    }
    // For MULTIPLE type, we don't add any default selection
  });

  return defaultVariants;
}
