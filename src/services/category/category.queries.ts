import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { categoryService } from "./category.api";
import {
  GET_LIST_OF_CATEGORY_KEY,
  GET_LIST_OF_SUBCATEGORY_KEY,
} from "@/constants/api";
import { Category, SubCategory } from "@/types/category.types";

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: [GET_LIST_OF_CATEGORY_KEY],
    queryFn: categoryService.getCategories,
    placeholderData: keepPreviousData,
  });
}

export function useSubCategories(categoryId: string) {
  return useQuery<SubCategory[]>({
    queryKey: [GET_LIST_OF_SUBCATEGORY_KEY, categoryId],
    queryFn: () => categoryService.getSubCategories(categoryId),
    placeholderData: keepPreviousData,
  });
}
