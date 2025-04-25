const sqlRequester = require('../services/requester');

/**
 * @swagger
 * /api/order-details:
 *   get:
 *     summary: Obtener todos los detalles de pedido
 *     tags: [Detalle de Pedido]
 *     responses:
 *       200:
 *         description: Lista de detalles de pedido
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderDetail'
 *       500:
 *         description: Error al obtener detalles
 */
const getAllOrderDetails = async (req, res) => {
    const details = await sqlRequester.get('SELECT * FROM detalle_pedido');
    if (!details) return res.status(500).json({ message: 'Error al obtener detalles de pedido' });
    res.status(200).json(details);
};

/**
 * @swagger
 * /api/order-details/{id}:
 *   get:
 *     summary: Obtener un detalle de pedido por ID
 *     tags: [Detalle de Pedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle
 *     responses:
 *       200:
 *         description: Detalle encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetail'
 *       404:
 *         description: Detalle no encontrado
 */
const getOrderDetailById = async (req, res) => {
    const { id } = req.params;
    const detail = await sqlRequester.get('SELECT * FROM detalle_pedido WHERE id = ?', [id]);
    if (!detail || detail.length === 0) return res.status(404).json({ message: 'Detalle no encontrado' });
    res.status(200).json(detail[0]);
};

/**
 * @swagger
 * /api/order-details:
 *   post:
 *     summary: Crear un nuevo detalle de pedido
 *     tags: [Detalle de Pedido]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pedido_id
 *               - producto_id
 *               - cantidad
 *               - precio_unitario
 *             properties:
 *               pedido_id:
 *                 type: integer
 *                 example: 2
 *               producto_id:
 *                 type: integer
 *                 example: 2
 *               cantidad:
 *                 type: integer
 *                 example: 1
 *               precio_unitario:
 *                 type: number
 *                 format: float
 *                 example: 150.00
 *     responses:
 *       201:
 *         description: Detalle creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 10
 *                 pedido_id:
 *                   type: integer
 *                   example: 2
 *                 producto_id:
 *                   type: integer
 *                   example: 2
 *                 cantidad:
 *                   type: integer
 *                   example: 1
 *                 precio_unitario:
 *                   type: number
 *                   format: float
 *                   example: 150.00
 *       500:
 *         description: Error al crear detalle
 */
const createOrderDetail = async (req, res) => {
    const { pedido_id, producto_id, cantidad, precio_unitario } = req.body;

    const result = await sqlRequester.post(
        'INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario) OUTPUT INSERTED.id VALUES (?, ?, ?, ?)',
        [pedido_id, producto_id, cantidad, precio_unitario]
    );

    if (!result) return res.status(500).json({ message: 'Error al crear detalle de pedido' });

    const insertedId = result.recordset[0].id;

    res.status(201).json({
        id: insertedId,
        pedido_id,
        producto_id,
        cantidad,
        precio_unitario
    });
};


module.exports = {
    createOrderDetail,
    getAllOrderDetails,
    getOrderDetailById
}