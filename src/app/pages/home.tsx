import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router";
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { products, categories } from "../data/mock-data";
import { getProductPrice, matchesCatalogSearch } from "../data/catalog-helpers";
import { ProductCard } from "../components/product-card";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";

const bannerImages = [
  {
    image: "https://images.unsplash.com/photo-1643537243683-a61ba2e77cf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXR0aSUyMGNlbGVicmF0aW9uJTIwZmVzdGl2ZXxlbnwxfHx8fDE3NzI2OTgyODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Gran Venta de Temporada",
    subtitle: "Hasta 40% de descuento en decoraciones para fiestas",
  },
  {
    image: "https://images.unsplash.com/photo-1759124650346-43900f8479d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMHBhcnR5JTIwZGVjb3JhdGlvbiUyMHRhYmxlfGVufDF8fHx8MTc3Mjc2NTAxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Fiestas Inolvidables",
    subtitle: "Todo para tu celebracion en un solo lugar",
  },
  {
    image: "https://images.unsplash.com/photo-1763913270132-00b89e7fd5aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMGhhdHMlMjBjb2xvcmZ1bCUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc3Mjc2NTAxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Nuevos Productos",
    subtitle: "Descubre las ultimas tendencias en accesorios de fiesta",
  },
];

export function HomePage() {
  const [searchParams] = useSearchParams();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [sortBy, setSortBy] = useState("relevancia");
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const categoryFilter = searchParams.get("categoria");
  const searchFilter = searchParams.get("buscar");
  const maxCatalogPrice = useMemo(
    () => Math.max(...products.map((product) => getProductPrice(product)), 0),
    []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxCatalogPrice]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
    }
    if (searchFilter) {
      result = result.filter((product) => matchesCatalogSearch(product, searchFilter));
    }
    result = result.filter(
      (product) => {
        const price = getProductPrice(product);
        return price >= priceRange[0] && price <= priceRange[1];
      }
    );
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    switch (sortBy) {
      case "precio-asc":
        result.sort((a, b) => getProductPrice(a) - getProductPrice(b));
        break;
      case "precio-desc":
        result.sort((a, b) => getProductPrice(b) - getProductPrice(a));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "nombre":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [categoryFilter, searchFilter, sortBy, priceRange, minRating]);

  const topRated = useMemo(
    () => [...products].sort((a, b) => b.rating - a.rating).slice(0, 4),
    []
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Banner */}
      {!categoryFilter && !searchFilter && (
        <section className="relative w-full h-[320px] md:h-[400px] overflow-hidden">
          {bannerImages.map((banner, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ${
                idx === currentBanner ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 w-full">
                  <h2
                    className="text-white max-w-lg"
                    style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2 }}
                  >
                    {banner.title}
                  </h2>
                  <p className="text-white/80 mt-3 max-w-md" style={{ fontSize: 18 }}>
                    {banner.subtitle}
                  </p>
                  <Link
                    to="/?categoria=cumpleanos"
                    className="inline-block mt-6 bg-amber-400 text-[#022C22] px-8 py-3 rounded-lg hover:bg-amber-300 transition-colors"
                    style={{ fontSize: 16, fontWeight: 600 }}
                  >
                    Explorar Ofertas
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => setCurrentBanner((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-800" />
          </button>
          <button
            onClick={() => setCurrentBanner((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
          >
            <ChevronRight size={24} className="text-gray-800" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {bannerImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentBanner(idx)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  idx === currentBanner ? "bg-amber-400" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {!categoryFilter && !searchFilter && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="mb-6" style={{ fontSize: 22, fontWeight: 600 }}>
            Buscar por Categoria
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/?categoria=${cat.id}`}
                className="bg-white rounded-xl border border-border p-4 text-center hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div style={{ fontSize: 32 }} className="mb-2">
                  {cat.icon}
                </div>
                <p
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                  style={{ fontSize: 13, fontWeight: 500 }}
                >
                  {cat.name}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Top rated - only on home */}
      {!categoryFilter && !searchFilter && (
        <section className="max-w-7xl mx-auto px-4 pb-8">
          <h2 className="mb-6" style={{ fontSize: 22, fontWeight: 600 }}>
            Mejor Calificados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topRated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Product Catalog */}
      <section className="max-w-7xl mx-auto px-4 pb-12 w-full">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600 }}>
              {categoryFilter
                ? categories.find((c) => c.id === categoryFilter)?.name || "Productos"
                : searchFilter
                ? `Resultados para "${searchFilter}"`
                : "Todos los Productos"}
            </h2>
            <p className="text-muted-foreground" style={{ fontSize: 14 }}>
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""} encontrado{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-white transition-colors"
              style={{ fontSize: 14 }}
            >
              <SlidersHorizontal size={16} />
              Filtros
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-white outline-none"
              style={{ fontSize: 14 }}
            >
              <option value="relevancia">Relevancia</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Calificados</option>
              <option value="nombre">Nombre A-Z</option>
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white border border-border rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontSize: 16, fontWeight: 600 }}>Filtros</h3>
              <button onClick={() => setShowFilters(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block mb-2 text-muted-foreground" style={{ fontSize: 13 }}>
                  Rango de Precio
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Math.max(0, Number(e.target.value)), priceRange[1]])}
                    className="w-24 px-3 py-2 border border-border rounded-lg bg-input-background"
                    style={{ fontSize: 14 }}
                    placeholder="Min"
                  />
                  <span className="text-muted-foreground">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Math.min(maxCatalogPrice, Number(e.target.value) || maxCatalogPrice)])}
                    className="w-24 px-3 py-2 border border-border rounded-lg bg-input-background"
                    style={{ fontSize: 14 }}
                    placeholder="Max"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-muted-foreground" style={{ fontSize: 13 }}>
                  Calificacion minima
                </label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input-background"
                  style={{ fontSize: 14 }}
                >
                  <option value={0}>Todas</option>
                  <option value={4}>4+ estrellas</option>
                  <option value={4.5}>4.5+ estrellas</option>
                  <option value={3}>3+ estrellas</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setPriceRange([0, maxCatalogPrice]);
                    setMinRating(0);
                    setSortBy("relevancia");
                  }}
                  className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors"
                  style={{ fontSize: 14 }}
                >
                  Limpiar Filtros
                </button>
              </div>
            </div>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground" style={{ fontSize: 18 }}>
              No se encontraron productos
            </p>
            <Link to="/" className="text-primary hover:underline mt-2 inline-block" style={{ fontSize: 14 }}>
              Ver todos los productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
