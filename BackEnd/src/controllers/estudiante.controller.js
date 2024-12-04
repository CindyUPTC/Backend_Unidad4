//Declaracion constantes de trabajo
const Estudiante = require('../models/estudiantes.model');
const estudianteCtrl = {};

//Define los metodos de trabajo

/**
 * Obtener todos los estudiantes
 * 
 * devuelve todos los estudiantes de la base de datos
 */
estudianteCtrl.getEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.getAll();
        if (!estudiantes) {
            return res.status(404).json({ error: 'No hay estudiantes' });
        }
        res.status(200).json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los estudiantes' });
    }
};

/**
 * Crear estudiante
 *
 * Crea o guarda los nuevos estudiantes
 */
estudianteCtrl.createEstudiante = async (req, res) => {
    try {
        const estudiante = new Estudiante(req.body);
        const result = estudiante.save();
        if (result.error) {
            return res.status(400).json({ error: result.error, estudiante: result.estudiante });
        }
        res.status(201).json({ message: 'Estudiante creado exitosamente' });      
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el estudiante'});
    }
};


/**
 * Obtener estudiante x Id
 *
 * retorna el estudiante con el id especificado
 */
estudianteCtrl.getEstudianteById = async (req, res) => {
    try {
        const { id } = req.params;
        const estudiante = Estudiante.getById(Number(id));
        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.json(estudiante);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el estudiante' });
    }
};

/**
 * Actualizar estudiante
 *
 * actualiza los datos del estudiante con el id especificado
 */
estudianteCtrl.updateEstudiante = async (req, res) => {
    try {
        const { id } = req.params;
        const estudiante = new Estudiante(req.body);
        estudiante.id_estudiante = Number(id);       
        const result = Estudiante.updateById(Number(id), estudiante);
        console.log(result);
        
        if (!result) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.status(200).json({ message: 'Estudiante actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estudiante' });
    }
};

/**
 * Eliminar estudiante
 *
 * elimina el estudiante con el id especificado
 */
estudianteCtrl.deleteEstudiante = async (req, res) => {
    try {
        const { id } = req.params;
        Estudiante.deleteById(Number(id));
        res.status(200).json({ message: 'Estudiante eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el estudiante' });
    }
};

/**
 * Obtener estudiantes por grupo
 *
 * devuelve todos los estudiantes del grupo especificado
 */
estudianteCtrl.getEstudiantesByGroup = async (req, res) => {
    try {
        const { id_grupo } = req.params;
        const estudiantes = Estudiante.getByGroup(id_grupo);
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los estudiantes por grupo' });
    }
};

/**
 * Obtener estudiantes por programa
 *
 * devuelve todos los estudiantes del programa especificado
 */
estudianteCtrl.getEstudiantesByProgram = async (req, res) => {
    try {
        const { programa } = req.params;
        const estudiantes = Estudiante.getByProgram(programa);
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los estudiantes por programa' });
    }
};

//Exporta el modulo
module.exports = estudianteCtrl;