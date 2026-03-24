import { useState } from "react";
import { ChevronDown, ChevronUp, Calendar, Filter } from "lucide-react";
import { mockOrders, Order } from "../../data/mock-data";
import { toast } from "sonner";
import { orderService } from "../../services/order-service";

export function SellerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = statusFilter === "all"
    ? orders
    : orders.filter((o) => o.status === statusFilter);

  const updateStatus = async (orderId: string, newStatus: Order["status"]) => {
    try {
      const response = await orderService.updateOrderStatus({
        orderId,
        newStatus,
      });

      if (response.status === "success") {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        toast.success(`Pedido actualizado a: ${newStatus}`);
      } else {
        toast.error(response.message || "Error al actualizar el estado del pedido");
      }
    } catch (error) {
      toast.error("Error de conexión al actualizar el estado del pedido");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregado": return "bg-green-100 text-green-700";
      case "Enviado": return "bg-blue-100 text-blue-700";
      default: return "bg-amber-100 text-amber-700";
    }
  };

  return (
    <div>
      <h1 className="mb-6" style={{ fontSize: 24, fontWeight: 600 }}>Pedidos Recibidos</h1>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <Filter size={18} className="text-muted-foreground" />
        {["all", "En preparacion", "Enviado", "Entregado"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              statusFilter === status
                ? "bg-primary text-white"
                : "bg-white border border-border text-muted-foreground hover:bg-gray-50"
            }`}
            style={{ fontSize: 14 }}
          >
            {status === "all" ? "Todos" : status}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((order) => (
          <div key={order.id} className="bg-white rounded-xl border border-border overflow-hidden">
            <div
              className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50"
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
            >
              <div className="flex items-center gap-6 flex-wrap">
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600 }}>{order.folio}</p>
                  <p className="text-muted-foreground flex items-center gap-1" style={{ fontSize: 13 }}>
                    <Calendar size={12} /> {order.date}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground" style={{ fontSize: 13 }}>Comprador</p>
                  <p style={{ fontSize: 14 }}>{order.buyerName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground" style={{ fontSize: 13 }}>Total</p>
                  <p style={{ fontSize: 16, fontWeight: 600 }}>${order.total.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full ${getStatusColor(order.status)}`} style={{ fontSize: 13, fontWeight: 500 }}>
                  {order.status}
                </span>
                {expandedOrder === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>

            {expandedOrder === order.id && (
              <div className="border-t border-border p-5 bg-gray-50/50">
                <div className="space-y-3 mb-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <img src={item.product.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p style={{ fontSize: 14 }}>{item.product.name}</p>
                        <p className="text-muted-foreground" style={{ fontSize: 13 }}>Cant: {item.quantity} x ${item.product.price.toFixed(2)}</p>
                      </div>
                      <p style={{ fontSize: 14, fontWeight: 600 }}>${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4" style={{ fontSize: 14 }}>
                  Direccion: {order.address}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground" style={{ fontSize: 14 }}>Actualizar estado:</span>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value as Order["status"])}
                    className="px-3 py-2 border border-border rounded-lg bg-white"
                    style={{ fontSize: 14 }}
                  >
                    <option value="En preparacion">En preparacion</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Entregado">Entregado</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-border">
          <p className="text-muted-foreground" style={{ fontSize: 16 }}>No hay pedidos con este filtro</p>
        </div>
      )}
    </div>
  );
}
