# Resumen: Motor de Búsqueda Contextual Implementado

## 🎯 ¿Qué se implementó?

Se desarrolló un **Motor de Búsqueda Contextual con IA** que permite a los usuarios:

1. **Escribir prompts descriptivos** en lugar de buscar producto por producto
   - Ej: "Fiesta infantil para 15 niños tema superhéroes, $500-$1000"

2. **Sistema analiza automáticamente** el contexto:
   - Extrae tipo de evento (fiesta, boda, etc.)
   - Detecta cantidad de personas
   - Identifica tema/temática
   - Calcula presupuesto

3. **Retorna productos recomendados** basados en el análisis
   - Filtrados por categorías relevantes
   - Ordenados por relevancia, precio, y rating
   - Con explicaciones de por qué se recomendaron

---

## 📁 Archivos Creados

### Frontend - Componentes
```
src/app/components/contextual-search.tsx
├─ Componente de búsqueda con textarea
├─ Análisis de contexto (extracción de palabras clave)
├─ Visualización de análisis detectado
└─ Botón para enviar al backend
```

### Frontend - Páginas
```
src/app/pages/search.tsx
├─ Página completa de búsqueda contextual
├─ Muestra análisis realizado
├─ Grid de productos con filtros adicionales
├─ Filtros: precio, rating, ordenamiento
└─ Vista responsiva (mobile + desktop)
```

### Frontend - Servicios
```
src/app/services/ia-service.ts
├─ Clase IAService para conectar con backend
├─ Métodos para análisis contextual
├─ Métodos para preferencias de usuario
└─ Métodos para predicción de intereses
```

### Navbar Actualizado
```
src/app/components/layout/navbar.tsx
├─ Nuevo ícono de cerebro (🧠) para acceso rápido
├─ Enlace a página /buscar
├─ Pull de transformador de Brain de lucide-react
```

### Rutas Actualizadas
```
src/app/routes.ts
├─ Nueva ruta: /buscar → SearchPage
└─ Integrada en RootLayout
```

### Documentación
```
MOTOR_CONTEXTUAL_GUIA.md
├─ Guía completa de uso
├─ Ejemplos de prompts
├─ Mapeo de eventos a categorías
└─ Arquitectura técnica

ARCHITECTURE_BACKEND.md
├─ Especificaciones del backend
├─ Endpoints API REST
├─ Algoritmo de NLP
├─ Motor de recomendación
├─ Código ejemplo en FastAPI
└─ Consideraciones de rendimiento
```

---

## 🚀 Cómo Usar

### 1. Accede a la búsqueda contextual:
```
- URL: http://localhost:5173/buscar
- O haz clic en ícono 🧠 del navbar
```

### 2. Escribe tu prompt:
```
"Quiero organizar una fiesta infantil para 15 niños 
con tema de superhéroes, presupuesto $500-$1000"
```

### 3. El sistema analiza y muestra:
```
✓ Tipo de evento: fiesta_infantil
✓ Personas: 15
✓ Tema: superhéroes  
✓ Presupuesto: $500-$1000
✓ Categorías: decoración, dulces, platos, piñatas
```

### 4. Navega mediante filtros:
```
- Filtrar por rango de precio
- Filtrar por calificación mínima
- Ordenar por: relevancia, precio, rating
```

---

## 🏗️ Arquitectura Técnica

### Frontend (Actual - Funcional)
```
Usuario escribe prompt
    ↓
contextual-search.tsx analiza texto
    ↓
Extrae: tipo evento, personas, tema, presupuesto
    ↓
Mapea a categorías de productos
    ↓
Filtra productos del catálogo mock
    ↓
SearchPage muestra resultados con filtros
```

### Backend (Implementación Futura)
```
POST /ia/recomendar 
    ↓
Módulo NLP (spaCy/transformers)
    ↓
Análisis contextual avanzado
    ↓
Motor de Recomendación IA (3 componentes)
├─ Filtrado Colaborativo
├─ Basado en Contenido  
└─ Reglas de Negocio
    ↓
Scoring y Ranking
    ↓
Retorna JSON con recomendaciones
```

---

## 🔍 Extracción de Contexto

### Palabras Clave Detectadas:

**Tipos de Eventos:**
```
fiesta, cumpleaños, boda, navidad, infantil,
corporativo, graduación, baby shower, halloween
```

**Cantidad de Personas:**
```javascript
// Detecta automáticamente
"para 15 niños"    → 15
"50 invitados"     → 50  
"20 personas"      → 20
```

**Temática:**
```javascript
// Busca patrones "tema de X"
"tema de superhéroes" → superhéroes
"estilo vintage"      → vintage
"de princesas"        → princesas
```

**Presupuesto:**
```javascript
// Detecta rangos con $
"$500-$1000"         → min: 500, max: 1000
"presupuesto máximo $2000" → max: 2000
```

---

## 📊 Motor de Scoring

Cada producto recibe una puntuación de 0-1:

```
score_final = 
  0.3 × colaborativo +
  0.3 × contenido +
  0.3 × reglas +
  0.2 × popularidad -
  penalización
```

**Factores:**
- ✅ **Colaborativo:** Usuarios similares compraron
- ✅ **Contenido:** Similitud con productos vistos
- ✅ **Reglas:** En promoción, categoría relevante  
- ✅ **Popularidad:** Compras últimas 72h
- ❌ **Penalizaciones:** Stock vacío, baja calidad

---

## ✨ Features Implementados

### ✅ Frontend (Completado)
- [x] Componente de búsqueda contextual
- [x] Análisis local de contexto
- [x] Extracción de palabras clave
- [x] Mapeo a categorías
- [x] Filtrado de productos
- [x] Página de resultados responsive
- [x] Filtros adicionales (precio, rating)
- [x] Ordenamiento (relevancia, precio, rating)
- [x] Navbar con acceso rápido
- [x] Visualización de análisis

### 🔄 Backend (Próximos)
- [ ] NLP real con spaCy/transformers
- [ ] Base de datos PostgreSQL
- [ ] API REST endpoints
- [ ] Machine Learning colaborativo
- [ ] Caché de análisis
- [ ] Histórico de búsquedas
- [ ] A/B testing de algoritmos
- [ ] Analytics y métricas

---

## 📱 Responsividad

### Desktop
- Navbar con todos los elementos
- Botón de búsqueda IA visible
- Grid de 4 columnas de productos
- Filtros en sidebar

### Tablet
- Navbar adaptado
- Grid de 3 columnas
- Filtros en modal

### Mobile
- Navbar colapsado
- Grid de 1-2 columnas  
- Filtros en drawer modal
- Optimizado para touch

---

## 🔗 Rutas Disponibles

```
/              → Página principal
/buscar        → 🆕 Búsqueda contextual con IA
/producto/:id  → Detalle de producto
/carrito       → Carrito de compras
/checkout      → Confirmar pedido
/perfil        → Mi cuenta
/pedidos       → Historial de pedidos
/wishlist      → Lista de deseos
```

---

## 🧪 Casos de Uso

### Ejemplo 1: Fiesta Infantil
```
Input: "Fiesta infantil para 20 niños tema de animales, presupuesto $1000"

Análisis Detectado:
- Evento: fiesta_infantil
- Personas: 20
- Tema: animales
- Presupuesto: $1000

Categorías Recomendadas:
- Decoración
- Globos
- Dulces
- Piñatas
- Platos y vasos
```

### Ejemplo 2: Boda
```
Input: "Boda para 100 personas, tema elegante, presupuesto $5000"

Análisis Detectado:
- Evento: boda
- Personas: 100
- Tema: elegante
- Presupuesto: $5000

Categorías Recomendadas:
- Decoración elegante
- Manteles
- Servilletas
- Velas
- Flores
```

### Ejemplo 3: Graduación
```
Input: "Fiesta de graduación para 50 estudiantes"

Análisis Detectado:
- Evento: graduacion
- Personas: 50

Categorías Recomendadas:
- Decoración
- Globos
- Sombreros
- Diplomas
```

---

## 🚨 Limitaciones Actuales

### Frontend (Análisis Simulado)
- ⚠️ Análisis básico con regex y palabras clave
- ⚠️ No entiende sinónimos complejos
- ⚠️ Limitado a palabras en español/inglés

### Datos
- ⚠️ Usa mock-data estático
- ⚠️ No hay histórico de usuario
- ⚠️ No hay Machine Learning

### Rendimiento
- ⚠️ Sin caché
- ⚠️ Sin índices de base de datos
- ⚠️ Análisis en frontend (no escalable)

**Solución:** Implementar backend con NLP real

---

## ✅ Próximos Pasos

### Corto Plazo
1. Mejorar análisis de contexto (sinónimos, expresiones complejas)
2. Agregar más ejemplos en la UI
3. Integrar feedback del usuario

### Mediano Plazo
1. Implementar backend Python/FastAPI
2. Integrar spaCy para NLP real
3. Crear base de datos PostgreSQL
4. Implementar API endpoints

### Largo Plazo
1. Machine Learning colaborativo
2. Asistente chatbot conversacional
3. Integración con GPT-4/Claude
4. Analytics y dashboards
5. Optimización basada en datos reales

---

## 📚 Documentación

- **MOTOR_CONTEXTUAL_GUIA.md** - Guía de uso completa
- **ARCHITECTURE_BACKEND.md** - Especificaciones técnicas del backend
- **documento.txt** - Documento de requisitos del proyecto

---

## 🎓 Tecnologías Utilizadas

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- React Router
- Lucide Icons (para ícono 🧠)

### Backend (Futuro)
- Python 3.10+
- FastAPI
- spaCy / transformers (NLP)
- scikit-learn (Machine Learning)
- PostgreSQL

---

## 📞 Contacto

Para preguntas o cambios, consulta:
- Documento de requisitos: `documento.txt`
- Architecture: `ARCHITECTURE_BACKEND.md`  
- Guía de uso: `MOTOR_CONTEXTUAL_GUIA.md`

---

**Estado:** ✅ Implementación Frontend Completada  
**Fecha:** 16 de Marzo, 2026  
**Versión:** 1.0
