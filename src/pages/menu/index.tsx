import CategoryList from "@/components/common/category-list";
import ProductGrid from "@/components/common/product-grid";
import SearchBar from "@/components/common/search-bar";
import SubcategorySidebar from "@/components/common/subcategory-sidebar";
import {
  useCategories,
  useSubCategories,
} from "@/services/category/category.queries";
import { useProductsGroupBySubcategory } from "@/services/product/product.queries";
import { useSubcategoryVisibility } from "@/hooks/use-subcategory-visibility";
import { useCartStore } from "@/stores/cart.store";
import { Category } from "@/types/category.types";
import { CartItem } from "@/types/cart.types";
import { scrollToId } from "@/utils/scroll-to";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MenuPage() {
  const navigate = useNavigate();
  const productContainerRef = useRef<HTMLDivElement>(null);

  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const cartItems = useCartStore((state) => state.items);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const { data: subCategories, isLoading: isLoadingSubCategories } =
    useSubCategories(selectedCategory?.id || "");

  useEffect(() => {
    if (categories && categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  const { data: productsGroupBySubCategory, isLoading: isLoadingProducts } =
    useProductsGroupBySubcategory(selectedCategory?.id || "", "");

  const visibleSubCategoryIds = useMemo(
    () =>
      (productsGroupBySubCategory || [])
        .filter((group) => group.products.length > 0)
        .map((group) => group.id),
    [productsGroupBySubCategory],
  );

  const { activeSubcategoryId, setActiveSubcategoryId } =
    useSubcategoryVisibility({
      containerRef: productContainerRef,
      subcategoryIds: visibleSubCategoryIds,
      storageKey: "menu_scroll_position",
    });

  const availableSubCategories = useMemo(() => {
    if (!productsGroupBySubCategory || !subCategories) return [];

    const subCategoryIdsWithProducts = new Set<string>();
    productsGroupBySubCategory.forEach((group) => {
      if (group.products.length > 0) {
        subCategoryIdsWithProducts.add(group.id);
      }
    });

    return subCategories.filter((subCategory) =>
      subCategoryIdsWithProducts.has(subCategory.id),
    );
  }, [productsGroupBySubCategory, subCategories]);

  const subcategoryCounts = useMemo(() => {
    if (!productsGroupBySubCategory || !cartItems.length) return {};

    const productToSubCategoryMap = new Map<number, string>();
    productsGroupBySubCategory.forEach((group) => {
      group.products.forEach((product) => {
        productToSubCategoryMap.set(product.id, group.id);
      });
    });

    const counts: Record<string, number> = {};
    cartItems.forEach((cartItem: CartItem) => {
      const subCategoryId = productToSubCategoryMap.get(cartItem.productId);
      if (subCategoryId) {
        counts[subCategoryId] =
          (counts[subCategoryId] || 0) + cartItem.quantity;
      }
    });

    return counts;
  }, [productsGroupBySubCategory, cartItems]);

  if (isLoadingCategories) {
    return (
      <div className="flex h-screen flex-col gap-4 overflow-hidden">
        <div className="page flex flex-shrink-0 flex-col gap-4">
          <SearchBar onClick={() => navigate("/menu/search")} />
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-24 w-20 flex-shrink-0 animate-pulse rounded-lg bg-neutral100"
              />
            ))}
          </div>
        </div>
        <div className="flex min-h-0 flex-1 gap-4">
          <div className="flex w-full max-w-[68px] flex-col gap-3 px-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="aspect-square w-full animate-pulse rounded-lg bg-neutral100"
              />
            ))}
          </div>
          <div className="flex-1 space-y-4 px-4">
            {[1, 2].map((groupIdx) => (
              <div key={groupIdx}>
                <div className="mb-3 h-6 w-32 animate-pulse rounded bg-neutral100" />
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="aspect-square animate-pulse rounded-lg bg-neutral100" />
                      <div className="h-4 animate-pulse rounded bg-neutral100" />
                      <div className="h-4 w-2/3 animate-pulse rounded bg-neutral100" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col gap-4">
      <div className="mx-3.5 flex flex-shrink-0 flex-col gap-4">
        <SearchBar onClick={() => navigate("/menu/search")} />
        <CategoryList
          categories={categories || []}
          selectedId={selectedCategory?.id || ""}
          onCategorySelect={(category) => setSelectedCategory(category)}
        />
      </div>
      <div className="no-scrollbar flex min-h-0 flex-1 overflow-y-scroll">
        {isLoadingSubCategories ? (
          <div className="flex w-full max-w-[68px] flex-col gap-3 px-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="aspect-square w-full animate-pulse rounded-lg bg-neutral100"
              />
            ))}
          </div>
        ) : (
          <div className="no-scrollbar mb-4 w-full max-w-[72px] flex-1 overflow-y-scroll">
            <div className="pr-2">
              <SubcategorySidebar
                className="[&>button:first-child]:rounded-tr-lg [&>button:last-child]:rounded-br-lg"
                subcategories={availableSubCategories}
                selectedId={activeSubcategoryId}
                counts={subcategoryCounts}
                onSubCategoryClick={(subcategory) => {
                  scrollToId(subcategory.id);
                  setActiveSubcategoryId(subcategory.id);
                }}
              />
            </div>
          </div>
        )}

        <div
          ref={productContainerRef}
          className="no-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto px-2 pb-[50vh]"
        >
          {isLoadingProducts ? (
            <div className="space-y-4 px-4">
              {[1, 2].map((groupIdx) => (
                <div key={groupIdx}>
                  <div className="mb-3 h-6 w-32 animate-pulse rounded bg-neutral100" />
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="space-y-2">
                        <div className="aspect-square animate-pulse rounded-lg bg-neutral100" />
                        <div className="h-4 animate-pulse rounded bg-neutral100" />
                        <div className="h-4 w-2/3 animate-pulse rounded bg-neutral100" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            productsGroupBySubCategory?.map((item) => {
              if (item.products.length <= 0) return null;
              return (
                <ProductGrid
                  key={item.id}
                  id={item.id}
                  products={item.products || []}
                  category={item.name}
                  categoryImg={item.image}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
