const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'db', 'bd.json');

function initDatabase() {
    if (!fs.existsSync(dbPath)) {
        const initialData = {
            estudiantes: []
        };
        fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
        console.log('Archivo bd.json creado con la estructura inicial');
    } else {
        const data = fs.readFileSync(dbPath, 'utf8');
        if (!data) {
            const initialData = {
                estudiantes: []
            };

            fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
            console.log('Archivo bd.json estaba vacío, se ha inicializado con la estructura inicial.');
        }
    }
}

//Exporta la funcion
module.exports = { initDatabase };