# Resumen de Datos de Prueba

Los siguientes datos se insertan automaticamente en MongoDB al iniciar la app si la base esta vacia.

## Productos semilla

- `prod-1`: AMD Ryzen 7 7800X3D (`cpu`)
- `prod-2`: ASUS TUF B650-PLUS WIFI (`motherboard`)
- `prod-3`: NVIDIA RTX 4070 Super (`gpu`)
- `prod-4`: Kingston Fury Beast 32GB (`ram`)
- `prod-5`: Samsung 980 Pro 1TB (`storage`)
- `prod-6`: Corsair RM750e 750W (`psu`)
- `prod-7`: NZXT H6 Flow (`case`)
- `prod-8`: DeepCool AK620 (`cooler`)

## Usuarios semilla

- `usr-1`: Lucia Fernandez, perfil `gaming`
- `usr-2`: Martin Gomez, perfil `streaming`

## Armado semilla

- `build-1`: configuracion AM5 completa asociada a `usr-1`

## Carrito semilla

- `cart-1`: carrito asociado a `usr-1` con GPU y SSD

## Pedido semilla

- `ord-1`: pedido confirmado asociado a `usr-2`

## Flujo sugerido para demo

1. `GET /api/productos`
2. `POST /api/usuarios`
3. `POST /api/armados`
4. `POST /api/carritos`
5. `POST /api/carritos/:id/items`
6. `POST /api/pedidos`
