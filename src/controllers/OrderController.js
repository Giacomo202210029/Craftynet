const sqlRequester = require('../services/requester');

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtener todos los pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Error interno del servidor
 */
const getAllOrders = async (req, res) => {
    const orders = await sqlRequester.get('SELECT * FROM pedidos');
    if (!orders) return res.status(500).json({ message: 'Error al obtener pedidos' });
    res.status(200).json(orders);
};

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtener un pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Pedido no encontrado
 */
const getOrderById = async (req, res) => {
    const { id } = req.params;
    const order = await sqlRequester.get('SELECT * FROM pedidos WHERE id = ?', [id]);
    if (!order || order.length === 0) return res.status(404).json({ message: 'Pedido no encontrado' });
    res.status(200).json(order[0]);
};

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario_id
 *               - total
 *               - estado
 *             properties:
 *               usuario_id:
 *                 type: integer
 *                 example: 2
 *               total:
 *                 type: number
 *                 format: float
 *                 example: 79.90
 *               estado:
 *                 type: string
 *                 example: pagado
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 5
 *                 usuario_id:
 *                   type: integer
 *                   example: 2
 *                 total:
 *                   type: number
 *                   format: float
 *                   example: 79.90
 *                 estado:
 *                   type: string
 *                   example: pagado
 *       500:
 *         description: Error al crear el pedido
 */
const createOrder = async (req, res) => {
    const { usuario_id, total, estado } = req.body;

    const result = await sqlRequester.post(
        'INSERT INTO pedidos (usuario_id, total, estado) OUTPUT INSERTED.id VALUES (?, ?, ?)',
        [usuario_id, total, estado]
    );

    if (!result) return res.status(500).json({ message: 'Error al crear pedido' });

    const insertedId = result.recordset[0].id;

    res.status(201).json({
        id: insertedId,
        usuario_id,
        total,
        estado
    });
};


module.exports = {
    getAllOrders,
    getOrderById,
    createOrder
}
