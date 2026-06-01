const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const { PORT, MONGODB_URI } = require('./app/config/config');
const app = require('./app/app');
const { connectDatabase } = require('./app/config/database');
const { seedIfNeeded } = require('./app/data/seedDatabase');

async function startServer() {
  try {
    await connectDatabase(MONGODB_URI);
    await seedIfNeeded();

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error.message);
    process.exit(1);
  }
}

startServer();
