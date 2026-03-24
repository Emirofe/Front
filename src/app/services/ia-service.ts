// Servicio para interactuar con el motor de IA del backend
// En producción, esto haría llamadas HTTP reales a los endpoints

interface ContextAnalysis {
  eventType: string;
  numberOfPeople: number | null;
  theme: string;
  relevantCategories: string[];
  budget: { min: number; max: number } | null;
}

interface RecommendationRequest {
  prompt: string;
  userId?: string;
  sessionContext?: {
    timestamp: string;
    location?: string;
    device?: string;
  };
}

interface RecommendationResponse {
  status: "success" | "error";
  data: {
    analysis: ContextAnalysis;
    recommendations: Array<{
      product_id: string;
      name: string;
      score: number;
      source: "COLLABORATIVE" | "CONTENT" | "RULES" | "CHATBOT";
      explanation: string;
    }>;
    latency_ms: number;
  };
  message?: string;
}

/**
 * Servicio para análisis contextual en el backend (FastAPI con Python)
 * 
 * Ejemplo de endpoint real:
 * POST /ia/recomendar
 * 
 * Request:
 * {
 *   "prompt": "Quiero organizar una fiesta infantil para 15 niños...",
 *   "user_id": "123",
 *   "session_context": {
 *     "timestamp": "2026-03-16T14:30:00Z",
 *     "location": "CDMX",
 *     "device": "desktop"
 *   }
 * }
 * 
 * Response:
 * {
 *   "status": "success",
 *   "data": {
 *     "analysis": {
 *       "eventType": "party_infantil",
 *       "numberOfPeople": 15,
 *       "theme": "superhéroes",
 *       "relevantCategories": ["decor", "sweets", "tableware"],
 *       "budget": { "min": 500, "max": 1000 }
 *     },
 *     "recommendations": [...],
 *     "latency_ms": 145
 *   }
 * }
 */

class IAService {
  private apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

  /**
   * Envía un prompt al backend para análisis contextual y obtener recomendaciones
   */
  async getContextualRecommendations(
    request: RecommendationRequest
  ): Promise<RecommendationResponse> {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/ia/recomendar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: request.prompt,
            user_id: request.userId || "anonymous",
            session_context: request.sessionContext || {
              timestamp: new Date().toISOString(),
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Backend error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error calling IA backend:", error);
      throw error;
    }
  }

  /**
   * Obtiene preferencias del usuario basadas en historial
   */
  async getUserPreferences(userId: string) {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/ia/preferencias/${userId}`
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching user preferences:", error);
      throw error;
    }
  }

  /**
   * Predice intereses del usuario según comportamiento
   */
  async predictUserInterests(userId: string) {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/ia/predict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error predicting user interests:", error);
      throw error;
    }
  }
}

export const iaService = new IAService();
