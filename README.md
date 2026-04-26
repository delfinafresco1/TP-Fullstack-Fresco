# TP Fullstack - Primera Entrega

## Alumna

- Delfina Fresco

## Tema

Tienda de compra de productos de informatica para armado de PCs custom.

## Descripcion

Este repositorio contiene el desarrollo del backend correspondiente a la primera entrega del trabajo practico de Fullstack.  
La solucion fue implementada como una API REST en Node.js con Express, utilizando una arquitectura modular por capas para mantener los modulos aislados y encapsulados.

## Tecnologias utilizadas

- Node.js
- Express
- body-parser
- MongoDB Atlas
- Mongoose

## Arquitectura

La aplicacion se organiza en los siguientes modulos:

- `routes`: definicion de endpoints
- `controllers`: manejo de requests y responses
- `services`: logica de negocio
- `models`: esquemas y acceso a datos con Mongoose
- `config`: configuracion general y conexion a base de datos
- `data`: datos de prueba iniciales

## Endpoints implementados

La documentacion detallada de endpoints se encuentra en:

- [docs/endpoints.md](/C:/Users/delfi/Desktop/Fullstack/TP-Fullstack-Fresco/docs/endpoints.md)

La API expone recursos para:

- `productos`
- `usuarios`
- `armados`
- `carritos`
- `pedidos`

## Documentacion adicional

- Resumen de datos de prueba: [docs/test-data.md](/C:/Users/delfi/Desktop/Fullstack/TP-Fullstack-Fresco/docs/test-data.md)
- Coleccion Postman: [docs/postman/Fresco-PC-Custom.postman_collection.json](/C:/Users/delfi/Desktop/Fullstack/TP-Fullstack-Fresco/docs/postman/Fresco-PC-Custom.postman_collection.json)

## Ejecucion local

```bash
npm install
npm start
```

Servidor local:

```text
http://localhost:5000
```

## Base de datos

La aplicacion utiliza MongoDB Atlas mediante una variable de entorno `MONGODB_URI`.  
Al iniciar el servidor, si la base se encuentra vacia, se insertan automaticamente los datos de prueba definidos para la demostracion.
