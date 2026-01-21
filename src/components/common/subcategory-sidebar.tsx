import { SubCategory } from "@/types/category.types";
import { cn } from "@/utils/cn";

interface SubcategorySidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  subcategories: SubCategory[];
  selectedId?: string;
  onSubCategoryClick?: (subcategory: SubCategory) => void;
  counts?: Record<string, number>;
}

export default function SubcategorySidebar({
  subcategories,
  selectedId,
  onSubCategoryClick,
  counts,
  className,
  ...props
}: SubcategorySidebarProps) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {subcategories.map((subcategory, index) => (
        <button
          key={subcategory.id}
          className={cn(
            "relative flex w-full items-center justify-between gap-1 bg-clip-padding p-2 text-left",
            selectedId === subcategory.id
              ? "border-l-4 border-l-primary bg-orange500/10"
              : "bg-white",
          )}
          onClick={() => onSubCategoryClick?.(subcategory)}
        >
          <span className="line-clamp-2 flex-1">{subcategory.name}</span>
          {counts?.[subcategory.id]! > 0 && (
            <span className="absolute -right-2 flex aspect-square items-center justify-center rounded-full bg-primary px-1 text-xxsmall text-white">
              {counts?.[subcategory.id]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
