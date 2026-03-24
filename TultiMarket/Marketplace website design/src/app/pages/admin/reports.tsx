import { useState } from "react";
import { Flag, AlertTriangle, CheckCircle, Clock, Filter, ChevronDown, ChevronUp, ShieldOff, Trash2, X } from "lucide-react";
import { mockReports, Report } from "../../data/mock-data";
import { toast } from "sonner";

export function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  const filtered = statusFilter === "all"
    ? reports
    : reports.filter((r) => r.status === statusFilter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resuelto": return <CheckCircle size={16} className="text-green-600" />;
      case "Revisado": return <AlertTriangle size={16} className="text-amber-600" />;
      default: return <Clock size={16} className="text-red-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resuelto": return "bg-green-100 text-green-700";
      case "Revisado": return "bg-amber-100 text-amber-700";
      default: return "bg-red-100 text-red-700";
    }
  };

  const updateReportStatus = (id: string, status: Report["status"]) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    toast.success(`Reporte actualizado a: ${status}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600 }}>Reportes y Denuncias</h1>
          <p className="text-muted-foreground" style={{ fontSize: 14 }}>
            {reports.filter((r) => r.status === "Pendiente").length} pendientes de revision
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <Filter size={18} className="text-muted-foreground" />
        {["all", "Pendiente", "Revisado", "Resuelto"].map((status) => (
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

      {/* Reports list */}
      <div className="space-y-4">
        {filtered.map((report) => (
          <div key={report.id} className="bg-white rounded-xl border border-border overflow-hidden">
            <div
              className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50"
              onClick={() => setExpandedReport(expandedReport === report.id ? null : report.id)}
            >
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  {getStatusIcon(report.status)}
                  <span style={{ fontSize: 15, fontWeight: 600 }}>#{report.id.toUpperCase()}</span>
                </div>
                <div>
                  <p className="text-muted-foreground" style={{ fontSize: 13 }}>Reporta: {report.reporterName}</p>
                  <p style={{ fontSize: 14 }}>Contra: {report.reportedName}</p>
                </div>
                <span className={`px-2 py-1 rounded ${
                  report.category === "Producto" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                }`} style={{ fontSize: 12 }}>
                  {report.category}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground" style={{ fontSize: 13 }}>{report.date}</span>
                <span className={`px-3 py-1 rounded-full ${getStatusColor(report.status)}`} style={{ fontSize: 13, fontWeight: 500 }}>
                  {report.status}
                </span>
                {expandedReport === report.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>

            {expandedReport === report.id && (
              <div className="border-t border-border p-5 bg-gray-50/50">
                <div className="mb-4">
                  <p className="text-muted-foreground mb-1" style={{ fontSize: 13 }}>Razon del reporte</p>
                  <p style={{ fontSize: 14, fontWeight: 500 }}>{report.reason}</p>
                </div>
                <div className="mb-6">
                  <p className="text-muted-foreground mb-1" style={{ fontSize: 13 }}>Descripcion detallada</p>
                  <p className="text-muted-foreground" style={{ fontSize: 14 }}>{report.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateReportStatus(report.id, "Resuelto")}
                    className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    style={{ fontSize: 14 }}
                  >
                    <CheckCircle size={16} /> Resolver
                  </button>
                  <button
                    onClick={() => updateReportStatus(report.id, "Revisado")}
                    className="flex items-center gap-1 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                    style={{ fontSize: 14 }}
                  >
                    <AlertTriangle size={16} /> Advertir Usuario
                  </button>
                  <button
                    onClick={() => {
                      toast.success("Usuario bloqueado");
                      updateReportStatus(report.id, "Resuelto");
                    }}
                    className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    style={{ fontSize: 14 }}
                  >
                    <ShieldOff size={16} /> Bloquear Usuario
                  </button>
                  <button
                    onClick={() => {
                      updateReportStatus(report.id, "Resuelto");
                      toast("Reporte desestimado");
                    }}
                    className="flex items-center gap-1 px-4 py-2 border border-border rounded-lg hover:bg-white"
                    style={{ fontSize: 14 }}
                  >
                    <X size={16} /> Desestimar
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-border">
          <Flag size={48} className="mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground" style={{ fontSize: 16 }}>No hay reportes con este filtro</p>
        </div>
      )}
    </div>
  );
}