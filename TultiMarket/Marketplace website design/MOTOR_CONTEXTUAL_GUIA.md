# Guía de Uso: Motor de Búsqueda Contextual con IA

## ¿Qué es?

El **Motor de Búsqueda Contextual** es un sistema inteligente que analiza descripciones en lenguaje natural de eventos y retorna productos recomendados específicamente para ese evento.

## ¿Cómo funciona?

### 1. **Usuario escribe un prompt descriptivo**
El usuario describe su evento en la barra de búsqueda:
```
"Quiero organizar una fiesta infantil para 15 niños con tema de superhéroes 
con presupuesto de $500-$1000"
```

### 2. **Sistema analiza el contexto**
El motor extrae:
- **Tipo de evento:** Fiesta infantil
- **Número de personas:** 15 niños
- **Tema:** Superhéroes
- **Presupuesto:** $500 - $1000
- **Categorías sugeridas:** Decoración, dulces, platos, piñatas

### 3. **Motor IA genera recomendaciones**
Utiliza tres componentes:
- **Filtrado Colaborativo:** "Usuarios similares compraron..."
- **Basado en Contenido:** Similitud de productos
- **Reglas de Negocio:** Promociones, stock, calidad

### 4. **Frontend muestra resultados**
Grid de productos filtrados con opción de aplicar filtros adicionales

## Ubicaciones en el Código

### Componentes Frontend
```
src/app/components/
├── contextual-search.tsx         # Componente de búsqueda contextual
└── layout/
    └── navbar.tsx                # Navbar con botón de búsqueda IA

src/app/pages/
└── search.tsx                    # Página de resultados contextuales

src/app/services/
└── ia-service.ts                 # Servicio que conecta con el backend

src/app/routes.ts                 # Rutas actualizadas (nuevo /buscar)
```

## Cómo Usar

### 1. **Desde el Navbar**
- Haz clic en el ícono de **cerebro (🧠)** en la navbar
- O ve a `/buscar`

### 2. **Escribe tu prompt**
Ejemplo de prompts que funcionan bien:
```
"Cumpleaños de 10 años tema dinosaurios"
"Boda íntima para 50 personas"
"Baby shower con tema de animalitos"
"Fiesta de graduación, presupuesto $2000-$3000"
"Halloween para 20 personas al aire libre"
```

### 3. **El sistema detecta automáticamente**
Se muestra análisis con:
- Tipo de evento
- Cantidad de personas
- Tema
- Presupuesto (si lo mencionas)

### 4. **Aplica filtros adicionales**
Después de obtener resultados:
- Filtrar por rango de precio
- Filtrar por calificación mínima
- Ordenar por precio, popularidad o rating

## Extracción de Contexto

### Palabras clave detectadas:
```javascript
// Tipos de eventos
fiesta, party, boda, wedding, cumpleaños, birthday, 
navidad, christmas, infantil, corporativo, graduación

// Cantidad de personas
"para 15 niños" → 15 personas
"50 invitados" → 50 personas
"20 personas" → 20 personas

// Tema
"tema de superhéroes" → superhéroes
"estilo vintage" → vintage
"de princesas" → princesas

// Presupuesto
"presupuesto $500-$1000" → min: 500, max: 1000
"máximo $2000" → max: 2000
```

### Mapeo a Categorías:
| Evento | Categorías Sugeridas |
|---|---|
| fiesta_infantil | decoración, globos, dulces, piñatas, juguetes |
| boda | decoración, flores, velas, manteles |
| cumpleaños | decoración, globos, pastel, dulces |
| navidad | decoración, luces, adornos, velas |
| baby_shower | decoración, pañales, globos |

## Integración con Backend (Implementación Futura)

Cuando tengas un backend real con Python/FastAPI:

### 1. Reemplaza `iaService.ts` con llamadas HTTP reales:
```typescript
// En iaService.ts
const response = await fetch(
  `${this.apiBaseUrl}/ia/recomendar`,  // Tu endpoint real
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request)
  }
);
```

### 2. Backend analiza el prompt con NLP (Natural Language Processing):
```python
# Backend (Python/FastAPI)
@app.post("/ia/recomendar")
async def contextualRecommendations(request: RecommendationRequest):
    # Analizar prompt con spaCy, NLTK o transformers
    analysis = analyzePrompt(request.prompt)
    
    # Generar recomendaciones
    recommendations = generateRecommendations(analysis)
    
    return {
        "status": "success",
        "data": {
            "analysis": analysis,
            "recommendations": recommendations
        }
    }
```

### 3. Variables de entrada del backend:
```json
{
  "prompt": "Tu descripción del evento",
  "user_id": "123",
  "session_context": {
    "timestamp": "2026-03-16T14:30:00Z",
    "location": "CDMX",
    "device": "desktop"
  }
}
```

## Algoritmo de Scoring

Durante la recomendación, cada producto recibe una puntuación basada en:

```
score_final = 
  0.3 × score_colaborativo +
  0.3 × score_contenido +
  0.3 × bonus_reglas +
  0.2 × boost_popularidad -
  penalizacion_calidad
```

### Factores:
- ✅ **Colaborativo:** Usuarios similares compraron esto (0-0.6)
- ✅ **Contenido:** Similitud con historial del usuario (0-0.6)
- ✅ **Reglas:** Productos en promoción, categoría relevante (+0.3)
- ✅ **Popularidad:** Compras en últimas 72h (0-0.2)
- ❌ **Penalizaciones:** Stock vacío (-1.0), baja calidad (-0.5)

## Features Actuales vs. Futuros

### ✅ Implementado (Frontend):
- Buscador con textarea contextual
- Análisis local de extracción de contexto
- Filtros adicionales (precio, rating)
- Ordenamiento de resultados
- UI responsiva con análisis visual

### 🔄 Próximos (Backend):
- NLP real con spaCy/transformers
- Machine Learning colaborativo
- Base de datos de históricos
- Caché de análisis
- A/B testing de algoritmos

## Troubleshooting

### ❌ El análisis no detecta mi evento
**Solución:** Usa palabras clave más claras:
- ❌ "Quiero una reunión" → Muy genérico
- ✅ "Quiero una fiesta infantil para 20 niños" → Claro

### ❌ No aparecen productos recomendados
**Solución:** El theme o budget puede ser muy restrictivo:
- Intenta sin especificar presupuesto
- O aumenta el rango de presupuesto

### ❌ Los resultados no son relevantes
**Solución:** En esta versión es un análisis simulado en frontend:
- Cuando tengas backend real, la precisión mejorará
- El backend tendrá acceso a históricos de usuarios

## Arquitectura Técnica

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React/TypeScript)              │
├──────────────────────┬──────────────────────┬───────────────┤
│  contextual-search   │   search.tsx page    │   navbar.tsx  │
│  (Componente)        │   (Página resultado) │   (Acceso)    │
└──────────┬───────────┴──────────┬───────────┴───────────────┘
           │                      │
           ├──→ Análisis en Frontend (Simulado)
           │    - Extracción de contexto
           │    - Mapeo a categorías
           │    - Filtrado de productos
           │
           ├──→ Llamada a Backend (Cuando esté disponible)
           │    POST /ia/recomendar
           │    ├─ NLP real con spaCy/transformers
           │    ├─ Motor de IA (colaborativo + contenido)
           │    └─ Scoring y ranking
           │
           └──→ Muestra resultados enriquecidos

┌─────────────────────────────────────────────────────────────┐
│              BACKEND (Python/FastAPI) - Futuro              │
├──────────────────────┬──────────────────────┬───────────────┤
│   Módulo NLP         │  Recomendador IA     │   Base Datos  │
│   (spaCy)            │  (scikit-learn)      │   (PostgreSQL)│
└──────────────────────┴──────────────────────┴───────────────┘
```

## Estructura de Datos

### Entrada del Análisis:
```typescript
{
  prompt: string;           // Descripción del usuario
  userId?: string;          // Identificador del usuario
  sessionContext?: {
    timestamp: string;      // Fecha/hora de la sesión
    location?: string;      // Ubicación geográfica
    device?: string;        // Tipo de dispositivo
  };
}
```

### Salida del Análisis:
```typescript
{
  eventType: string;               // Tipo de evento (fiesta, boda, etc.)
  numberOfPeople: number | null;  // Cantidad de personas
  theme: string;                   // Tema/temática del evento
  relevantCategories: string[];    // Categorías de productos sugeridas
  budget?: {
    min: number;
    max: number;
  };
}
```

### Recomendación:
```typescript
{
  product_id: string;
  name: string;
  price: number;
  score_final: number;           // 0-1, relevancia
  source: "COLLABORATIVE" | "CONTENT" | "RULES" | "CHATBOT";
  explanation: string;           // "Encontré esto según tu búsqueda..."
}
```

## Próximos Pasos

1. ✅ **Frontend completado** - Motor contextual funcionando
2. 🔄 **Backend** - Implementar con Python/FastAPI
3. 🔄 **NLP real** - Integrar spaCy o transformers de HuggingFace
4. 🔄 **Base de datos** - Guardar históricos y entrenar modelo
5. 🔄 **Chatbot** - Agregar asistente conversacional
6. 🔄 **Analytics** - Medir precisión y mejorar iterativamente

## Documentación Relacionada

- `ARCHITECTURE_BACKEND.md` - Detalles técnicos del backend
- `documento.txt` - Especificaciones del proyecto completo
- `mock-data.ts` - Datos simulados de productos

---

**Desarrollador:** Tu nombre  
**Fecha:** 16 de Marzo, 2026  
**Estado:** En desarrollo
