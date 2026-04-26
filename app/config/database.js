const mongoose = require('mongoose');

async function connectDatabase(uri) {
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  console.log('Conexion a MongoDB establecida');
}

module.exports = {
  connectDatabase,
  mongoose,
};
