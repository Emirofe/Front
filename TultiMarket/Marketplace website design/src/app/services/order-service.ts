// Servicio para gestionar pedidos en el backend
// En producción, esto haría llamadas HTTP reales a los endpoints

interface UpdateOrderStatusRequest {
  orderId: string;
  newStatus: "En preparacion" | "Enviado" | "Entregado";
}

interface UpdateOrderStatusResponse {
  status: "success" | "error";
  message?: string;
}

/**
 * Servicio para gestión de pedidos
 *
 * Ejemplo de endpoint real:
 * PUT /orders/{orderId}/status
 *
 * Request:
 * {
 *   "status": "Enviado"
 * }
 *
 * Response:
 * {
 *   "status": "success",
 *   "message": "Estado del pedido actualizado"
 * }
 */

class OrderService {
  private apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

  /**
   * Actualiza el estado de un pedido en el backend
   */
  async updateOrderStatus(
    request: UpdateOrderStatusRequest
  ): Promise<UpdateOrderStatusResponse> {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/orders/${request.orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: request.newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Backend error: ${response.statusText}`);
      }

      const data: UpdateOrderStatusResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating order status:", error);
      return {
        status: "error",
        message: "Error al actualizar el estado del pedido",
      };
    }
  }
}

export const orderService = new OrderService();