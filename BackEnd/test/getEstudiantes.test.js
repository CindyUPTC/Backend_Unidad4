const request = require('supertest');
const express = require('express');
const router = require('../src/routes/estudiantes.routes');

const app = express();
app.use(express.json()); // Middleware necesario para procesar JSON
app.use('/estudiantes', router); // Monta las rutas bajo el prefijo '/estudiantes'

describe('GET /estudiantes/', () => {
    it('Debería devolver una lista de estudiantes', async () => {
      const response = await request(app)
        .get('/estudiantes/')
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  