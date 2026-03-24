import { useState } from "react";
import { products as initialProducts, Product } from "../../data/mock-data";
import { Search, Filter, CheckCircle, XCircle, AlertCircle, ExternalLink } from "lucide-react";

export function AdminCatalogPage() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todos");

  const handleStatusChange = (id: string, newStatus: Product["status"]) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.sellerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "todos" || p.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600 }}>Moderacion de Catalogo</h1>
          <p className="text-muted-foreground mt-1" style={{ fontSize: 14 }}>
            Revisa y aprueba productos o servicios subidos por los vendedores (RF-44, RF-46)
          </p>
        </div>
      </div>

      <div className="bg-white border border-border rounded-xl overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Buscar por nombre o vendedor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg outline-none focus:border-primary transition-colors"
              style={{ fontSize: 14 }}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter size={18} className="text-muted-foreground" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 md:flex-none bg-white border border-border rounded-lg px-3 py-2 outline-none focus:border-primary"
              style={{ fontSize: 14 }}
            >
              <option value="todos">Todos los estados</option>
              <option value="Aprobado">Aprobados</option>
              <option value="En revision">En revision</option>
              <option value="Rechazado">Rechazados</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-border">
                <th className="px-6 py-4" style={{ fontSize: 13, fontWeight: 600, color: "#6b7280" }}>PRODUCTO / SERVICIO</th>
                <th className="px-6 py-4" style={{ fontSize: 13, fontWeight: 600, color: "#6b7280" }}>VENDEDOR</th>
                <th className="px-6 py-4" style={{ fontSize: 13, fontWeight: 600, color: "#6b7280" }}>PRECIO</th>
                <th className="px-6 py-4" style={{ fontSize: 13, fontWeight: 600, color: "#6b7280" }}>ESTADO</th>
                <th className="px-6 py-4 text-right" style={{ fontSize: 13, fontWeight: 600, color: "#6b7280" }}>ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-border" />
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 500 }}>{p.name}</p>
                        <span className="text-xs text-muted-foreground capitalize">{p.type || "producto"}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4" style={{ fontSize: 14 }}>{p.sellerName}</td>
                  <td className="px-6 py-4" style={{ fontSize: 14, fontWeight: 500 }}>${p.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      p.status === "Aprobado" ? "bg-green-100 text-green-700" :
                      p.status === "Rechazado" ? "bg-red-100 text-red-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {p.status || "Pendiente"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleStatusChange(p.id, "Aprobado")}
                        title="Aprobar"
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button 
                        onClick={() => handleStatusChange(p.id, "En revision")}
                        title="Poner en Revision"
                        className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        <AlertCircle size={18} />
                      </button>
                      <button 
                         onClick={() => handleStatusChange(p.id, "Rechazado")}
                         title="Rechazar"
                         className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <XCircle size={18} />
                      </button>
                      <a href={`/producto/${p.id}`} target="_blank" className="p-1.5 text-gray-400 hover:text-primary rounded-lg">
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground" style={{ fontSize: 14 }}>No se encontraron productos para moderar.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
