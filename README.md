# TP Fullstack - Fresco PC Custom

## Alumna

- Delfina Fresco

## Tema

Tienda de compra de productos de informatica para armado de PCs custom.

## Descripcion

Este repositorio contiene una tienda de componentes para armado de PCs custom, con frontend estatico y backend API REST.
La solucion fue implementada en Node.js con Express, utilizando una arquitectura modular por capas para mantener los modulos aislados y encapsulados.

## Tecnologias utilizadas

- Node.js
- Express
- body-parser
- MongoDB Atlas
- Mongoose
- HTML
- CSS
- JavaScript

## Arquitectura

La aplicacion se organiza en dos carpetas principales:

- `frontend`: pantallas de catalogo, armador, carrito, login y administracion
- `backend`: API REST, conexion a base de datos, modelos y documentacion

Dentro del backend se usan los siguientes modulos:

- `routes`: definicion de endpoints
- `controllers`: manejo de requests y responses
- `services`: logica de negocio
- `models`: esquemas y acceso a datos con Mongoose
- `config`: configuracion general y conexion a base de datos
- `data`: datos de prueba iniciales

## Endpoints implementados

La documentacion detallada de endpoints se encuentra en:

- [backend/docs/endpoints.md](backend/docs/endpoints.md)

La API expone recursos para:

- `auth`
- `productos`
- `usuarios`
- `armados`
- `carritos`
- `pedidos`

## Documentacion adicional

- Resumen de datos de prueba: [backend/docs/test-data.md](backend/docs/test-data.md)
- Coleccion Postman: [backend/docs/postman/Fresco-PC-Custom.postman_collection.json](backend/docs/postman/Fresco-PC-Custom.postman_collection.json)

## Uso de la coleccion Postman

Para probar la API con Postman:

1. Abrir Postman.
2. Seleccionar `Import`.
3. Cargar el archivo `backend/docs/postman/Fresco-PC-Custom.postman_collection.json`.
4. Verificar que la variable `baseUrl` tenga el valor `localhost:5000`.
5. Ejecutar las requests de la coleccion con el backend levantado mediante `npm start`.

La coleccion ya incluye ejemplos de body para las requests `POST` y `PUT`.

## Ejecucion local

```bash
npm install
npm start
```

Servidor local:

```text
http://localhost:5000
```

El backend sirve tambien el frontend desde la misma URL. Al abrir `http://localhost:5000` se muestra la tienda.

Para probar solo el frontend con datos simulados:

```bash
npm run preview
```

Preview local:

```text
http://localhost:5177
```

## Base de datos

La aplicacion utiliza MongoDB Atlas mediante una variable de entorno `MONGODB_URI`.  
Al iniciar el servidor, si la base se encuentra vacia, se insertan automaticamente los datos de prueba definidos para la demostracion.
