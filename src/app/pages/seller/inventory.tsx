import { useState } from "react";
import { AlertTriangle, Check, XCircle } from "lucide-react";
import { products } from "../../data/mock-data";
import { toast } from "sonner";

export function SellerInventoryPage() {
  const [inventory, setInventory] = useState(
    products.filter((p) => p.sellerId === "s1").map((p) => ({
      id: p.id,
      name: p.name,
      image: p.image,
      stock: p.stock,
      editing: false,
    }))
  );

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Agotado", color: "text-red-600 bg-red-50", icon: XCircle };
    if (stock < 10) return { label: "Stock Bajo", color: "text-amber-600 bg-amber-50", icon: AlertTriangle };
    return { label: "En Stock", color: "text-green-600 bg-green-50", icon: Check };
  };

  const updateStock = (id: string, newStock: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, newStock) } : item
      )
    );
  };

  return (
    <div>
      <h1 className="mb-6" style={{ fontSize: 24, fontWeight: 600 }}>Control de Inventario</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-border p-5">
          <p className="text-muted-foreground" style={{ fontSize: 13 }}>Total Productos</p>
          <p className="text-primary" style={{ fontSize: 28, fontWeight: 700 }}>{inventory.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <p className="text-muted-foreground" style={{ fontSize: 13 }}>Stock Bajo</p>
          <p className="text-amber-600" style={{ fontSize: 28, fontWeight: 700 }}>
            {inventory.filter((i) => i.stock > 0 && i.stock < 10).length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <p className="text-muted-foreground" style={{ fontSize: 13 }}>Agotados</p>
          <p className="text-red-600" style={{ fontSize: 28, fontWeight: 700 }}>
            {inventory.filter((i) => i.stock === 0).length}
          </p>
        </div>
      </div>

      {/* Inventory table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 text-muted-foreground" style={{ fontSize: 13, fontWeight: 500 }}>Producto</th>
              <th className="text-left px-4 py-3 text-muted-foreground" style={{ fontSize: 13, fontWeight: 500 }}>Stock Actual</th>
              <th className="text-left px-4 py-3 text-muted-foreground" style={{ fontSize: 13, fontWeight: 500 }}>Estado</th>
              <th className="text-right px-4 py-3 text-muted-foreground" style={{ fontSize: 13, fontWeight: 500 }}>Ajustar</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => {
              const status = getStockStatus(item.stock);
              const StatusIcon = status.icon;
              return (
                <tr key={item.id} className={`border-b border-border last:border-0 ${item.stock < 10 ? "bg-red-50/30" : ""}`}>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <span className="truncate max-w-[200px]" style={{ fontSize: 14 }}>{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <input
                      type="number"
                      value={item.stock}
                      onChange={(e) => updateStock(item.id, parseInt(e.target.value) || 0)}
                      className="w-20 px-3 py-2 border border-border rounded-lg text-center bg-white"
                      style={{ fontSize: 14 }}
                      min={0}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${status.color}`} style={{ fontSize: 13 }}>
                      <StatusIcon size={14} /> {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => { updateStock(item.id, item.stock - 1); toast("Stock actualizado"); }}
                        className="px-3 py-1 border border-border rounded-lg hover:bg-gray-50" style={{ fontSize: 14 }}
                      >
                        -1
                      </button>
                      <button
                        onClick={() => { updateStock(item.id, item.stock + 10); toast("Stock actualizado"); }}
                        className="px-3 py-1 border border-border rounded-lg hover:bg-gray-50" style={{ fontSize: 14 }}
                      >
                        +10
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
