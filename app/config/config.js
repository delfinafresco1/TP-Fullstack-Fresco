module.exports = {
  PORT: 5000,
  API_PREFIX: '/api',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fresco_pc_custom',
  JWT_SECRET: process.env.JWT_SECRET || 'tp-fullstack-fresco-secret',
};
