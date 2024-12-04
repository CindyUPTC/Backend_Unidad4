//Declaracion constantes de trabajo
const express = require('express');
const router = express.Router();
const estudianteCtrl = require('../controllers/estudiante.controller');

//Se definen las rutas

/**
 * Obtener todos los estudiantes
 * 
 * devuelve todos los estudiantes de la base de datos
 */
router.get('/', estudianteCtrl.getEstudiantes);

/**
 * Crear estudiante
 *
 * Crea o guarda los nuevos estudiantes
 */
router.post('/', estudianteCtrl.createEstudiante);

/**
 * Obtener estudiante x Id
 *
 * retorna el estudiante con el id especificado
 */
router.get('/:id', estudianteCtrl.getEstudianteById);

/**
 * Actualizar estudiante
 *
 * actualiza los datos del estudiante con el id especificado
 */
router.put('/:id', estudianteCtrl.updateEstudiante);

/**
 * Eliminar estudiante
 *
 * elimina el estudiante con el id especificado
 */
router.delete('/:id', estudianteCtrl.deleteEstudiante);

/**
 * Obtener estudiantes por grupo
 *
 * devuelve todos los estudiantes del grupo especificado
 */
router.get('/grupo/:id_grupo', estudianteCtrl.getEstudiantesByGroup);

/**
 * Obtener estudiantes por programa
 *
 * devuelve todos los estudiantes del programa especificado
 */
router.get('/programa/:id_programa', estudianteCtrl.getEstudiantesByProgram);

//Exporta el modulo
module.exports = router;