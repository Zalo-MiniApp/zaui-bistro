import CategoryList from "@/components/common/category-list";
import ProductFeatureList from "@/components/common/product-feature-list";
import ProductGrid from "@/components/common/product-grid";
import SearchBar from "@/components/common/search-bar";
import SectionTitle from "@/components/common/section-title";
import SubCategoryGrid from "@/components/common/subcategory-grid";
import {
  useCategories,
  useSubCategories,
} from "@/services/category/category.queries";
import {
  useProductFeatures,
  useProductsGroupBySubcategory,
} from "@/services/product/product.queries";
import { Category } from "@/types/category.types";
import { ProductFeature } from "@/types/product.types";
import { useSubcategoryVisibility } from "@/hooks/use-subcategory-visibility";
import { scrollToId } from "@/utils/scroll-to";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { copy } from "@/constants/copy";

export default function HomePage() {
  const navigate = useNavigate();
  const productContainerRef = useRef<HTMLDivElement>(null);

  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const { data: subCategories, isLoading: isLoadingSubCategories } =
    useSubCategories(selectedCategory?.id || "");
  const { data: productFeatures, isLoading: isLoadingFeatures } =
    useProductFeatures(selectedCategory?.id || "");

  const [selectedProductFeature, setSelectedProductFeature] =
    useState<ProductFeature | null>(null);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  useEffect(() => {
    if (productFeatures && productFeatures.length > 0) {
      setSelectedProductFeature(null);
    }
  }, [productFeatures]);

  const { data: productsGroupBySubCategory, isLoading: isLoadingProducts } =
    useProductsGroupBySubcategory(
      selectedCategory?.id || "",
      selectedProductFeature?.id || "",
    );

  const visibleSubCategoryIds = useMemo(
    () =>
      (productsGroupBySubCategory || [])
        .filter((group) => group.products.length > 0)
        .map((group) => group.id),
    [productsGroupBySubCategory],
  );

  const { setActiveSubcategoryId } = useSubcategoryVisibility({
    containerRef: productContainerRef,
    subcategoryIds: visibleSubCategoryIds,
    storageKey: "home_scroll_position",
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

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <div className="mb-4 flex flex-col gap-4">
        <div className="mx-3.5">
          <SearchBar onClick={() => navigate("/menu/search")} />
        </div>
        <div className="ml-3.5">
          <CategoryList
            selectedId={selectedCategory?.id || ""}
            categories={categories || []}
            onCategorySelect={(category) => setSelectedCategory(category)}
          />
        </div>
      </div>
      <div
        ref={productContainerRef}
        className="no-scrollbar flex min-h-0 flex-1 flex-col gap-4 overflow-y-scroll"
      >
        <div className="mx-3.5">
          {isLoadingProducts ? (
            <SubCategoryGrid.Skeleton />
          ) : (
            <SubCategoryGrid
              subcategories={availableSubCategories || []}
              onSubCategoryClick={(subcategory) => {
                scrollToId(subcategory.id);
                setActiveSubcategoryId(subcategory.id);
              }}
            />
          )}
        </div>

        <div className="ml-4 flex flex-col gap-2">
          <SectionTitle title={copy.home.suggestions} />
          <ProductFeatureList
            features={productFeatures || []}
            selectedId={selectedProductFeature?.id || ""}
            onFeatureSelect={(feature) =>
              setSelectedProductFeature(
                feature === selectedProductFeature ? null : feature,
              )
            }
          />
        </div>
        <div className="mx-3.5 flex flex-col gap-4 pb-2">
          {productsGroupBySubCategory?.map((item) => {
            if (item.products.length <= 0) return null;
            return (
              <ProductGrid
                key={item.id}
                id={item.id}
                products={item.products || []}
                category={item.name}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
