import { ProductFeature } from "@/types/product.types";
import { cn } from "@/utils/cn";

interface ProductFeatureListProps {
  features: ProductFeature[];
  selectedId: string | null;
  onFeatureSelect: (feature: ProductFeature) => void;
}

export default function ProductFeatureList({
  features,
  selectedId,
  onFeatureSelect,
}: ProductFeatureListProps) {
  return (
    <div className="overflow-x-auto no-scrollbar">
      <div className="flex flex-wrap gap-2 min-w-[160vw]">
        {features.map((feature) => (
          <div
            key={feature.id}
            onClick={() => onFeatureSelect(feature)}
            className={cn(
              "cursor-pointer whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium",
              feature.id === selectedId
                ? "bg-yellow100 text-orange600"
                : "bg-neutral100 text-gray500"
            )}
          >
            {feature.name}
          </div>
        ))}
      </div>
    </div>
  );
}
