//Declaracion constantes de trabajo
const express = require('express');
const morgan = require('morgan');
const cros = require('cors');
const path = require('path');
const { initDatabase } = require('./src/database');

//Asigna constantes de trabajo
initDatabase();
const app = express();

//Asignacion de de configuraciones
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.json());
app.use(cros({origin: 'http://localhost:4200'}));

//Definicion de rutas
app.use('/api/estudiantes', require('./src/routes/estudiantes.routes'));

// Servir archivos estáticos del frontend 
const frontendPath = path.join(__dirname, '../../'); 
app.use(express.static(frontendPath)); 
// Ruta para el frontend 
app.get('*', (req, res) => { res.sendFile(path.join(frontendPath, 'index.html')); });

//Inicializacion del servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto ' + app.get('port'));
});