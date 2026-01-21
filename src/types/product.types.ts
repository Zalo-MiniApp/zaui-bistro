export interface VariantOption {
  id: string;
  name: string;
  extraPrice: number;
  image?: string;
  defaultValue?: string | number | boolean;
  value?: string | number;
  maxValue?: string | number;
  step?: number;
}

export interface VariantGroup {
  id: string;
  title: string;
  description: string;
  type: "SINGLE" | "MULTIPLE" | "ADJUSTMENT" | "QUANTITY";
  isRequired: boolean;
  options: VariantOption[];
}

export interface ProductFeature {
  id: string;
  name: string;
  icon?: string;
}

export interface ProductSales {
  freeShipping?: boolean;
  discount?: number;
  specialPrice?: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  variantGroups: VariantGroup[];
  features: string[];

  newMarked?: boolean;
  sales?: ProductSales;

  categoryId: string;
  subCategoryId: string;
}
