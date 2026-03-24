# ✅ Búsqueda Contextual Funcional - Guía Rápida

## 🎯 Estado Actual
La búsqueda contextual ya está **completamente funcional** en tu sitio web.

---

## 🚀 Cómo Probar

### 1. **Abre el Navegador**
```
http://localhost:5173/buscar
```

### 2. **Escribe tu Evento**
En el textarea de búsqueda, escribe algo como:

```
"Quiero hacer una fiesta infantil para 15 niños con tema de superhéroes, 
presupuesto $500-$1000"
```

O prueba cualquiera de estos ejemplos:

```
✅ "Fiesta de cumpleaños para 20 personas"
✅ "Boda con 100 invitados, tema elegante"
✅ "Baby shower para 30 personas"
✅ "Graduación de mi hijo, presupuesto máximo $2000"
✅ "Decoración de navidad, presupuesto $500-$1500"
```

### 3. **Haz Clic en "Buscar"**
El sistema analizará automáticamente tu texto y mostrará:

- ✅ **Tipo de evento detectado** (fiesta, boda, cumpleaños, etc.)
- ✅ **Número de personas** (si lo mencionaste)
- ✅ **Tema/Temática** (si especificaste)
- ✅ **Presupuesto** (si lo indicaste)
- ✅ **Categorías recomendadas**

### 4. **Ve los Productos**
Se mostrará un grid de productos filtrados automáticamente según tu búsqueda.

---

## 📊 Filtros Disponibles (¡NUEVOS!)

Una vez que tienes resultados, puedes:

### **En Desktop:**
Los filtros ya están **siempre visibles**:

1. **📌 Ordenar por:**
   - Relevancia (por defecto)
   - Precio: Menor a Mayor
   - Precio: Mayor a Menor
   - Mejor Calificación
   - Nombre A-Z

2. **💰 Rango de Precio:**
   - Desliza para filtrar entre $0 - $2000
   - Ve el rango actualizado en tiempo real

3. **⭐ Calificación Mínima:**
   - Desliza para mostrar solo productos con rating ≥ X estrellas
   - Rango: 0 - 5 estrellas

4. **🔄 Botones:**
   - ✅ **Resetear Filtros** - Vuelve a los valores por defecto
   - ✅ **Limpiar** - Barra de filtros activos (si aplica)

### **En Mobile:**
1. Toca el botón **"Filtros y Ordenamiento"**
2. Ajusta los controles en el modal
3. Toca **"Aplicar Filtros"** para cerrar

---

## 🧠 Cómo Funciona el Análisis

### **Detección de Tipo de Evento:**
```
El sistema busca palabras como:
- fiesta, party, celebración
- boda, wedding, matrimonio
- cumpleaños, birthday
- baby shower, embarazo
- graduación
- navidad, christmas
- halloween
```

### **Extracción de Personas:**
```
El sistema busca patrones como:
- "para 15 niños"
- "50 invitados"
- "20 personas"
- "100 gente"
```

### **Detección de Tema:**
```
El sistema busca palabras como:
- "tema de X"
- "estilo X"
- "de X tema"
- Palabras temáticas: superhéroes, princesas, dinosaurios, etc.
```

### **Presupuesto:**
```
El sistema busca patrones como:
- "$500-$1000"
- "$500 a $1000"  
- "presupuesto $1000"
- "máximo $2000"
- "presupuesto máximo $3000"
```

---

## 🎯 Mapeo de Eventos a Productos

### Para cada tipo de evento, se sugieren categorías específicas:

| Evento | Categorías |
|---|---|
| 🎂 **Fiesta Infantil** | Decoración, Globos, Dulces, Piñatas, Platos, Servilletas |
| 💍 **Boda** | Decoración, Velas, Flores, Manteles, Servilletas |
| 🎈 **Cumpleaños** | Decoración, Globos, Dulces, Piñatas, Pastel, Velas |
| 🎄 **Navidad** | Decoración, Luces, Adornos, Velas, Globos |
| 👶 **Baby Shower** | Decoración, Globos, Pañales, Ropa bebé, Velas |
| 🎓 **Graduación** | Decoración, Sombreros, Globos, Diplomas, Piñatas |
| 🎃 **Halloween** | Decoración, Disfraces, Calabazas, Dulces, Velas |
| 🏢 **Corporativo** | Decoración, Manteles, Servilletas, Vasos, Platos |

---

## 💡 Ejemplos Paso a Paso

### **Ejemplo 1: Fiesta Infantil**

```
1. Input: "Fiesta de 20 niños con tema de dinosaurios, presupuesto $800"

2. Análisis Detectado:
   ✅ Tipo de evento: infantil
   ✅ Personas: 20  
   ✅ Tema: dinosaurios
   ✅ Presupuesto: $800
   ✅ Categorías: decoración, globos, dulces, piñatas, platos

3. Sistema filtra productos que coincidan:
   - En categorías: decoración, globos, dulces, piñatas, platos
   - Presupuesto: ≤ $800
   - Tema: que mencione "dinosaurios"

4. Resultado: 8 productos mostrados en orden de relevancia

5. Puedes filtrar más:
   - Ordenar por precio o rating
   - Ajustar rango de precio
   - Filtrar por calificación mínima
```

### **Ejemplo 2: Boda**

```
1. Input: "Boda elegante para 150 personas, presupuesto $5000-$8000"

2. Análisis Detectado:
   ✅ Tipo de evento: boda
   ✅ Personas: 150
   ✅ Tema: elegante
   ✅ Presupuesto: $5000-$8000
   ✅ Categorías: decoración, velas, flores, manteles, servilletas

3. Sistema filtra productos automáticamente

4. Puedes refinar:
   - Mostrar solo productos con rating ≥ 4.5 estrellas
   - Ordenar por precio: Mayor a Menor
   - Ajustar presupuesto máximo a $7000
```

### **Ejemplo 3: Sin Presupuesto**

```
1. Input: "Cumpleaños para 30 personas"

2. Análisis Detectado:
   ✅ Tipo de evento: cumpleaños
   ✅ Personas: 30
   ✅ Tema: (no especificado)
   ✅ Presupuesto: (no especificado)
   ✅ Categorías: decoración, globos, dulces, piñatas, pastel, velas

3. Sistema muestra todos los productos en esas categorías

4. TÚ aplicas los filtros:
   - Establece un rango de precio (ej: $100-$500)
   - Filtra por calificación
   - Ordena como desees
```

---

## 🎨 Interfaz de Filtros

### **Desktop (Siempre Visible)**
```
┌─────────────────────────────────────────────────┐
│ Ordenamiento | Rango Precio | Calificación Min  │
│ ────────────────────────────────────────────── │
│ (Dropdown)   | (Slider)    | (Slider)      │
│              | $0 - $1500  | 2.5 ⭐         │
│ (Botón Resetear Filtros)                       │
└─────────────────────────────────────────────────┘
```

### **Mobile (Modal Desplegable)**
```
Botón: "Filtros y Ordenamiento"
    ↓ (toque)
Modal:
  - Ordenamiento (Dropdown)
  - Rango Precio (Slider)
  - Calificación (Slider)
  - [Resetear] [Aplicar]
```

---

## 🔧 Controles Detallados

### **Rango de Precio**
- **Deslizador:** Arrastra para cambiar el máximo
- **Increments:** De $50 en $50
- **Rango:** $0 - $2000
- **Muestra:** `$0 - $[valor actual]`

### **Calificación Mínima**
- **Deslizador:** Arrastra para cambiar el mínimo
- **Increments:** De 0.5 estrellas en 0.5
- **Rango:** 0 - 5 ⭐
- **Muestra:** `[valor actual] ⭐`

### **Ordenamiento**
- Relevancia (default)
- Precio ↑ (menor a mayor)
- Precio ↓ (mayor a menor)
- Rating ⭐ (mejor calificación)
- Nombre A-Z (alfabético)

---

## ⚠️ Limitaciones Actuales

- ⚠️ **Análisis simulado** (no usa IA real aún)
- ⚠️ **Productos mock** (datos de ejemplo solamente)
- ⚠️ **Sin histórico de usuario**
- ✅ **Funciona en tiempo real**
- ✅ **Hot reload** (cambios en vivo)

---

## 🔮 Próximas Mejoras

- [ ] Integración con backend real (Python/FastAPI)
- [ ] NLP real con spaCy
- [ ] Machine Learning para recomendaciones
- [ ] Guardar búsquedas favoritas
- [ ] Histórico de búsquedas
- [ ] Chatbot conversacional
- [ ] Integración con GPT-4/Claude

---

## 📱 Accesibilidad

Los filtros son:
- ✅ Responsivos (mobile, tablet, desktop)
- ✅ Touch-friendly (botones grandes en mobile)
- ✅ Keyboard accessible
- ✅ Con labels claros
- ✅ Indicadores visuales activos

---

## 🎓 Notas Técnicas

### **Frontend (React + TypeScript)**
- Componente: `contextual-search.tsx`
- Página: `search.tsx`
- Análisis de regex + palabras clave
- Filtrado en el cliente

### **Estado Global**
```typescript
const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
const [minRating, setMinRating] = useState(0);
const [sortBy, setSortBy] = useState("relevancia");
const [showFilters, setShowFilters] = useState(false);
```

### **Filtrado en Tiempo Real**
```typescript
const filteredResults = searchResults
  .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
  .filter(p => p.rating >= minRating)
  .sort(/* según sortBy */);
```

---

## ✅ Checklist Funcionalidad

- ✅ Buscador contextual con textarea
- ✅ Análisis automático de contexto
- ✅ Extracción de tipo evento
- ✅ Extracción de número de personas
- ✅ Extracción de tema
- ✅ Extracción de presupuesto
- ✅ Mapeo a categorías
- ✅ Filtrado de productos por categoría
- ✅ Filtrado por presupuesto
- ✅ Visualización de análisis
- ✅ Filtros de precio (desktop + mobile)
- ✅ Filtros de calificación (desktop + mobile)
- ✅ Ordenamiento flexible
- ✅ Botón resetear filtros
- ✅ Indicador de filtros activos
- ✅ Responsive design
- ✅ Hot reload en desarrollo

---

## 🚀 Próximo Paso

¡Prueba ahora mismo en tu navegador!
```
http://localhost:5173/buscar
```

Escribe un prompt descriptivo y observa cómo el sistema:
1. Analiza automáticamente tu búsqueda
2. Filtra productos relevantes
3. Te permite refinar con filtros adicionales

