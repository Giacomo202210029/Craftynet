const sqlRequester = require('../services/requester');

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error al obtener productos
 */
const getAllProducts = async (req, res) => {
    const products = await sqlRequester.get('SELECT * FROM productos');
    if (!products) return res.status(500).json({ message: 'Error al obtener productos' });
    res.status(200).json(products);
};

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estudiante_id
 *               - categoria_id
 *               - nombre
 *               - descripcion
 *               - precio
 *               - stock
 *             properties:
 *               estudiante_id:
 *                 type: integer
 *                 example: 1
 *               categoria_id:
 *                 type: integer
 *                 example: 2
 *               nombre:
 *                 type: string
 *                 example: Cuadro Acrílico
 *               descripcion:
 *                 type: string
 *                 example: Pintura hecha a mano de 40x40cm
 *               precio:
 *                 type: number
 *                 format: float
 *                 example: 150.00
 *               stock:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 estudiante_id:
 *                   type: integer
 *                   example: 1
 *                 categoria_id:
 *                   type: integer
 *                   example: 2
 *                 nombre:
 *                   type: string
 *                   example: Cuadro Acrílico
 *                 descripcion:
 *                   type: string
 *                   example: Pintura hecha a mano de 40x40cm
 *                 precio:
 *                   type: number
 *                   format: float
 *                   example: 150.00
 *                 stock:
 *                   type: integer
 *                   example: 5
 *       500:
 *         description: Error al crear producto
 */
const createProduct = async (req, res) => {
    const { estudiante_id, categoria_id, nombre, descripcion, precio, stock } = req.body;

    const result = await sqlRequester.post(
        'INSERT INTO productos (estudiante_id, categoria_id, nombre, descripcion, precio, stock) OUTPUT INSERTED.id VALUES (?, ?, ?, ?, ?, ?)',
        [estudiante_id, categoria_id, nombre, descripcion, precio, stock]
    );

    if (!result) return res.status(500).json({ message: 'Error al crear producto' });

    const insertedId = result.recordset[0].id;

    res.status(201).json({
        id: insertedId,
        estudiante_id,
        categoria_id,
        nombre,
        descripcion,
        precio,
        stock
    });
};


module.exports = {
    getAllProducts,
    createProduct
}