import { mockListOfCategory, mockListOfSubCategory } from "./category.mock";

export const categoryService = {
  getCategories: async () => {
    // TODO: implement API calls
    return mockListOfCategory;
  },

  getSubCategories: async (categoryId: string) => {
    // TODO: implement API calls
    const category = mockListOfCategory.find(
      (category) => category.id === categoryId
    );
    return mockListOfSubCategory.filter((subCategory) =>
      category?.subCategoryIds?.includes(subCategory.id)
    );
  },
};
