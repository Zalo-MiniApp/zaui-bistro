import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "@/components/common/product-grid";
import SearchBar from "@/components/common/search-bar";
import { mockListOfProduct } from "@/services/product/product.mock";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
  }, [searchQuery, setSearchParams]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockListOfProduct;
    }

    const query = searchQuery.toLowerCase();
    return mockListOfProduct.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  return (
    <div className="relative mx-3.5 mb-6 flex h-full flex-col">
      <div className="mb-2">
        <SearchBar
          clearable
          autoFocus
          value={searchQuery}
          onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
        />
      </div>
      <div className="no-scrollbar flex flex-1 flex-col gap-2 overflow-y-scroll">
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
