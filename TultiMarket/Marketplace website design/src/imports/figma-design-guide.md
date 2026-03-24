🎨 Guía de Diseño Figma — Marketplace tipo Amazon
Resumen de Pantallas Necesarias
Basado en los 19 casos de uso, necesitas diseñar 13 pantallas principales (algunas con sub-pantallas o modales). Aquí te organizo todo para que lo puedas llevar a Figma de forma estructurada.

📐 Estructura Recomendada en Figma
Organización del Archivo Figma
📁 Marketplace - Diseño UI
├── 📄 Page 1: Design System (colores, tipografía, componentes base)
├── 📄 Page 2: Autenticación (Login + Registro)
├── 📄 Page 3: Comprador - Flujo Principal
├── 📄 Page 4: Comprador - Carrito y Checkout
├── 📄 Page 5: Comprador - Perfil y Cuenta
├── 📄 Page 6: Vendedor - Panel
└── 📄 Page 7: Administrador - Panel
🖥️ Mapa de Pantallas y Prompts para Figma AI
Pantalla 1 — Registro de Usuario (CU-01)
Prompt sugerido para Figma AI: "Design a modern registration page for an e-commerce marketplace similar to Amazon. Include fields for: full name, email address, password, confirm password, and a role selector (Buyer/Seller) as toggle buttons or radio buttons. Add a 'Create Account' primary button, a link to 'Already have an account? Sign in', and the marketplace logo at the top. Use a clean, minimal layout with a white card centered on screen. Include subtle validation indicators for email format."

Elementos requeridos:

 Campo: Nombre completo
 Campo: Correo electrónico
 Campo: Contraseña
 Selector de rol: Comprador / Vendedor
 Botón: Crear cuenta
 Enlace: "¿Ya tienes cuenta? Inicia sesión"
 Validación visual de correo ya registrado (estado error)
Pantalla 2 — Inicio de Sesión (CU-02)
Prompt sugerido para Figma AI: "Design a login page for an e-commerce marketplace. Include email and password fields, a 'Sign In' primary button, 'Forgot password?' link, and a 'Create account' secondary link. Add the marketplace logo prominently. Style it like Amazon's login page – clean, centered card layout with warm accent colors. The page should feel trustworthy and professional."

Elementos requeridos:

 Campo: Correo electrónico
 Campo: Contraseña
 Botón: Iniciar sesión
 Enlace: Crear cuenta nueva
 Logo del marketplace
Pantalla 3 — Página Principal / Catálogo (CU-04)
Prompt sugerido para Figma AI: "Design the homepage of an Amazon-like marketplace. Include: a top navigation bar with logo, smart search bar with autocomplete dropdown, category navigation, user account icon, wishlist icon, and cart icon with item count badge. Below the nav, add a hero banner/carousel for promotions. Then show a 'Featured Products' section as a horizontal scrollable row of product cards (image, name, price, star rating, 'Add to Cart' button). Below that, show a 'Browse by Category' grid section with category cards (icon + name). Include a sidebar with category filters, price range slider, and rating filter. Use Amazon's layout as reference."

Elementos requeridos:

 Navbar: Logo, barra de búsqueda, iconos (cuenta, wishlist, carrito)
 Hero banner / carrusel promocional
 Sección: Productos destacados / mejor calificados (RF-12)
 Grid de categorías navegables (RF-09, RF-10)
 Filtros: categoría, precio (asc/desc), calificación (RF-11)
 Cards de producto: imagen, nombre, precio, rating, botón agregar
Sub-componente — Barra de búsqueda inteligente (CU-03):

Prompt adicional: "Design a search bar dropdown component for a marketplace. Show: autocomplete suggestions as the user types, product thumbnail previews in suggestions, a 'Did you mean...?' correction for typos, and suggested similar products section. Include category filter chips inside the search bar."

 Autocompletado inteligente (RF-07)
 Tolerancia a errores tipográficos (RF-08)
 Sugerencias de productos similares
Pantalla 4 — Detalle de Producto (CU-05)
Prompt sugerido para Figma AI: "Design a product detail page for an Amazon-like marketplace. Include: product image gallery (main image + thumbnails), product title, star rating with review count, price, stock availability indicator, quantity selector, 'Add to Cart' button, 'Add to Wishlist' button (heart icon), product description tabs (Description, Reviews, Seller Info). Show seller information card (name, rating, store link). Include a 'Promotional Bundles' section showing related product bundles from the same seller with a discounted package price. Below the main content, show a 'Customer Reviews' section with individual review cards (user name, star rating, date, comment text)."

Elementos requeridos:

 Galería de imágenes del producto
 Nombre, precio, descripción, stock disponible (RF-13)
 Rating en estrellas + conteo de reseñas
 Selector de cantidad + botón "Agregar al carrito" (RF-17)
 Botón "Agregar a lista de deseos" ❤️ (RF-16)
 Datos del vendedor (RF-13)
 Sección de paquetes promocionales del vendedor (RF-14)
 Sección de reseñas de compradores
Sub-componente — Calificar producto (CU-06):

 Modal/formulario: selector de 1-5 estrellas + campo de comentario (RF-15)
 Solo visible para compradores que ya adquirieron el producto
Pantalla 5 — Carrito de Compras (CU-08)
Prompt sugerido para Figma AI: "Design a shopping cart page for a marketplace. Include: a list of cart items (product thumbnail, name, unit price, quantity selector with +/- buttons, subtotal per item, remove button). Show a cart summary sidebar with: subtotal, estimated shipping, total amount, and a 'Proceed to Checkout' primary button. At the top, show a context badge indicating 'Fiestas' (fixed shopping context). Include an empty cart state design with a CTA to browse products. Style similar to Amazon's cart page."

Elementos requeridos:

 Lista de artículos: thumbnail, nombre, precio unitario, cantidad, subtotal (RF-19)
 Controles: modificar cantidad, eliminar producto (RF-20)
 Contexto fijo visible: "Fiestas" (RF-18)
 Resumen: subtotal, total
 Botón: "Proceder al pago"
 Estado vacío del carrito
Pantalla 6 — Checkout / Confirmación de Pedido (CU-09)
Prompt sugerido para Figma AI: "Design a checkout confirmation page for a marketplace (no real payment processing). Include: an order summary table (product name, quantity, unit price, line total), order folio number, order date, delivery address, and grand total. Add a 'Confirm Order' button. After confirmation, show a success state with a checkmark animation, order folio prominently displayed, and a 'Continue Shopping' button. This is a simulated order – no credit card or payment fields needed. Include a stepper showing: Cart → Confirmation → Complete."

Elementos requeridos:

 Resumen del pedido: folio, fecha, lista de productos, monto total (RF-21)
 Dirección de envío seleccionada
 Botón: "Confirmar pedido"
 Pantalla de éxito post-confirmación (RF-22)
 No incluir datos bancarios / tarjetas
Pantalla 7 — Perfil de Usuario / Mi Cuenta (CU-10)
Prompt sugerido para Figma AI: "Design a 'My Account' profile page for a marketplace. Include: editable personal info section (name, email, phone), shipping addresses section with add/edit/delete address cards, account settings, and a sidebar or tab navigation to: Order History, Wishlist, and Account Settings. Add a 'Sign Out' button. Include a profile avatar upload area. Design it clean and organized like Amazon's account page."

Elementos requeridos:

 Edición de info personal + direcciones de envío (RF-23)
 Navegación a: Historial de pedidos, Lista de deseos
 Botón: Cerrar sesión (RF-05)
Sub-pantalla 7a — Historial de Pedidos (CU-11):

"Design an order history page showing a list of past orders. Each order card shows: order folio, date, product thumbnails, number of items, total amount, and order status. Include filters by date range. Add a 'View Details' link per order that expands to show full product list."

 Lista de pedidos: fecha, productos, monto total (RF-24)
Sub-pantalla 7b — Lista de Deseos (CU-12):

"Design a wishlist page showing saved products in a grid layout. Each product card shows: image, name, price, availability status, 'Add to Cart' button, and 'Remove' button. Include an empty state with a CTA to browse products."

 Grid de productos guardados con acciones (RF-25)
Pantalla 8 — Panel del Vendedor: Publicar/Editar Producto (CU-13)
Prompt sugerido para Figma AI: "Design a seller dashboard product management page for a marketplace. Include: a product list table (thumbnail, name, price, stock, category, status, actions). Add a 'New Product' button that leads to a form with: product name, description (rich text), price input, image upload area (drag & drop, multiple images), stock quantity, and category selector dropdown (context: Fiestas). Include edit and deactivate/delete actions per product. Design it professional with a sidebar for seller navigation."

Elementos requeridos:

 Tabla/lista de productos del vendedor
 Formulario: nombre, descripción, precio, imágenes, stock, categoría (RF-26)
 Acciones: editar, dar de baja (RF-27)
Sub-pantalla 8a — Control de Inventario (CU-14):

"Design an inventory management sub-page. Show a table of products with columns: product name, current stock, stock status (In Stock/Low/Out), and an inline editable quantity field. Include bulk actions and low-stock alerts highlighted in red/amber."

 Vista de inventario con cantidades editables (RF-28)
Sub-pantalla 8b — Paquetes Promocionales (CU-15):

"Design a promotional bundle creation form. Include: bundle name, selection of 2+ existing products from the seller's catalog (with checkboxes or a product picker), individual prices shown, and a discounted bundle price input. Show a preview card of how the bundle will appear to buyers."

 Creación de bundles: selección de 2+ productos, precio preferencial (RF-29)
Pantalla 9 — Panel del Vendedor: Pedidos Recibidos (CU-16)
Prompt sugerido para Figma AI: "Design a seller orders management page. Show a table/list of received orders with: order folio, buyer name, date, products ordered, total amount, and a status dropdown (En preparación / Enviado / Entregado). Include order filters by status and date. Add a detail expansion for each order showing individual items. Design with a clean dashboard aesthetic."

Elementos requeridos:

 Lista de órdenes recibidas (RF-30)
 Actualización de estado: En preparación → Enviado → Entregado (RF-30)
 Filtros por estado y fecha
Sub-pantalla 9a — Resumen de Ventas (CU-17):

"Design a seller sales summary dashboard. Include: stat cards showing total orders received, total revenue, and average product rating. Add a simple bar chart or line chart for orders over time. Show a list of top-rated products. Keep it clean and informative with KPI cards at the top."

 Total de órdenes, calificación promedio (RF-31)
 Gráficas básicas de ventas
Pantalla 10 — Panel de Administrador: Gestión de Usuarios (CU-18)
Prompt sugerido para Figma AI: "Design an admin user management panel for a marketplace. Include: a searchable and filterable table of all registered users showing: name, email, role (Buyer/Seller), registration date, status (Active/Blocked). Add action buttons per row: View Profile, Block/Unblock (toggle), and Delete (with confirmation modal). Include filters by role and status. Add a total user count at the top. Design with an admin dashboard sidebar navigation."

Elementos requeridos:

 Tabla de usuarios registrados: compradores y vendedores (RF-32)
 Acciones: bloquear/desbloquear (RF-33), eliminar (RF-34)
 Modal de confirmación para acciones destructivas
 Filtros por rol y estado
Sub-pantalla 10a — Reportes/Denuncias (CU-19):

"Design a reports/complaints review page for an admin panel. Show a list of user reports with: report ID, reporter name, reported user/product, reason/category, date submitted, status (Pending/Reviewed/Resolved). Include a detail view showing the full report description and actions: Dismiss, Warn User, Block User, Remove Product. Add filters by report type and status."

 Lista de reportes/denuncias (RF-35)
 Acciones: desestimar, advertir, bloquear, eliminar producto
🎨 Design System — Lo que debes definir primero
Antes de diseñar las pantallas, crea estos componentes base en Figma:

Colores Sugeridos (estilo Amazon)
Token	Color	Uso
Primary	#FF9900 / #FFA41C	Botones primarios, CTAs, acentos
Primary Dark	#E47911	Hover en botones, links activos
Background	#FFFFFF	Fondo principal
Surface	#F5F5F5 / #EAEDED	Fondo de secciones, cards
Text Primary	#0F1111	Texto principal
Text Secondary	#565959	Texto secundario, descripciones
Link	#007185	Links, acciones secundarias
Success	#067D62	En stock, confirmaciones
Error	#B12704	Precio, alertas, errores
Star	#FFA41C	Rating de estrellas
Tipografía
Font principal: Amazon Ember (o alternativa: Inter, Roboto)
Headings: 24-32px, Bold
Body: 14-16px, Regular
Caption/Small: 12px, Regular
Componentes Reutilizables
Product Card — imagen, nombre, rating, precio, botón
Button — Primary (naranja), Secondary (outline), Disabled
Input Field — Normal, Focus, Error, Disabled
Star Rating — 1-5 estrellas, interactivo y display
Badge — Notificación, stock status, rol de usuario
Modal — Confirmación, formularios
Table Row — Para paneles de admin/vendedor
Navigation Bar — Con búsqueda integrada
Sidebar — Para dashboards de vendedor/admin
Card — Para direcciones, pedidos, bundles
🔀 Flujo de Navegación
Login/Registro
    │
    ├── 🛒 COMPRADOR
    │   ├── Página Principal (Catálogo)
    │   │   ├── Búsqueda con IA
    │   │   ├── Filtros y Categorías
    │   │   └── Detalle de Producto
    │   │       ├── Agregar al Carrito
    │   │       ├── Agregar a Lista de Deseos
    │   │       └── Calificar (si ya compró)
    │   ├── Carrito de Compras
    │   │   └── Checkout → Confirmación
    │   └── Mi Cuenta
    │       ├── Editar Perfil
    │       ├── Historial de Pedidos
    │       └── Lista de Deseos
    │
    ├── 🏪 VENDEDOR
    │   ├── Mis Productos
    │   │   ├── Publicar/Editar Producto
    │   │   ├── Control de Inventario
    │   │   └── Crear Paquete Promocional
    │   ├── Pedidos Recibidos
    │   │   └── Resumen de Ventas
    │   └── Mi Perfil
    │
    └── 🔧 ADMINISTRADOR
        ├── Gestión de Usuarios
        │   └── Bloquear/Eliminar
        ├── Reportes y Denuncias
        └── Mi Perfil
💡 Tips para Figma
Usa Auto Layout en todos los componentes para que sean responsivos
Crea variantes de cada componente (estados: default, hover, active, disabled, error)
Usa Figma Variables para colores y tipografía → facilita cambios globales
Prototipa los flujos conectando las pantallas con interacciones
Nombra bien tus layers — te ahorrará tiempo después al pasar a código
Frame size recomendado: Desktop 1440×900, Mobile 375×812 (si es responsive)
Si usas Figma AI (Make Designs): pega los prompts de arriba tal cual, uno por pantalla