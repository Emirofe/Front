import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { DollarSign, ShoppingBag, Star, TrendingUp } from "lucide-react";
import { useStore } from "../../context/store-context";
import { salesService } from "../../services/sales-service";
import { toast } from "sonner";

interface SalesData {
  mes: string;
  ordenes: number;
  ingresos: number;
}

interface TopProduct {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
}

interface SalesStats {
  totalOrders: number;
  totalRevenue: number;
  avgRating: number;
  activeProducts: number;
  topProducts: TopProduct[];
  salesData: SalesData[];
}

export function SellerSalesPage() {
  const { currentUser } = useStore();
  const [salesStats, setSalesStats] = useState<SalesStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSalesData = async () => {
      if (!currentUser) return;

      try {
        const response = await salesService.getSalesStats(currentUser.id);
        if (response.status === "success" && response.data) {
          setSalesStats(response.data);
        } else {
          toast.error(response.message || "Error al cargar datos de ventas");
          // Fallback to mock data if API fails
          setSalesStats({
            totalOrders: 120,
            totalRevenue: 45000.50,
            avgRating: 4.5,
            activeProducts: 25,
            topProducts: [
              { id: "1", name: "Producto A", rating: 4.8, reviewCount: 45 },
              { id: "2", name: "Producto B", rating: 4.6, reviewCount: 32 },
              { id: "3", name: "Producto C", rating: 4.4, reviewCount: 28 },
            ],
            salesData: [
              { mes: "Oct", ordenes: 12, ingresos: 8500 },
              { mes: "Nov", ordenes: 18, ingresos: 12400 },
              { mes: "Dic", ordenes: 35, ingresos: 28900 },
              { mes: "Ene", ordenes: 22, ingresos: 16800 },
              { mes: "Feb", ordenes: 28, ingresos: 21500 },
              { mes: "Mar", ordenes: 15, ingresos: 11200 },
            ],
          });
        }
      } catch (error) {
        toast.error("Error de conexión al cargar datos de ventas");
        // Fallback to mock data
        setSalesStats({
          totalOrders: 120,
          totalRevenue: 45000.50,
          avgRating: 4.5,
          activeProducts: 25,
          topProducts: [
            { id: "1", name: "Producto A", rating: 4.8, reviewCount: 45 },
            { id: "2", name: "Producto B", rating: 4.6, reviewCount: 32 },
            { id: "3", name: "Producto C", rating: 4.4, reviewCount: 28 },
          ],
          salesData: [
            { mes: "Oct", ordenes: 12, ingresos: 8500 },
            { mes: "Nov", ordenes: 18, ingresos: 12400 },
            { mes: "Dic", ordenes: 35, ingresos: 28900 },
            { mes: "Ene", ordenes: 22, ingresos: 16800 },
            { mes: "Feb", ordenes: 28, ingresos: 21500 },
            { mes: "Mar", ordenes: 15, ingresos: 11200 },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    loadSalesData();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando datos de ventas...</p>
        </div>
      </div>
    );
  }

  if (!salesStats) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-border">
        <p className="text-muted-foreground">No se pudieron cargar los datos de ventas</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6" style={{ fontSize: 24, fontWeight: 600 }}>Resumen de Ventas</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <ShoppingBag size={20} className="text-primary" />
            </div>
            <span className="text-muted-foreground" style={{ fontSize: 13 }}>Total Ordenes</span>
          </div>
          <p style={{ fontSize: 28, fontWeight: 700 }}>{salesStats.totalOrders}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-green-600" />
            </div>
            <span className="text-muted-foreground" style={{ fontSize: 13 }}>Ingresos Totales</span>
          </div>
          <p style={{ fontSize: 28, fontWeight: 700 }}>${salesStats.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <Star size={20} className="text-amber-500" />
            </div>
            <span className="text-muted-foreground" style={{ fontSize: 13 }}>Calificacion Promedio</span>
          </div>
          <p style={{ fontSize: 28, fontWeight: 700 }}>{salesStats.avgRating.toFixed(1)}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            <span className="text-muted-foreground" style={{ fontSize: 13 }}>Productos Activos</span>
          </div>
          <p style={{ fontSize: 28, fontWeight: 700 }}>{salesStats.activeProducts}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="mb-4" style={{ fontSize: 16, fontWeight: 600 }}>Ordenes por Mes</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesStats.salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="mes" tick={{ fontSize: 13 }} />
              <YAxis tick={{ fontSize: 13 }} />
              <Tooltip />
              <Bar dataKey="ordenes" fill="#065F46" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="mb-4" style={{ fontSize: 16, fontWeight: 600 }}>Ingresos por Mes (MXN)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesStats.salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="mes" tick={{ fontSize: 13 }} />
              <YAxis tick={{ fontSize: 13 }} />
              <Tooltip />
              <Line type="monotone" dataKey="ingresos" stroke="#065F46" strokeWidth={2} dot={{ fill: "#065F46" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="mb-4" style={{ fontSize: 16, fontWeight: 600 }}>Productos Mejor Calificados</h3>
        <div className="space-y-3">
          {salesStats.topProducts.map((p, idx) => (
            <div key={p.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary" style={{ fontSize: 14, fontWeight: 600 }}>
                #{idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="truncate" style={{ fontSize: 14 }}>{p.name}</p>
                <div className="flex items-center gap-2">
                  <Star size={12} className="text-amber-500 fill-current" />
                  <span style={{ fontSize: 12 }}>{p.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground" style={{ fontSize: 12 }}>({p.reviewCount} reseñas)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}