const request = require('supertest');
const express = require('express');
const router = require('../src/routes/estudiantes.routes');
const app = express();

app.use(express.json()); // Middleware necesario para procesar JSON
app.use('/estudiantes', router); // Monta las rutas bajo el prefijo '/estudiantes'

describe('PUT /estudiantes/:id', () => {
  it('Debería actualizar los datos de un estudiante con el id especificado', async () => {
    const id_estudiante = 3; //este id debe existir en la bd
    const updatedEstudiante = {
      primer_nombre_estudiante: 'Juanito Actualizado',
      segundo_nombre_estudiante: 'Carlos',
      primer_apellido_estudiante: 'Perez',
      segundo_apellido_estudiante: 'Lopez',
      correo_estudiante: 'juanito.perez@correo.com',
      telefono_estudiante: '1234567890',
      id_programa_estudiante: 1,
      id_grupo_estudiante: 2
    };
    const response = await request(app)
      .put(`/estudiantes/${id_estudiante}`)
      .send(updatedEstudiante)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toMatchObject(updatedEstudiante);
  });
});
