import { Package, Boxes, Gift, ClipboardList, BarChart3, User, Calendar, Wrench } from "lucide-react";
import { DashboardLayout } from "../../components/layout/dashboard-layout";

export function SellerLayout() {
  const items = [
    { label: "Mis Productos", path: "/vendedor/productos", icon: <Package size={18} /> },
    { label: "Mis Servicios", path: "/vendedor/servicios", icon: <Wrench size={18} /> },
    { label: "Inventario", path: "/vendedor/inventario", icon: <Boxes size={18} /> },
    { label: "Paquetes", path: "/vendedor/paquetes", icon: <Gift size={18} /> },
    { label: "Pedidos", path: "/vendedor/pedidos", icon: <ClipboardList size={18} /> },
    { label: "Ventas", path: "/vendedor/ventas", icon: <BarChart3 size={18} /> },
    { label: "Mi Agenda", path: "/vendedor/agenda", icon: <Calendar size={18} /> },
    { label: "Mi Perfil", path: "/perfil", icon: <User size={18} /> },
  ];

  return <DashboardLayout title="Panel de Vendedor" items={items} />;
}
