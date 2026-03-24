-- =========================
-- TABLA ROLES
-- =========================
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL
);

-- =========================
-- TABLA USUARIOS
-- =========================
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    id_rol INT NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    telefono VARCHAR(20),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_rol) REFERENCES roles(id)
);

-- =========================
-- TABLA DIRECCIONES
-- =========================
CREATE TABLE direcciones (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    calle VARCHAR(200),
    ciudad VARCHAR(100),
    estado VARCHAR(100),
    codigo_postal VARCHAR(20),
    pais VARCHAR(100),
    es_principal BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- =========================
-- TABLA NEGOCIOS
-- =========================
CREATE TABLE negocios (
    id SERIAL PRIMARY KEY,
    id_proveedor INT NOT NULL,
    nombre_comercial VARCHAR(150),
    rfc_tax_id VARCHAR(50),
    descripcion_negocio TEXT,
    logo_url TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    direccion_id INT,
    latitud DECIMAL(10,7),
    longitud DECIMAL(10,7),
    FOREIGN KEY (id_proveedor) REFERENCES usuarios(id),
    FOREIGN KEY (direccion_id) REFERENCES direcciones(id)
);

-- =========================
-- TABLA CATEGORIAS
-- =========================
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre_categoria VARCHAR(120) NOT NULL,
    descripcion TEXT
);

-- =========================
-- TABLA PRODUCTOS
-- =========================
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    id_negocio INT NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock_actual INT DEFAULT 0,
    sku VARCHAR(100) UNIQUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_caducidad DATE,
    embedding_ia TEXT,
    FOREIGN KEY (id_negocio) REFERENCES negocios(id)
);

-- =========================
-- RELACION PRODUCTO-CATEGORIA
-- =========================
CREATE TABLE producto_categoria (
    id_producto INT NOT NULL,
    id_categoria INT NOT NULL,
    PRIMARY KEY (id_producto, id_categoria),
    FOREIGN KEY (id_producto) REFERENCES productos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id) ON DELETE CASCADE
);

-- =========================
-- TABLA SERVICIOS
-- =========================
CREATE TABLE servicios (
    id SERIAL PRIMARY KEY,
    id_negocio INT NOT NULL,
    nombre VARCHAR(150),
    descripcion TEXT,
    precio_base DECIMAL(10,2),
    duracion_minutos INT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_negocio) REFERENCES negocios(id)
);

-- =========================
-- TABLA AGENDA SERVICIOS
-- =========================
CREATE TABLE agenda_servicios (
    id SERIAL PRIMARY KEY,
    id_servicio INT NOT NULL,
    fecha_hora_inicio TIMESTAMP,
    fecha_hora_fin TIMESTAMP,
    estado VARCHAR(50),
    id_usuario_cliente INT,
    FOREIGN KEY (id_servicio) REFERENCES servicios(id),
    FOREIGN KEY (id_usuario_cliente) REFERENCES usuarios(id)
);

-- =========================
-- TABLA CARRITO
-- =========================
CREATE TABLE carrito (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- =========================
-- TABLA CARRITO ITEMS
-- =========================
CREATE TABLE carrito_items (
    id_carrito INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    id_servicio INT,
    id_agenda_seleccionada INT,
    PRIMARY KEY (id_carrito, id_producto),
    FOREIGN KEY (id_carrito) REFERENCES carrito(id) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id),
    FOREIGN KEY (id_servicio) REFERENCES servicios(id),
    FOREIGN KEY (id_agenda_seleccionada) REFERENCES agenda_servicios(id)
);

-- =========================
-- TABLA PEDIDOS
-- =========================
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    total DECIMAL(10,2),
    estado_pedido VARCHAR(50),
    direccion_envio_snapshot JSONB,
    metodo_pago_snapshot JSONB,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- =========================
-- DETALLE PEDIDO
-- =========================
CREATE TABLE detalle_pedido (
    id SERIAL PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario_historico DECIMAL(10,2),
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id)
);

-- =========================
-- METODOS DE PAGO
-- =========================
CREATE TABLE metodos_pago (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    proveedor_pago VARCHAR(100),
    token_pasarela TEXT,
    ultimos_cuatro VARCHAR(4),
    fecha_expiracion DATE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- =========================
-- DESCUENTOS
-- =========================
CREATE TABLE descuentos (
    id SERIAL PRIMARY KEY,
    codigo_cupon VARCHAR(50) UNIQUE,
    porcentaje_descuento DECIMAL(5,2),
    fecha_inicio TIMESTAMP,
    fecha_fin TIMESTAMP
);

-- =========================
-- RELACION PRODUCTO DESCUENTO
-- =========================
CREATE TABLE producto_descuento (
    id_producto INT NOT NULL,
    id_descuento INT NOT NULL,
    PRIMARY KEY (id_producto, id_descuento),
    FOREIGN KEY (id_producto) REFERENCES productos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_descuento) REFERENCES descuentos(id) ON DELETE CASCADE
);