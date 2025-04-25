const sqlRequester = require('../services/requester');

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Obtener todos los estudiantes
 *     tags: [Estudiantes]
 *     responses:
 *       200:
 *         description: Lista de estudiantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       500:
 *         description: Error interno del servidor
 */
const getAllStudents = async (req, res) => {
    const students = await sqlRequester.get('SELECT * FROM estudiantes');
    if (!students) return res.status(500).json({ message: 'Error al obtener estudiantes' });
    res.status(200).json(students);
};

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Obtener un estudiante por ID
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estudiante
 *     responses:
 *       200:
 *         description: Estudiante encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Estudiante no encontrado
 */
const getStudentById = async (req, res) => {
    const { id } = req.params;
    const student = await sqlRequester.get('SELECT * FROM estudiantes WHERE id = ?', [id]);
    if (!student || student.length === 0) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.status(200).json(student[0]);
};

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Crear un nuevo estudiante
 *     tags: [Estudiantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario_id
 *               - carrera
 *               - universidad
 *               - email
 *               - dni
 *               - bio
 *             properties:
 *               usuario_id:
 *                 type: integer
 *                 description: ID del usuario asociado al estudiante
 *               carrera:
 *                 type: string
 *                 description: Carrera del estudiante
 *               universidad:
 *                 type: string
 *                 description: Universidad del estudiante
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del estudiante
 *               dni:
 *                 type: string
 *                 description: Documento Nacional de Identidad del estudiante
 *               bio:
 *                 type: string
 *                 description: Biografía del estudiante
 *     responses:
 *       201:
 *         description: Estudiante creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único del estudiante
 *                 usuario_id:
 *                   type: integer
 *                   description: ID del usuario asociado al estudiante
 *                 carrera:
 *                   type: string
 *                   description: Carrera del estudiante
 *                 universidad:
 *                   type: string
 *                   description: Universidad del estudiante
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Correo electrónico del estudiante
 *                 dni:
 *                   type: string
 *                   description: Documento Nacional de Identidad del estudiante
 *                 bio:
 *                   type: string
 *                   description: Biografía del estudiante
 *       500:
 *         description: Error al crear estudiante
 */
const createStudent = async (req, res) => {
    const { carrera, usuario_id, universidad, email, dni, bio } = req.body;

    try {
        const existing = await sqlRequester.get(
            'SELECT * FROM estudiantes WHERE usuario_id = ? OR dni = ? OR email = ?',
            [usuario_id, dni, email]
        );

        if (existing && existing.length > 0) {
            return res.status(400).json({ message: 'Ya existe un estudiante con ese usuario, DNI o correo.' });
        }

        const result = await sqlRequester.post(
            'INSERT INTO estudiantes (carrera, usuario_id, universidad, email, dni, bio) OUTPUT INSERTED.id VALUES (?, ?, ?, ?, ?, ?)',
            [carrera, usuario_id, universidad, email, dni, bio]
        );

        if (!result) {
            return res.status(500).json({ message: 'Error al crear estudiante' });
        }

        const insertedId = result.recordset[0].id;

        res.status(201).json({
            id: insertedId,
            carrera,
            usuario_id,
            universidad,
            email,
            dni,
            bio
        });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};


module.exports = {
    getAllStudents,
    getStudentById,
    createStudent
}


