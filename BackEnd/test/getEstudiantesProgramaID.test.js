const request = require('supertest');
const express = require('express');
const router = require('../src/routes/estudiantes.routes');
const app = express();

app.use(express.json()); // Middleware necesario para procesar JSON
app.use('/estudiantes', router); // Monta las rutas bajo el prefijo '/estudiantes'

describe('GET /estudiantes/programa/:id_programa', () => {
  it('Debería devolver una lista de estudiantes por programa especificado', async () => {
    const id_programa = "tecnologia_regencia_farmacia";
    const response = await request(app)
      .get(`/estudiantes/programa/${id_programa}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

