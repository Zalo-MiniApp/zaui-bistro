import {
  GET_LIST_OF_PRODUCT_BY_SUBCATEGORY,
  GET_LIST_OF_PRODUCT_FEATURE_KEY,
  GET_LIST_OF_PRODUCT_KEY,
  GET_PRODUCT_BY_ID_KEY,
} from "@/constants/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { productService } from "./product.api";
import { mockProductFeature } from "./product.mock";

export function useProducts(categoryId: string, featureId: string) {
  return useQuery({
    queryKey: [GET_LIST_OF_PRODUCT_KEY, categoryId, featureId],
    queryFn: () => {
      return productService.getProducts(categoryId, featureId);
    },
    placeholderData: keepPreviousData,
  });
}

export function useProductsGroupBySubcategory(
  categoryId: string,
  featureId: string,
) {
  return useQuery({
    queryKey: [GET_LIST_OF_PRODUCT_BY_SUBCATEGORY, categoryId, featureId],
    queryFn: () => {
      return productService.getProductsGroupBySubCategory(
        categoryId,
        featureId,
      );
    },
    placeholderData: keepPreviousData,
  });
}

export function useProductFeatures(categoryId: string) {
  return useQuery({
    queryKey: [GET_LIST_OF_PRODUCT_FEATURE_KEY, categoryId],
    queryFn: async () => {
      const products = await productService.getProducts(categoryId, "");
      const featureSet = new Set<string>();
      products.forEach((product) => {
        product.features.forEach((feature) => featureSet.add(feature));
      });

      const featureIds = Array.from(featureSet);
      return mockProductFeature.filter((feature) =>
        featureIds.includes(feature.id),
      );
    },
    placeholderData: keepPreviousData,
  });
}

export function useProduct(productId: string | number) {
  return useQuery({
    queryKey: [GET_PRODUCT_BY_ID_KEY, productId],
    queryFn: () => {
      return productService.getProductById(productId);
    },
    enabled: !!productId,
    placeholderData: keepPreviousData,
  });
}
