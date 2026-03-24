// Servicio para gestionar datos de ventas en el backend
// En producción, esto haría llamadas HTTP reales a los endpoints

interface SalesData {
  mes: string;
  ordenes: number;
  ingresos: number;
}

interface SalesStats {
  totalOrders: number;
  totalRevenue: number;
  avgRating: number;
  activeProducts: number;
  topProducts: Array<{
    id: string;
    name: string;
    rating: number;
    reviewCount: number;
  }>;
  salesData: SalesData[];
}

interface SalesStatsResponse {
  status: "success" | "error";
  data?: SalesStats;
  message?: string;
}

/**
 * Servicio para obtener estadísticas de ventas
 *
 * Ejemplo de endpoint real:
 * GET /sales/stats/{sellerId}
 *
 * Response:
 * {
 *   "status": "success",
 *   "data": {
 *     "totalOrders": 120,
 *     "totalRevenue": 45000.50,
 *     "avgRating": 4.5,
 *     "activeProducts": 25,
 *     "topProducts": [...],
 *     "salesData": [...]
 *   }
 * }
 */

class SalesService {
  private apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

  /**
   * Obtiene las estadísticas de ventas de un vendedor
   */
  async getSalesStats(sellerId: string): Promise<SalesStatsResponse> {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/sales/stats/${sellerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Backend error: ${response.statusText}`);
      }

      const data: SalesStatsResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching sales stats:", error);
      return {
        status: "error",
        message: "Error al obtener estadísticas de ventas",
      };
    }
  }
}

export const salesService = new SalesService();