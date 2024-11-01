const express = require('express');
const app = express();
const port = 4009;
const cors = require('cors');
const db = require('./models');  // Cambiado para importar todo el objeto db

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rutas
const routes = require('./routers');

// Usar rutas
app.use('/api', routes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API Escuela funcionando correctamente' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Algo salió mal!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Probar la conexión a la base de datos
db.sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
    // Sincronizar los modelos con la base de datos
    return db.sequelize.sync({ force: false });
  })
  .then(() => {
    // Iniciar el servidor después de sincronizar
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });

module.exports = app;