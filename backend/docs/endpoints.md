# Documentacion de Endpoints

Base URL: `http://localhost:5000/api`

La API utiliza `body-parser` para parsear requests JSON/urlencoded, `mongoose` para la persistencia en MongoDB Atlas, `bcryptjs` para el manejo de passwords y `jsonwebtoken` para el login.

## Coleccion Postman

La coleccion incluida en el proyecto se encuentra en:

- [docs/postman/Fresco-PC-Custom.postman_collection.json](/C:/Users/delfi/Desktop/Fullstack/TP-Fullstack-Fresco/docs/postman/Fresco-PC-Custom.postman_collection.json)

Requests incluidas en la coleccion:

- `Auth - Login`
- `Productos - Listar`
- `Usuarios - Listar`
- `Usuarios - Crear`
- `Usuarios - Eliminar`
- `Armados - Obtener armado-1`
- `Armados - Crear`
- `Armados - Eliminar`
- `Carritos - Obtener carrito-1`
- `Carritos - Eliminar`
- `Carritos - Agregar Item`
- `Pedidos - Crear`
- `Pedidos - Listar`

## Auth

### POST `/auth/login`
Permite iniciar sesion con email y password.

Ejemplo:

```json
{
  "email": "lucia@fresco.dev",
  "password": "Fullstack123"
}
```

## Productos

### GET `/productos`
Lista todos los productos del catalogo.

Filtros opcionales:

- `categoria`
- `marca`

Ejemplos:

```text
GET /api/productos
GET /api/productos?categoria=cpu
GET /api/productos?marca=AMD
```

### POST `/productos`
Crea un producto nuevo.

Ejemplo:

```json
{
  "nombre": "Fuente 850W",
  "categoria": "psu",
  "marca": "MSI",
  "precio": 210000,
  "stock": 6,
  "consumoWatts": 0,
  "potenciaSalida": 850
}
```

### PUT `/productos/:id`
Actualiza uno o mas campos de un producto.

Ejemplo:

```json
{
  "precio": 540000,
  "stock": 7
}
```

### DELETE `/productos/:id`
Elimina un producto del catalogo.

Ejemplo:

```text
DELETE /api/productos/producto-8
```

## Usuarios

### GET `/usuarios`
Lista usuarios.

### POST `/usuarios`
Crea un usuario nuevo.

Ejemplo:

```json
{
  "nombre": "Sofia Torres",
  "email": "sofia@fresco.dev",
  "password": "Fullstack123",
  "presupuestoMaximo": 2100000,
  "perfil": "edicion"
}
```

### PUT `/usuarios/:id`
Actualiza datos del usuario.

Ejemplo:

```json
{
  "presupuestoMaximo": 2700000,
  "perfil": "gaming-premium"
}
```

### DELETE `/usuarios/:id`
Elimina un usuario por id.

Ejemplo:

```text
DELETE /api/usuarios/usuario-2
```

## Armados

### GET `/armados/:id`
Obtiene un armado custom por id.

Ejemplo:

```text
GET /api/armados/armado-1
```

### POST `/armados`
Crea un armado custom nuevo.

Ejemplo:

```json
{
  "nombre": "PC Streaming AM5",
  "usuarioId": "usuario-1",
  "componentes": [
    "producto-1",
    "producto-2",
    "producto-3",
    "producto-4",
    "producto-5",
    "producto-6",
    "producto-7",
    "producto-8"
  ],
  "estado": "borrador"
}
```

### PUT `/armados/:id`
Actualiza un armado custom.

Ejemplo:

```json
{
  "estado": "listo-para-compra"
}
```

### DELETE `/armados/:id`
Elimina un armado custom por id.

Ejemplo:

```text
DELETE /api/armados/armado-1
```

## Carritos

### GET `/carritos/:id`
Obtiene un carrito por id.

Ejemplo:

```text
GET /api/carritos/carrito-1
```

### POST `/carritos/:id/items`
Agrega un item al carrito y recalcula el total.

Ejemplo:

```json
{
  "productoId": "producto-5",
  "cantidad": 1
}
```

### DELETE `/carritos/:id`
Elimina un carrito por id.

Ejemplo:

```text
DELETE /api/carritos/carrito-1
```

## Pedidos

### POST `/pedidos`
Genera un pedido a partir de un carrito.

Ejemplo:

```json
{
  "usuarioId": "usuario-1",
  "carritoId": "carrito-1"
}
```

### GET `/pedidos`
Lista pedidos creados.

## Respuestas de error

- `400`: validacion de datos
- `401`: credenciales invalidas
- `404`: recurso no encontrado
- `500`: error inesperado
