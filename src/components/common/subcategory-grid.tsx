import { SubCategory } from "@/types/category.types";
import { cn } from "@/utils/cn";

interface SubCategoryGridProps {
  subcategories: SubCategory[];
  onSubCategoryClick?: (subcategory: SubCategory) => void;
}

export default function SubCategoryGrid({
  subcategories,
  onSubCategoryClick,
}: SubCategoryGridProps) {
  return (
    <div className="grid grid-cols-4 gap-2 rounded-lg border-2 border-components-sub_cate-border/20 bg-white px-3 py-4">
      {subcategories.map((subcategory) => (
        <div
          key={subcategory.id}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2 transition-opacity active:opacity-50",
          )}
          onClick={() => onSubCategoryClick?.(subcategory)}
        >
          <img
            draggable={false}
            className="size-10"
            src={subcategory.image}
            alt={subcategory.name}
          />
          <div className="w-full truncate text-center text-[12px]">
            {subcategory.name}
          </div>
        </div>
      ))}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="grid grid-cols-4 gap-2 rounded-lg border-2 border-components-sub_cate-border/20 bg-white px-3 py-4">
      {Array.from({ length: 8 }).map((subcategory, index) => (
        <div
          key={index}
          className={cn(
            "flex flex-col items-center justify-center gap-2 transition-opacity active:opacity-50",
          )}
        >
          <div className="size-10 animate-pulse bg-background"></div>
          <div className="invisible w-full truncate text-center text-[12px]">
            loading
          </div>
        </div>
      ))}
    </div>
  );
}

SubCategoryGrid.Skeleton = Skeleton;
