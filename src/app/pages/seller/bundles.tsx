import { useState } from "react";
import { Plus, Trash2, Package } from "lucide-react";
import { products, mockBundles, Bundle } from "../../data/mock-data";
import { toast } from "sonner";

export function SellerBundlesPage() {
  const sellerProducts = products.filter((p) => p.sellerId === "s1");
  const [bundles, setBundles] = useState<Bundle[]>(mockBundles.filter((b) => b.sellerId === "s1"));
  const [showForm, setShowForm] = useState(false);
  const [bundleName, setBundleName] = useState("");
  const [bundlePrice, setBundlePrice] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const toggleProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const selectedItems = sellerProducts.filter((p) => selectedProducts.includes(p.id));
  const originalTotal = selectedItems.reduce((sum, p) => sum + p.price, 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProducts.length < 2) {
      toast.error("Selecciona al menos 2 productos");
      return;
    }
    const newBundle: Bundle = {
      id: `b-${Date.now()}`,
      name: bundleName,
      products: selectedItems,
      bundlePrice: parseFloat(bundlePrice),
      originalTotal,
      sellerId: "s1",
    };
    setBundles((prev) => [...prev, newBundle]);
    setShowForm(false);
    setBundleName("");
    setBundlePrice("");
    setSelectedProducts([]);
    toast.success("Paquete promocional creado");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 style={{ fontSize: 24, fontWeight: 600 }}>Paquetes Promocionales</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary/90"
          style={{ fontSize: 14 }}
        >
          <Plus size={18} /> Crear Paquete
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-border p-6 mb-6">
          <h3 className="mb-4" style={{ fontSize: 18, fontWeight: 600 }}>Nuevo Paquete Promocional</h3>
          <form onSubmit={handleCreate}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-muted-foreground" style={{ fontSize: 13 }}>Nombre del paquete</label>
                <input
                  value={bundleName}
                  onChange={(e) => setBundleName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input-background"
                  style={{ fontSize: 14 }}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-muted-foreground" style={{ fontSize: 13 }}>Precio del paquete (MXN)</label>
                <input
                  type="number"
                  step="0.01"
                  value={bundlePrice}
                  onChange={(e) => setBundlePrice(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input-background"
                  style={{ fontSize: 14 }}
                  required
                />
              </div>
            </div>

            <label className="block mb-2 text-muted-foreground" style={{ fontSize: 13 }}>
              Selecciona 2+ productos ({selectedProducts.length} seleccionados)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 max-h-60 overflow-y-auto">
              {sellerProducts.map((p) => (
                <label
                  key={p.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedProducts.includes(p.id) ? "border-primary bg-primary/5" : "border-border hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(p.id)}
                    onChange={() => toggleProduct(p.id)}
                    className="accent-[#065F46]"
                  />
                  <img src={p.image} alt="" className="w-10 h-10 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate" style={{ fontSize: 14 }}>{p.name}</p>
                    <p className="text-muted-foreground" style={{ fontSize: 13 }}>${p.price.toFixed(2)}</p>
                  </div>
                </label>
              ))}
            </div>

            {selectedProducts.length >= 2 && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-muted-foreground" style={{ fontSize: 13 }}>Vista previa del paquete</p>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-primary" style={{ fontSize: 22, fontWeight: 700 }}>
                    ${bundlePrice || "0.00"}
                  </span>
                  <span className="text-muted-foreground line-through" style={{ fontSize: 14 }}>
                    ${originalTotal.toFixed(2)}
                  </span>
                  {parseFloat(bundlePrice) > 0 && (
                    <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded" style={{ fontSize: 12 }}>
                      Ahorro: ${(originalTotal - parseFloat(bundlePrice)).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-lg" style={{ fontSize: 14 }}>Crear Paquete</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 border border-border rounded-lg" style={{ fontSize: 14 }}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {/* Existing bundles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bundles.map((bundle) => (
          <div key={bundle.id} className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Package size={20} className="text-primary" />
                <h3 style={{ fontSize: 16, fontWeight: 600 }}>{bundle.name}</h3>
              </div>
              <button
                onClick={() => {
                  setBundles((prev) => prev.filter((b) => b.id !== bundle.id));
                  toast.success("Paquete eliminado");
                }}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="space-y-2 mb-4">
              {bundle.products.map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <img src={p.image} alt="" className="w-10 h-10 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate" style={{ fontSize: 14 }}>{p.name}</p>
                    <p className="text-muted-foreground" style={{ fontSize: 13 }}>${p.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-primary" style={{ fontSize: 20, fontWeight: 700 }}>
                ${bundle.bundlePrice.toFixed(2)}
              </span>
              <span className="text-muted-foreground line-through" style={{ fontSize: 14 }}>
                ${bundle.originalTotal.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {bundles.length === 0 && !showForm && (
        <div className="text-center py-16 bg-white rounded-xl border border-border">
          <Package size={48} className="mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground" style={{ fontSize: 16 }}>No tienes paquetes promocionales</p>
        </div>
      )}
    </div>
  );
}