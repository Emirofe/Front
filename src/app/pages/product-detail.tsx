import { useState } from "react";
import { useParams, Link } from "react-router";
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Store,
  ChevronRight,
  Clock,
  Calendar,
  MapPin,
  Package,
  Building2,
} from "lucide-react";
import { products, mockBundles } from "../data/mock-data";
import {
  getProductImages,
  getProductLocation,
  getProductOriginalPrice,
  getProductPrice,
  getProductPrimaryImage,
  getProductRating,
  getProductReviewCount,
  getProductReviews,
  getProductSellerName,
  getProductSellerRating,
  getProductStock,
} from "../data/catalog-helpers";
import { StarRating } from "../components/star-rating";
import { useStore } from "../context/store-context";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { toast } from "sonner";

export function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"descripcion" | "resenas" | "vendedor">("descripcion");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2>Producto no encontrado</h2>
            <Link to="/" className="text-primary hover:underline mt-4 inline-block">Volver al inicio</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isService = product.type === "servicio";
  const inWishlist = isInWishlist(product.id);
  const sellerBundles = mockBundles.filter((bundle) => bundle.sellerId === product.sellerId);
  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);
  const productImages = getProductImages(product);
  const primaryImage = getProductPrimaryImage(product);
  const productPrice = getProductPrice(product);
  const originalPrice = getProductOriginalPrice(product);
  const productReviews = getProductReviews(product);
  const reviewCount = getProductReviewCount(product);
  const productRating = getProductRating(product);
  const sellerName = getProductSellerName(product);
  const sellerRating = getProductSellerRating(product);
  const stock = getProductStock(product);
  const businessLocation = getProductLocation(product);

  const handleAddToCart = () => {
    if (isService) {
      if (!selectedDate || !selectedTime) {
        toast.error("Por favor selecciona una fecha y hora para el servicio");
        return;
      }
      addToCart(product, 1, selectedDate, selectedTime);
      toast.success(`${product.name} agendado para el ${selectedDate} a las ${selectedTime}`);
      return;
    }

    if (stock === 0) {
      toast.error("Este producto esta agotado");
      return;
    }

    if (quantity > stock) {
      toast.error(`Solo hay ${stock} unidades disponibles`);
      return;
    }

    addToCart(product, quantity);
    toast.success(`${product.name} (x${quantity}) agregado al carrito`);
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast("Eliminado de lista de deseos");
    } else {
      addToWishlist(product);
      toast.success("Agregado a lista de deseos");
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewRating === 0) {
      toast.error("Selecciona una calificacion");
      return;
    }
    if (!reviewComment.trim() || reviewComment.trim().length < 10) {
      toast.error("El comentario debe tener al menos 10 caracteres");
      return;
    }
    toast.success("Resena enviada exitosamente");
    setShowReviewForm(false);
    setReviewRating(0);
    setReviewComment("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-muted-foreground" style={{ fontSize: 13 }}>
        <Link to="/" className="hover:text-primary">Inicio</Link>
        <ChevronRight size={14} />
        <Link to={`/?categoria=${product.category}`} className="hover:text-primary capitalize">
          {product.category.replace("-", " ")}
        </Link>
        <ChevronRight size={14} />
        <span className="text-foreground truncate">{product.name}</span>
      </div>

      <main className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-6 lg:p-8">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4">
                <img
                  src={productImages[selectedImage] || primaryImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {productImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto">
                  {productImages.map((image, index) => (
                    <button
                      key={`${product.id}-image-${index}`}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors shrink-0 ${
                        index === selectedImage ? "border-primary" : "border-border"
                      }`}
                    >
                      <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 lg:p-8 lg:border-l border-border">
              <div className="flex items-center gap-2 mb-2">
                <Link to={`/?buscar=${sellerName}`} className="text-primary hover:underline" style={{ fontSize: 14 }}>
                  <Store size={14} className="inline mr-1" />
                  {sellerName}
                </Link>
                <span className="text-muted-foreground" style={{ fontSize: 13 }}>
                  ({sellerRating.toFixed(1)} estrellas)
                </span>
              </div>

              <h1 className="mb-3" style={{ fontSize: 24, fontWeight: 600 }}>{product.name}</h1>

              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={productRating} size={18} showCount count={reviewCount} />
              </div>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-primary" style={{ fontSize: 32, fontWeight: 700 }}>
                  ${productPrice.toFixed(2)}
                </span>
                {originalPrice && (
                  <>
                    <span className="text-muted-foreground line-through" style={{ fontSize: 18 }}>
                      ${originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded" style={{ fontSize: 13, fontWeight: 600 }}>
                      -{Math.round(((originalPrice - productPrice) / originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              <div className="mb-6">
                {isService ? (
                  <span className="text-primary flex items-center gap-2" style={{ fontSize: 14, fontWeight: 500 }}>
                    <Clock size={16} /> Duracion estimada: {product.durationMin} minutos
                  </span>
                ) : (
                  <>
                    {stock > 10 ? (
                      <span className="text-green-600" style={{ fontSize: 14, fontWeight: 500 }}>
                        En stock
                      </span>
                    ) : stock > 0 ? (
                      <span className="text-amber-600" style={{ fontSize: 14, fontWeight: 500 }}>
                        Quedan solo {stock} unidades
                      </span>
                    ) : (
                      <span className="text-red-600" style={{ fontSize: 14, fontWeight: 500 }}>
                        Agotado
                      </span>
                    )}
                  </>
                )}
              </div>

              {isService ? (
                <div className="mb-6 space-y-4 bg-gray-50 p-4 rounded-xl border border-border">
                  <h3 style={{ fontSize: 16, fontWeight: 600 }}>Agendar Servicio</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1.5 flex items-center gap-2" style={{ fontSize: 13, fontWeight: 500 }}>
                        <Calendar size={14} className="text-primary" /> Fecha
                      </label>
                      <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-white outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5 flex items-center gap-2" style={{ fontSize: 13, fontWeight: 500 }}>
                        <Clock size={14} className="text-primary" /> Horario
                      </label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-white outline-none focus:border-primary"
                      >
                        <option value="">Selecciona hora</option>
                        <option value="09:00">09:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                        <option value="18:00">06:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 mb-6">
                  <span style={{ fontSize: 14 }}>Cantidad:</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="px-4 py-2 min-w-[48px] text-center" style={{ fontSize: 16, fontWeight: 600 }}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((current) => Math.min(stock || 1, current + 1))}
                      className="p-2 hover:bg-gray-50 transition-colors"
                      disabled={stock === 0}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={!isService && stock === 0}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontSize: 16, fontWeight: 600 }}
                >
                  <ShoppingCart size={20} />
                  {isService ? "Agendar y Agregar" : "Agregar al Carrito"}
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`p-3.5 rounded-xl border-2 transition-colors ${
                    inWishlist
                      ? "border-red-500 text-red-500 bg-red-50"
                      : "border-border text-muted-foreground hover:border-red-300 hover:text-red-500"
                  }`}
                >
                  <Heart size={22} className={inWishlist ? "fill-current" : ""} />
                </button>
              </div>

              {isService ? (
                <div className="bg-primary/5 rounded-xl p-4 flex items-center gap-3">
                  <MapPin size={20} className="text-primary shrink-0" />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500 }}>Geolocalizacion Activa</p>
                    <p className="text-muted-foreground" style={{ fontSize: 13 }}>Este servicio esta disponible en un radio de 15km</p>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                  <Package size={20} className="text-primary shrink-0" />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500 }}>Envio estimado: 3-5 dias habiles</p>
                    <p className="text-muted-foreground" style={{ fontSize: 13 }}>
                      Ubicacion del negocio: {businessLocation?.city || "Sin ciudad registrada"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border mt-6 overflow-hidden">
          <div className="flex border-b border-border">
            {(["descripcion", "resenas", "vendedor"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 capitalize transition-colors ${
                  activeTab === tab
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontSize: 15, fontWeight: 500 }}
              >
                {tab === "resenas" ? `Resenas (${reviewCount})` : tab === "vendedor" ? "Info del Vendedor" : "Descripcion"}
              </button>
            ))}
          </div>
          <div className="p-6 lg:p-8">
            {activeTab === "descripcion" && (
              <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 15 }}>
                {product.description}
              </p>
            )}
            {activeTab === "resenas" && (
              <div>
                <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 600 }}>Resenas de Clientes</h3>
                    <p className="text-muted-foreground mt-1" style={{ fontSize: 13 }}>
                      Calificacion promedio: {productRating.toFixed(1)} de 5
                    </p>
                  </div>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    style={{ fontSize: 14 }}
                  >
                    Escribir Resena
                  </button>
                </div>

                {showReviewForm && (
                  <form onSubmit={handleSubmitReview} className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h4 className="mb-3" style={{ fontSize: 16, fontWeight: 500 }}>Tu Calificacion</h4>
                    <StarRating rating={reviewRating} interactive onChange={setReviewRating} size={28} />
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Escribe tu comentario..."
                      rows={3}
                      className="w-full mt-4 px-4 py-3 rounded-lg border border-border bg-white outline-none focus:border-primary"
                      style={{ fontSize: 14 }}
                    />
                    <div className="flex gap-2 mt-3">
                      <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg" style={{ fontSize: 14 }}>
                        Enviar
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="px-4 py-2 border border-border rounded-lg"
                        style={{ fontSize: 14 }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                )}

                {productReviews.length === 0 ? (
                  <p className="text-muted-foreground" style={{ fontSize: 14 }}>Aun no hay resenas para este producto.</p>
                ) : (
                  <div className="space-y-4">
                    {productReviews.map((review) => (
                      <div key={review.id} className="border-b border-border pb-4 last:border-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary" style={{ fontSize: 14, fontWeight: 600 }}>
                            {review.userName[0]}
                          </div>
                          <div>
                            <p style={{ fontSize: 14, fontWeight: 500 }}>{review.userName}</p>
                            <p className="text-muted-foreground" style={{ fontSize: 12 }}>{review.date}</p>
                          </div>
                        </div>
                        <StarRating rating={review.rating} size={14} />
                        <p className="text-muted-foreground mt-2" style={{ fontSize: 14 }}>{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {activeTab === "vendedor" && (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Store size={28} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 600 }}>{sellerName}</h3>
                    <StarRating rating={sellerRating} size={16} showCount count={reviewCount} />
                    <p className="text-muted-foreground mt-2" style={{ fontSize: 14 }}>
                      Vendedor verificado en TultiMarket. La vista de detalle usa la misma agrupacion de negocio, resenas e imagenes que consume el catalogo.
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 size={18} className="text-primary" />
                    <h4 style={{ fontSize: 16, fontWeight: 600 }}>Ubicacion del Negocio</h4>
                  </div>
                  {!businessLocation ? (
                    <p className="text-muted-foreground" style={{ fontSize: 14 }}>
                      Este vendedor aun no tiene una direccion matriz registrada.
                    </p>
                  ) : (
                    <div className="rounded-xl border border-border p-4 bg-gray-50">
                      <p style={{ fontSize: 15, fontWeight: 600 }}>{sellerName}</p>
                      <p className="text-muted-foreground mt-1" style={{ fontSize: 14 }}>{businessLocation.address}</p>
                      {([businessLocation.city, businessLocation.state, businessLocation.country].filter(Boolean).length > 0) && (
                        <p className="text-muted-foreground mt-1" style={{ fontSize: 13 }}>
                          {[businessLocation.city, businessLocation.state, businessLocation.country].filter(Boolean).join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {sellerBundles.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4" style={{ fontSize: 20, fontWeight: 600 }}>
              Paquetes Promocionales del Vendedor
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sellerBundles.map((bundle) => (
                <div key={bundle.id} className="bg-white rounded-xl border border-border p-6">
                  <h3 className="mb-3" style={{ fontSize: 16, fontWeight: 600 }}>{bundle.name}</h3>
                  <div className="space-y-2 mb-4">
                    {bundle.products.map((bundleProduct) => (
                      <div key={bundleProduct.id} className="flex items-center gap-3">
                        <img src={getProductPrimaryImage(bundleProduct)} alt={bundleProduct.name} className="w-12 h-12 rounded object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="truncate" style={{ fontSize: 14 }}>{bundleProduct.name}</p>
                          <p className="text-muted-foreground" style={{ fontSize: 13 }}>${getProductPrice(bundleProduct).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-primary" style={{ fontSize: 24, fontWeight: 700 }}>
                      ${bundle.bundlePrice.toFixed(2)}
                    </span>
                    <span className="text-muted-foreground line-through" style={{ fontSize: 14 }}>
                      ${bundle.originalTotal.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded" style={{ fontSize: 12, fontWeight: 600 }}>
                      Ahorras ${(bundle.originalTotal - bundle.bundlePrice).toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      bundle.products.forEach((bundleProduct) => addToCart(bundleProduct));
                      toast.success("Paquete agregado al carrito");
                    }}
                    className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
                    style={{ fontSize: 14 }}
                  >
                    Agregar Paquete al Carrito
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {relatedProducts.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4" style={{ fontSize: 20, fontWeight: 600 }}>
              Productos Similares
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/producto/${relatedProduct.id}`}
                  className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-all group"
                >
                  <div className="aspect-square bg-gray-50">
                    <img
                      src={getProductPrimaryImage(relatedProduct)}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-3">
                    <p className="truncate" style={{ fontSize: 14 }}>{relatedProduct.name}</p>
                    <p className="text-primary mt-1" style={{ fontSize: 16, fontWeight: 600 }}>
                      ${getProductPrice(relatedProduct).toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
