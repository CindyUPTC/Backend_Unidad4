const request = require('supertest');
const express = require('express');
const router = require('../src/routes/estudiantes.routes');
const app = express();

app.use(express.json()); // Middleware necesario para procesar JSON
app.use('/estudiantes', router); // Monta las rutas bajo el prefijo '/estudiantes'

describe('DELETE /estudiantes/:id', () => {
    it('Debería eliminar un estudiante existente y devolver un mensaje de exito', async () => {
        const Id = 1; 

        const response = await request(app)
            .delete(`/estudiantes/${Id}`)
            .expect(200); 

        expect(response.body.message).toBe('Estudiante eliminado exitosamente');
    });

    /*it('Debería devolver un error 404 si el estudiante no existe', async () => {
        const response = await request(app)
            .delete('/estudiantes/99999') // ID que no existe
            .expect(404); // Espera un código de estado 404 (No encontrado)

        expect(response.body.error).toBe('Estudiante no encontrado');
    });*/
});
