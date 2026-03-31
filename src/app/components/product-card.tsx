import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import { Product } from "../data/mock-data";
import {
  getProductOriginalPrice,
  getProductPrimaryImage,
  getProductPrice,
  getProductRating,
  getProductReviewCount,
  getProductSellerName,
  getProductStock,
} from "../data/catalog-helpers";
import { StarRating } from "./star-rating";
import { useStore } from "../context/store-context";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);
  const productPrice = getProductPrice(product);
  const originalPrice = getProductOriginalPrice(product);
  const productImage = getProductPrimaryImage(product);
  const productRating = getProductRating(product);
  const reviewCount = getProductReviewCount(product);
  const sellerName = getProductSellerName(product);
  const stock = getProductStock(product);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.type !== "servicio" && stock === 0) {
      toast.error("Este producto esta agotado");
      return;
    }
    addToCart(product);
    toast.success(`${product.name} agregado al carrito`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast("Eliminado de lista de deseos");
    } else {
      addToWishlist(product);
      toast.success("Agregado a lista de deseos");
    }
  };

  return (
    <Link
      to={`/producto/${product.id}`}
      className="group bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      <div className="relative overflow-hidden aspect-square bg-gray-50">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors ${
            inWishlist ? "text-red-500" : "text-gray-400 hover:text-red-500"
          }`}
        >
          <Heart size={18} className={inWishlist ? "fill-current" : ""} />
        </button>
        {originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-0.5 rounded-md" style={{ fontSize: 12 }}>
            -{Math.round(((originalPrice - productPrice) / originalPrice) * 100)}%
          </div>
        )}
        {stock < 10 && stock > 0 && (
          <div className="absolute bottom-3 left-3 bg-amber-500 text-white px-2 py-0.5 rounded-md" style={{ fontSize: 12 }}>
            Quedan {stock}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-muted-foreground mb-1" style={{ fontSize: 12 }}>
          {sellerName}
        </p>
        <h3 className="mb-2 line-clamp-2 group-hover:text-primary transition-colors" style={{ fontSize: 14 }}>
          {product.name}
        </h3>
        <div className="mb-2">
          <StarRating rating={productRating} size={14} showCount count={reviewCount} />
        </div>
        <div className="flex items-baseline gap-2 mb-3 mt-auto">
          <span className="text-primary" style={{ fontSize: 20, fontWeight: 700 }}>
            ${productPrice.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-muted-foreground line-through" style={{ fontSize: 13 }}>
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
          style={{ fontSize: 14 }}
        >
          <ShoppingCart size={16} />
          Agregar al carrito
        </button>
      </div>
    </Link>
  );
}
