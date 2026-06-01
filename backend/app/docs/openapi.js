module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Fresco PC Custom API',
    version: '1.0.0',
    description: 'API REST para una tienda de componentes y armado de PCs custom.',
  },
  servers: [{ url: 'http://localhost:5000' }],
  paths: {
    '/api/auth/login': {
      post: { summary: 'Iniciar sesion con email y password' },
    },
    '/api/productos': {
      get: {
        summary: 'Listar productos',
        parameters: [
          { name: 'categoria', in: 'query', schema: { type: 'string' } },
          { name: 'marca', in: 'query', schema: { type: 'string' } },
        ],
      },
      post: {
        summary: 'Crear producto',
      },
    },
    '/api/productos/{id}': {
      get: { summary: 'Obtener producto por id' },
      put: { summary: 'Actualizar producto' },
      delete: { summary: 'Eliminar producto' },
    },
    '/api/usuarios': {
      get: { summary: 'Listar usuarios' },
      post: { summary: 'Crear usuario' },
    },
    '/api/usuarios/{id}': {
      get: { summary: 'Obtener usuario por id' },
      put: { summary: 'Actualizar usuario' },
    },
    '/api/armados': {
      get: { summary: 'Listar armados custom' },
      post: { summary: 'Crear armado custom' },
    },
    '/api/armados/{id}': {
      get: { summary: 'Obtener armado por id' },
      put: { summary: 'Actualizar armado' },
    },
    '/api/carritos': {
      get: { summary: 'Listar carritos' },
      post: { summary: 'Crear carrito' },
    },
    '/api/carritos/{id}': {
      get: { summary: 'Obtener carrito por id' },
    },
    '/api/carritos/{id}/items': {
      post: { summary: 'Agregar item al carrito' },
    },
    '/api/pedidos': {
      get: { summary: 'Listar pedidos' },
      post: { summary: 'Generar pedido a partir de un carrito' },
    },
    '/api/pedidos/{id}': {
      get: { summary: 'Obtener pedido por id' },
    },
  },
};
