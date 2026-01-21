import { mockListOfProduct } from "./product.mock";
import { mockListOfSubCategory } from "../category/category.mock";

export const productService = {
  getProducts: async (categoryId: string, featureId: string) => {
    const filteredProducts = mockListOfProduct.filter(
      (product) =>
        product.categoryId === categoryId &&
        (featureId ? product.features.includes(featureId) : true)
    );
    return filteredProducts;
  },

  getProductById: async (productId: string | number) => {
    const product = mockListOfProduct.find(
      (product) => product.id === Number(productId)
    );
    if (!product) {
      throw new Error(`Product with id ${productId} not found`);
    }
    return product;
  },

  getProductsBySubCategory: async (subCategoryId: string) => {
    const filteredProducts = mockListOfProduct.filter(
      (product) => product.subCategoryId === subCategoryId
    );
    return filteredProducts;
  },

  getProductsGroupBySubCategory: async (
    categoryId: string,
    featureId: string
  ) => {
    const filteredProducts = mockListOfProduct.filter(
      (product) =>
        product.categoryId === categoryId &&
        (featureId ? product.features.includes(featureId) : true)
    );

    const groupedProducts = mockListOfSubCategory.map((subCategory) => ({
      ...subCategory,
      products: filteredProducts.filter(
        (product) => product.subCategoryId === subCategory.id
      ),
    }));
    return groupedProducts;
  },
};
