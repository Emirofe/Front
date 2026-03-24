import { useState } from "react";
import { Link } from "react-router";
import { Package, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { useStore } from "../context/store-context";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";

export function OrderHistoryPage() {
  const { orders, currentUser } = useStore();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const userOrders = currentUser
    ? orders.filter((o) => o.buyerId === currentUser.id || currentUser.role !== "comprador")
    : orders;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregado": return "bg-green-100 text-green-700";
      case "Enviado": return "bg-blue-100 text-blue-700";
      default: return "bg-amber-100 text-amber-700";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full">
        <h1 className="mb-6" style={{ fontSize: 28, fontWeight: 600 }}>Historial de Pedidos</h1>

        {userOrders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-border">
            <Package size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="mb-2" style={{ fontSize: 20, fontWeight: 600 }}>No tienes pedidos aun</h2>
            <Link to="/" className="text-primary hover:underline" style={{ fontSize: 14 }}>Ir a comprar</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  className="w-full p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item, i) => (
                          <img
                            key={i}
                            src={item.product.image}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover border-2 border-white"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-left">
                      <p style={{ fontSize: 15, fontWeight: 600 }}>{order.folio}</p>
                      <p className="text-muted-foreground flex items-center gap-1" style={{ fontSize: 13 }}>
                        <Calendar size={12} /> {order.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full ${getStatusColor(order.status)}`} style={{ fontSize: 13, fontWeight: 500 }}>
                      {order.status}
                    </span>
                    <span style={{ fontSize: 16, fontWeight: 600 }}>${order.total.toFixed(2)}</span>
                    {expandedOrder === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {expandedOrder === order.id && (
                  <div className="border-t border-border p-5 bg-gray-50/50">
                    <div className="space-y-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-14 h-14 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <Link to={`/producto/${item.product.id}`} className="hover:text-primary transition-colors" style={{ fontSize: 14, fontWeight: 500 }}>
                              {item.product.name}
                            </Link>
                            <p className="text-muted-foreground" style={{ fontSize: 13 }}>Cantidad: {item.quantity}</p>
                          </div>
                          <p style={{ fontSize: 14, fontWeight: 600 }}>${(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border" style={{ fontSize: 14 }}>
                      <p className="text-muted-foreground">Direccion: {order.address}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
