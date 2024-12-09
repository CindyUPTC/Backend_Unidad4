const request = require('supertest');
const express = require('express');
const router = require('../src/routes/estudiantes.routes');

const app = express();
app.use(express.json());
app.use('/estudiantes', router);

describe('GET /estudiantes/:id', () => {
  it('Debería devolver un estudiante por ID especificado', async () => {
    const id_estudiante = 2; // Este ID debe existir en la bd
    const response = await request(app)
      .get(`/estudiantes/${id_estudiante}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('id_estudiante', id_estudiante);
    expect(response.body).toHaveProperty('primer_nombre_estudiante');
  });

 /* it('Debería devolver un error 404 si el estudiante no existe', async () => {
    const id_estudiante = 9999; // ID que no existe
    const response = await request(app)
      .get(`/estudiantes/${id_estudiante}`)
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body).toHaveProperty('error', 'Estudiante no encontrado');
  });*/
});