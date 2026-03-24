# Arquitectura del Motor Contextual - Backend

## Descripción General

El motor contextual es un sistema de análisis de lenguaje natural que procesa prompts descriptivos de eventos y retorna recomendaciones personalizadas de productos.

## Flujo de Datos

```
[FRONTEND]  
    ↓
Usuario escribe prompt: "Fiesta infantil para 15 niños tema superhéroes"
    ↓
Envía POST /ia/recomendar {prompt, user_id, session_context}
    ↓
[BACKEND - Python/FastAPI]
    ├─→ Módulo de NLP: Analiza el texto
    │   ├─ Extrae tipo de evento (fiesta, boda, etc.)
    │   ├─ Detecta cantidad de personas
    │   ├─ Identifica tema/temática
    │   └─ Calcula presupuesto (si menciona)
    │
    ├─→ Módulo de Mapeo: Convierte análisis a categorías
    │   └─ Mapea entidades a categorías de productos conocidas
    │
    ├─→ Motor de IA (Recomendador):
    │   ├─ Filtrado Colaborativo
    │   ├─ Basado en Contenido (embeddings)
    │   ├─ Reglas de Negocio
    │   └─ Scoring/Ranking
    │
    └─→ Retorna JSON con recomendaciones
        {
          "analysis": {...},
          "recommendations": [...],
          "latency_ms": 145
        }
    ↓
[FRONTEND]
    ↓
Muestra productos en grid, con filtros aplicados
```

## Endpoints del Backend

### 1. POST /ia/recomendar
**Propósito:** Analizar prompt contextual y retornar recomendaciones

**Request:**
```json
{
  "prompt": "Quiero organizar una fiesta infantil para 15 niños con tema de superhéroes con presupuesto de $500-$1000",
  "user_id": "usuario_123",
  "session_context": {
    "timestamp": "2026-03-16T14:30:00Z",
    "location": "CDMX",
    "device": "desktop"
  }
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "analysis": {
      "eventType": "fiesta_infantil",
      "numberOfPeople": 15,
      "theme": "superhéroes",
      "relevantCategories": ["decoración", "dulces", "platos desechables"],
      "budget": {
        "min": 500,
        "max": 1000
      }
    },
    "recommendations": [
      {
        "product_id": "prod_001",
        "name": "Decoración Superhéroes",
        "price": 450,
        "score": 0.95,
        "source": "CONTENT",
        "explanation": "Encontré esto según tu búsqueda: decoración de superhéroes"
      },
      {
        "product_id": "prod_002",
        "name": "Dulces Temáticos",
        "price": 120,
        "score": 0.88,
        "source": "COLLABORATIVE",
        "explanation": "Usuarios similares también compraron esto"
      }
    ],
    "latency_ms": 145
  }
}
```

### 2. GET /ia/preferencias/{user_id}
**Propósito:** Obtener preferencias acumuladas del usuario

**Response:**
```json
{
  "user_id": "usuario_123",
  "favorite_categories": ["decoración", "dulces", "piñatas"],
  "average_budget": 750,
  "event_preferences": {
    "fiestas_infantiles": 0.8,
    "bodas": 0.2
  },
  "average_rating": 4.5
}
```

### 3. POST /ia/predict
**Propósito:** Predecir intereses futuros del usuario

**Request:**
```json
{
  "user_id": "usuario_123"
}
```

**Response:**
```json
{
  "predicted_interests": [
    {
      "category": "Halloween",
      "confidence": 0.85,
      "reason": "Basado en tu historial de eventos"
    }
  ]
}
```

## Módulo de NLP (Natural Language Processing)

### Librerías recomendadas:
- **spaCy** - Procesamiento de lenguaje natural en español
- **NLTK** - Natural Language Toolkit
- **TextBlob** - Análisis de sentimientos y extracción de información
- **transformers (Hugging Face)** - Modelos pre-entrenados para español

### Algoritmo de Extracción de Contexto:

```python
# Pseudocódigo
def analyzePrompt(prompt: str) -> ContextAnalysis:
    # 1. Tokenizar y limpiar
    tokens = tokenize(prompt.lower())
    
    # 2. Detectar tipo de evento
    eventType = detectEventType(tokens)  # Busca palabras clave
    
    # 3. Extraer cantidad de personas
    numberOfPeople = extractNumber(prompt, 
                                   keywords=["personas", "niños", "invitados"])
    
    # 4. Identificar tema
    theme = extractTheme(prompt)  # Busca patrón "tema de X"
    
    # 5. Calcular presupuesto
    budget = extractBudget(prompt)  # Busca rangos numéricos con $
    
    # 6. Mapear a categorías
    relevantCategories = mapToCategories(eventType, theme)
    
    return ContextAnalysis(
        eventType=eventType,
        numberOfPeople=numberOfPeople,
        theme=theme,
        relevantCategories=relevantCategories,
        budget=budget
    )
```

### Tabla de Mapeo de Eventos a Categorías:

| Tipo de Evento | Categorías Sugeridas |
|---|---|
| fiesta_infantil | decoración, globos, dulces, piñatas, juguetes |
| boda | decoración, flores, velas, manteles, servilletas |
| cumpleaños | decoración, globos, pastel, dulces, piñatas |
| navidad | decoración, luces, adornos, velas, ornamentos |
| halloween | decoración, disfraces, calabazas, dulces |
| baby_shower | decoración, pañales, ropa bebé, globos |
| graduación | decoración, birretes, diplomas, globos |
| corporativo | decoración, manteles, servilletas, platos |

## Motor de Recomendación (IA)

### Componente 1: Filtrado Colaborativo
```python
def collaborativeFiltering(user_id: str) -> List[Product]:
    # 1. Obtener vector de comportamiento del usuario
    user_vector = getUserBehaviorVector(user_id)
    
    # 2. Encontrar usuarios similares
    similarUsers = findSimilarUsers(user_vector, k=10)
    
    # 3. Extraer productos que los usuarios similares compraron
    candidates = []
    for simUser in similarUsers:
        products = simUser.purchaseHistory
        if product not in user.purchaseHistory:  # No repitas compras
            candidates.append(product)
    
    return candidates[:50]  # Top 50
```

### Componente 2: Basado en Contenido
```python
def contentBasedRecommendation(user_id: str) -> List[Product]:
    # 1. Obtener historial de productos vistos/comprados
    userProducts = getUserProductHistory(user_id)
    
    # 2. Calcular embeddings (representación vectorial)
    userEmbedding = aggregateEmbeddings(userProducts)
    
    # 3. Comparar con todos los productos del catálogo
    allProducts = getAllProducts()
    scores = []
    
    for product in allProducts:
        if product.id not in userHistory:
            similarity = cosineSimilarity(userEmbedding, product.embedding)
            scores.append((product, similarity))
    
    # 4. Ordenar por similitud
    return sorted(scores, key=lambda x: x[1], reverse=True)[:50]
```

### Componente 3: Reglas de Negocio
```python
def rulesBasedRecommendation(analysis: ContextAnalysis) -> List[Product]:
    candidates = []
    
    # Regla 1: Productos en promoción
    promoProducts = getAllProducts(filter={"on_sale": True})
    candidates.extend(promoProducts[:10])
    
    # Regla 2: Productos populares en categorías relevantes
    for category in analysis.relevantCategories:
        popProducts = getTopProducts(category, limit=5)
        candidates.extend(popProducts)
    
    # Regla 3: Cross-sell (productos complementarios)
    crossSell = getCrossSellProducts(analysis.eventType)
    candidates.extend(crossSell[:10])
    
    return removeDuplicates(candidates)
```

### Función de Scoring:

```python
def scoreAndRank(candidates: List[Product], analysis: ContextAnalysis, 
                weights: dict) -> List[Product]:
    scores = []
    
    for product in candidates:
        score = 0
        
        # Factor 1: Relevancia colaborativa (peso 0.3)
        collab_score = getCollaborativeScore(product)
        score += weights['collaborative'] * collab_score
        
        # Factor 2: Similitud de contenido (peso 0.3)
        content_score = getContentScore(product)
        score += weights['content'] * content_score
        
        # Factor 3: Reglas de negocio (bonus +0.3)
        if isOnPromotion(product):
            score += 0.3
        
        # Factor 4: Popularidad (peso 0.2)
        popularity = getPopularity(product)  # Compras últimas 72h
        score += weights['popularity'] * popularity
        
        # Factor 5: Penalización por baja calidad
        if product.rating < 2.5:
            score -= 0.5
        
        if product.stock == 0:
            score -= 1.0  # Excluir si no hay stock
        
        # Factor 6: Filtrar por presupuesto si aplica
        if analysis.budget:
            if product.price < analysis.budget['min'] or \
               product.price > analysis.budget['max']:
                continue
        
        scores.append((product, score))
    
    # Ordenar por score descendente
    return sorted(scores, key=lambda x: x[1], reverse=True)
```

## Implementación en FastAPI (Python)

```python
from fastapi import FastAPI, HTTPException
from datetime import datetime

app = FastAPI()

# Importar módulos propios
from ia.nlp_module import analyzePrompt
from ia.recommendation_engine import generateRecommendations
from database import getProductsByIds

@app.post("/ia/recomendar")
async def contextualRecommendations(request: RecommendationRequest):
    try:
        # 1. Validar entrada
        if not request.prompt or len(request.prompt) < 10:
            raise HTTPException(status_code=400, 
                              detail="El prompt debe tener al menos 10 caracteres")
        
        # 2. Analizar contexto
        start_time = datetime.now()
        analysis = analyzePrompt(request.prompt)
        
        # 3. Generar recomendaciones
        recommendations = generateRecommendations(
            analysis=analysis,
            user_id=request.user_id,
            session_context=request.session_context
        )
        
        # 4. Enriquecer con datos de productos
        products = getProductsByIds([r.product_id for r in recommendations])
        
        # 5. Calcular latencia
        latency = (datetime.now() - start_time).total_seconds() * 1000
        
        return {
            "status": "success",
            "data": {
                "analysis": analysis.dict(),
                "recommendations": [
                    {
                        **p.dict(),
                        "source": r.source,
                        "explanation": r.explanation
                    }
                    for p, r in zip(products, recommendations)
                ],
                "latency_ms": int(latency)
            }
        }
    
    except Exception as e:
        return {
            "status": "error",
            "message": str(e),
            "code": 500
        }
```

## Consideraciones de Rendimiento

- **Caché:** Cachear análisis frecuentes para reducir latencia
- **Índices DB:** Crear índices en categorías, precios y ratings
- **Embeddings:** Pre-calcular embeddings de productos
- **Límite de Latencia:** < 500ms según requerimientos

## Mejoras Futuras

- Integrar GPT-4 / Claude para análisis más sofisticado
- Machine Learning con datos históricos
- A/B testing de diferentes algoritmos
- Captura de feedback del usuario para mejorar
- Soporte para búsqueda multi-idioma
