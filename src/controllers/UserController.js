const sqlRequester = require('../services/requester');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error al obtener usuarios
 */
const getAllUsers = async (req, res) => {
    const users = await sqlRequester.get('SELECT * FROM usuarios');
    if (!users) return res.status(500).json({ message: 'Error al obtener usuarios' });
    res.status(200).json(users);
};

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - dni
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: jgonzales
 *               email:
 *                 type: string
 *                 example: jgonzales@email.com
 *               dni:
 *                 type: string
 *                 example: 12345678
 *               password:
 *                 type: string
 *                 example: secreto123
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: jgonzales
 *                 email:
 *                   type: string
 *                   example: jgonzales@email.com
 *                 dni:
 *                   type: string
 *                   example: 12345678
 *                 password:
 *                   type: string
 *                   example: secreto123
 *       400:
 *         description: Usuario ya existe o datos inválidos
 *       500:
 *         description: Error al crear usuario
 */
const createUser = async (req, res) => {
    const { username, email, dni, password } = req.body;

    if (!username || !email || !dni || !password) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const result = await sqlRequester.post(
        'INSERT INTO usuarios (username, email, dni, password) OUTPUT INSERTED.id VALUES (?, ?, ?, ?)',
        [username, email, dni, password]
    );

    if (!result) return res.status(500).json({ message: 'Error al crear usuario' });

    const insertedId = result.recordset[0].id;

    res.status(201).json({
        id: insertedId,
        username,
        email,
        dni,
        password
    });
};


module.exports = {
    createUser,
    getAllUsers
};
