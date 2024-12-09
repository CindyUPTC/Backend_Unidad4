const request = require('supertest');
const express = require('express');
const router = require('../src/routes/estudiantes.routes');
const app = express();

app.use(express.json()); // Middleware necesario para procesar JSON
app.use('/estudiantes', router); // Monta las rutas bajo el prefijo '/estudiantes'

describe('POST /estudiantes', () => {
    it('Debería crear un nuevo estudiante y devolver un mensaje de exito', async () => {
        const newEstudiante = {
            primer_nombre_estudiante: 'Daniel',
            segundo_nombre_estudiante: 'Carlos',
            primer_apellido_estudiante: 'Pérez',
            segundo_apellido_estudiante: 'qsq',
            correo_estudiante: 'daniel.asasd@example.com',
            telefono_estudiante: '1234501529',
            id_programa_estudiante: 1,
            id_grupo_estudiante: 100
        };

        const response = await request(app)
            .post('/estudiantes')
            .send(newEstudiante)
            .expect('Content-Type', /json/)
            .expect(201); // Espera un código de estado 201 (Creado)

        expect(response.body.message).toBe('Estudiante creado exitosamente');
    });
});
