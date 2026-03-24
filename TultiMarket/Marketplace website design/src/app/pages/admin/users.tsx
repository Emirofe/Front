import { useState } from "react";
import { Search, Shield, ShieldOff, Trash2, Users, Eye, Filter } from "lucide-react";
import { mockUsers, User } from "../../data/mock-data";
import { toast } from "sonner";

export function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers.filter((u) => u.role !== "admin"));
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  const filtered = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const toggleBlock = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "Activo" ? "Bloqueado" : "Activo" }
          : u
      )
    );
    toast.success("Estado del usuario actualizado");
  };

  const deleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    setShowDeleteModal(null);
    toast.success("Usuario eliminado");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600 }}>Gestion de Usuarios</h1>
          <p className="text-muted-foreground" style={{ fontSize: 14 }}>
            {users.length} usuarios registrados
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar usuarios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-white focus:border-primary outline-none"
            style={{ fontSize: 14 }}
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-3 rounded-lg border border-border bg-white"
          style={{ fontSize: 14 }}
        >
          <option value="all">Todos los roles</option>
          <option value="comprador">Compradores</option>
          <option value="vendedor">Vendedores</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 rounded-lg border border-border bg-white"
          style={{ fontSize: 14 }}
        >
          <option value="all">Todos los estados</option>
          <option value="Activo">Activos</option>
          <option value="Bloqueado">Bloqueados</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 text-muted-foreground" style={{ fontSize: 13, fontWeight: 500 }}>Usuario</th>
                <th className="text-left px-4 py-3 text-muted-foreground" style={{ fontSize: 13, fontWeight: 500 }}>Rol</th>
                <th className="text-left px-4 py-3 text-muted-foreground" style={{ fontSize: 13, fontWeight: 500 }}>Registro</th>
                <th className="text-left px-4 py-3 text-muted-foreground" style={{ fontSize: 13, fontWeight: 500 }}>Estado</th>
                <th className="text-right px-4 py-3 text-muted-foreground" style={{ fontSize: 13, fontWeight: 500 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-0 hover:bg-gray-50/50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary" style={{ fontSize: 14, fontWeight: 600 }}>
                        {user.name[0]}
                      </div>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 500 }}>{user.name}</p>
                        <p className="text-muted-foreground" style={{ fontSize: 13 }}>{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded capitalize ${
                      user.role === "vendedor" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                    }`} style={{ fontSize: 13 }}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground" style={{ fontSize: 14 }}>
                    {user.registrationDate}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded ${
                      user.status === "Activo" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`} style={{ fontSize: 13 }}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => toggleBlock(user.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          user.status === "Activo"
                            ? "text-amber-600 hover:bg-amber-50"
                            : "text-green-600 hover:bg-green-50"
                        }`}
                        title={user.status === "Activo" ? "Bloquear" : "Desbloquear"}
                      >
                        {user.status === "Activo" ? <ShieldOff size={16} /> : <Shield size={16} />}
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(user.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="mb-2" style={{ fontSize: 18, fontWeight: 600 }}>Confirmar Eliminacion</h3>
            <p className="text-muted-foreground mb-6" style={{ fontSize: 14 }}>
              Esta accion no se puede deshacer. El usuario y todos sus datos seran eliminados permanentemente.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2.5 border border-border rounded-lg hover:bg-gray-50"
                style={{ fontSize: 14 }}
              >
                Cancelar
              </button>
              <button
                onClick={() => deleteUser(showDeleteModal)}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600"
                style={{ fontSize: 14 }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
