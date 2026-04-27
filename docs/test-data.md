# Resumen de Datos de Prueba

Los siguientes datos se insertan automaticamente en MongoDB al iniciar la app si la base esta vacia.

## Productos semilla

- `producto-1`: Procesador Gamer AMD (`cpu`)
- `producto-2`: Placa Madre AM5 ASUS (`motherboard`)
- `producto-3`: Placa de Video RTX 4070 (`gpu`)
- `producto-4`: Memoria RAM 32GB DDR5 (`ram`)
- `producto-5`: Disco SSD 1TB (`storage`)
- `producto-6`: Fuente 750W (`psu`)
- `producto-7`: Gabinete Mid Tower (`case`)
- `producto-8`: Cooler para CPU (`cooler`)

## Usuarios semilla

- `usuario-1`: Lucia Fernandez, perfil `gaming`
- `usuario-2`: Martin Gomez, perfil `streaming`

## Credenciales de demo

- `lucia@fresco.dev` / `Fullstack123`
- `martin@fresco.dev` / `Fullstack123`

## Armado semilla

- `armado-1`: configuracion completa asociada a `usuario-1`

## Carrito semilla

- `carrito-1`: carrito asociado a `usuario-1` con GPU y SSD

## Pedido semilla

- `pedido-1`: pedido confirmado asociado a `usuario-2`

## Flujo sugerido para demo

1. `GET /api/productos`
2. `POST /api/usuarios`
3. `POST /api/armados`
4. `POST /api/carritos`
5. `POST /api/carritos/:id/items`
6. `POST /api/pedidos`
