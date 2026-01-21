import { Product } from "@/types/product.types";
import { Button, Text } from "zmp-ui";
import { copy } from "@/constants/copy";
import { formatCurrency } from "@/utils/format";
import { PlusIcon } from "./vectors";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onAddToCart?: () => void;
}

export default function ProductCard({
  product,
  onClick,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="flex flex-col gap-2 overflow-hidden rounded-xl bg-white p-2">
      <div
        className="relative aspect-square overflow-hidden rounded-lg"
        onClick={onClick}
      >
        {product.sales?.freeShipping && (
          <div className="absolute left-0 top-0 z-10 flex h-4.5 w-[109px] items-center justify-center truncate rounded-br-lg bg-orange500 px-2 py-1 text-xxxsmall text-white">
            {copy.common.freeShipping}
          </div>
        )}
        {product.newMarked && (
          <div className="absolute right-2 top-2 z-10">
            <div className="relative inline-flex">
              <div className="absolute -inset-[2.63px] rounded-full bg-white/40" />

              <div className="z-10 flex items-center justify-center rounded-full bg-white px-2 py-1 text-xxxsmall-bl !text-red800">
                <div>{copy.common.new.toUpperCase()}</div>
              </div>
            </div>
          </div>
        )}
        <img
          draggable={false}
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex gap-2">
        {product.sales?.discount && (
          <div className="h-fit whitespace-nowrap rounded-l-md rounded-tr-md bg-red800 px-1.5 py-0.5 text-center text-xs text-white">
            {copy.common.promotion}
          </div>
        )}
        <Text className="truncate text-base font-medium">{product.name}</Text>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="text-xlarge-sb font-semibold">
          {formatCurrency(product.price)}
          <span style={{ fontSize: "12px" }}>đ</span>
        </div>
        <Button
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.();
          }}
          className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary p-0 text-lg font-bold text-white transition-transform active:scale-95 active:bg-primary/50"
          aria-label={copy.common.addToCart}
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
}
