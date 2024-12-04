const { error } = require('console');
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db/bd.json');

class Estudiantes {

    constructor(
        {
            id_estudiante, 
            primer_nombre_estudiante, 
            segundo_nombre_estudiante, 
            primer_apellido_estudiante, 
            segundo_apellido_estudiante,
            correo_estudiante,
            telefono_estudiante,
            id_programa_estudiante,
            id_grupo_estudiante
        }
    ) 
    {
        this.id_estudiante = id_estudiante;
        this.primer_nombre_estudiante = primer_nombre_estudiante || null;
        this.segundo_nombre_estudiante = segundo_nombre_estudiante || null;
        this.primer_apellido_estudiante = primer_apellido_estudiante || null;
        this.segundo_apellido_estudiante = segundo_apellido_estudiante || null;
        this.correo_estudiante = correo_estudiante || null;
        this.telefono_estudiante = telefono_estudiante || null;
        this.id_programa_estudiante = id_programa_estudiante || null;
        this.id_grupo_estudiante = id_grupo_estudiante || null;
    }

    /**
     * Obtener todos los estudiantes
     * 
     * devuelve todos los estudiantes de la base de datos
     */
    static getAll() {
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        return data.estudiantes.map(estudiante => new Estudiantes(estudiante));
    }

    /**
     * Obtener estudiante x Id
     * 
     * retorna el estudiante con el id especificado
     */
    static getById(id) {
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        const estudiante = data.estudiantes.find(estudiante => estudiante.id_estudiante === id);
        return estudiante ? new Estudiantes(estudiante) : null;
    }

    /**
     * Crear estudiante
     * 
     * Crea o guarda los nuevos estudiantes
     */
    save() {
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));    
        const validaDuplicado = data.estudiantes.find(estudiante => estudiante.correo_estudiante === this.correo_estudiante);
        if (validaDuplicado) {
            return { error: 'Estudiante ya existe', estudiante: validaDuplicado };
        }
        const lastEstudiante = data.estudiantes[data.estudiantes.length - 1];
        this.id_estudiante = lastEstudiante ? lastEstudiante.id_estudiante + 1 : 1;
        const index = data.estudiantes.findIndex(estudiante => estudiante.id_estudiante === this.id_estudiante);
        if (index !== -1) {
            data.estudiantes[index] = this;
        } else {
            data.estudiantes.push(this);
        }
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    }

    /**
     * Actualizar estudiante
     * 
     * actualiza los datos del estudiante con el id especificado
     */
    static updateById(id, estudiante) {
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        const index = data.estudiantes.findIndex(estudiante => estudiante.id_estudiante === id);
        if (index !== -1) {
            data.estudiantes[index] = estudiante;
            fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
            return true;
        }
        return false;
    }

    /**
     * Eliminar estudiante
     *
     * elimina el estudiante con el id especificado
     */
    static deleteById(id) {
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        data.estudiantes = data.estudiantes.filter(estudiante => estudiante.id_estudiante !== id);
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    }

    /**
     * Obtener estudiantes por grupo
     *
     * devuelve todos los estudiantes del grupo especificado
     */
    static getByGroup(id_grupo) {
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        const estudiantes = data.estudiantes.filter(estudiante => estudiante.id_grupo_estudiante === id_grupo);
        return estudiantes.map(estudiante => new Estudiantes(estudiante));
    }

    /**
     * Obtener estudiantes por programa
     *
     * devuelve todos los estudiantes del programa especificado
     */
    static getByProgram(id_programa) {
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        const estudiantes = data.estudiantes.filter(estudiante => estudiante.id_programa_estudiante === id_programa);
        return estudiantes.map(estudiante => new Estudiantes(estudiante));
    }
}

//Exporta la clase
module.exports = Estudiantes;