import { useNavigate } from "react-router-dom";
import ProductCard from "./product-card";
import SectionTitle from "./section-title";
import { Product } from "@/types/product.types";
import { useCartStore } from "@/stores/cart.store";
import { getDefaultVariants } from "@/utils/product";

interface ProductGridProps extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[];
  category?: string;
  categoryImg?: string;
}

export default function ProductGrid({
  products,
  category,
  categoryImg,
  ...props
}: ProductGridProps) {
  const navigate = useNavigate();
  const { addToCart, openCheckoutSheet } = useCartStore();

  const handleQuickAddToCart = (product: Product) => {
    const defaultVariants = getDefaultVariants(product);
    addToCart({
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      basePrice: product.price,
      selectedVariants: defaultVariants,
      quantity: 1,
    });
    openCheckoutSheet();
  };

  return (
    <div {...props}>
      {category && (
        <SectionTitle title={category} image={categoryImg} hideIcon={true} />
      )}
      <div className="mt-2 grid flex-none grid-cols-2 place-items-center gap-2 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            onClick={() => {
              navigate(`/product/${product.id}`);
            }}
            onAddToCart={() => handleQuickAddToCart(product)}
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
