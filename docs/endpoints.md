# Documentacion de Endpoints

Base URL: `http://localhost:5000/api`

La API utiliza `body-parser` para parsear requests JSON/urlencoded y `mongoose` para la persistencia en MongoDB.

## Auth

### POST `/auth/login`
Permite iniciar sesion con email y password.

```json
{
  "email": "lucia@fresco.dev",
  "password": "Fullstack123"
}
```

## Productos

### GET `/productos`
Lista todos los componentes. Acepta filtros opcionales por `categoria` y `marca`.

### GET `/productos/:id`
Obtiene un producto por id.

### POST `/productos`
Crea un producto nuevo.

Ejemplo:

```json
{
  "nombre": "MSI MAG A850GL",
  "categoria": "psu",
  "marca": "MSI",
  "precio": 210000,
  "stock": 6,
  "potenciaSalida": 850
}
```

### PUT `/productos/:id`
Actualiza uno o mas campos de un producto.

### DELETE `/productos/:id`
Elimina un producto del catalogo.

## Usuarios

### GET `/usuarios`
Lista usuarios.

### GET `/usuarios/:id`
Obtiene un usuario por id.

### POST `/usuarios`
Crea un usuario.

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

### DELETE `/usuarios/:id`
Elimina un usuario por id.

## Armados

### GET `/armados`
Lista armados custom junto con detalle de componentes, total y validaciones basicas.

### GET `/armados/:id`
Obtiene un armado por id.

### POST `/armados`
Crea un armado nuevo.

```json
{
  "nombre": "PC Streaming AM5",
  "usuarioId": "usuario-1",
  "componentes": ["producto-1", "producto-2", "producto-3", "producto-4", "producto-5", "producto-6", "producto-7", "producto-8"]
}
```

### PUT `/armados/:id`
Permite cambiar nombre, usuario, componentes o estado.

### DELETE `/armados/:id`
Elimina un armado custom por id.

## Carritos

### GET `/carritos`
Lista carritos con total calculado y armado asociado si existe.

### GET `/carritos/:id`
Obtiene un carrito por id.

### POST `/carritos`
Crea un carrito.

```json
{
  "usuarioId": "usuario-1",
  "buildId": "armado-1"
}
```

### POST `/carritos/:id/items`
Agrega items al carrito y valida stock.

```json
{
  "productoId": "producto-5",
  "cantidad": 1
}
```

### DELETE `/carritos/:id`
Elimina un carrito por id.

## Pedidos

### GET `/pedidos`
Lista pedidos creados.

### GET `/pedidos/:id`
Obtiene un pedido por id.

### POST `/pedidos`
Genera un pedido a partir de un carrito.

```json
{
  "usuarioId": "usuario-1",
  "carritoId": "carrito-1"
}
```

## Respuestas de error

- `400`: validacion de datos
- `404`: recurso no encontrado
- `500`: error inesperado
