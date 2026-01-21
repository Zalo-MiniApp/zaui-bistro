import { Category } from "@/types/category.types";
import { cn } from "@/utils/cn";

interface CategoryListProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: Category[];
  selectedId?: string;
  onCategorySelect?: (category: Category) => void;
}

export default function CategoryList({
  categories,
  selectedId,
  onCategorySelect,
  ...props
}: CategoryListProps) {
  return (
    <div
      className={cn(
        "no-scrollbar flex flex-nowrap gap-2 overflow-x-auto",
        props.className,
      )}
      {...props}
    >
      {categories.map((category) => (
        <div
          key={category.id}
          className={cn(
            "text-center text-xxsmall",
            "flex gap-2 rounded-lg px-3 py-1.5 hover:cursor-pointer",
            "shrink-0 items-center justify-center whitespace-nowrap",
            category.id === selectedId
              ? "border border-primary bg-primary !text-white"
              : "border border-divider01 bg-white !text-text-secondary",
          )}
          onClick={() => onCategorySelect?.(category)}
        >
          <div>{category.name}</div>
        </div>
      ))}
    </div>
  );
}
