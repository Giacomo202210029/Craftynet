const sqlRequester = require('../services/requester');

/**
 * @swagger
 * /api/product-categories:
 *   get:
 *     summary: Obtener todas las categorías de producto
 *     tags: [Categorías de Producto]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductCategory'
 *       500:
 *         description: Error al obtener categorías
 */
const getAllProductCategories = async (req, res) => {
    const categories = await sqlRequester.get('SELECT * FROM categorias_producto');
    if (!categories) return res.status(500).json({ message: 'Error al obtener categorías de producto' });
    res.status(200).json(categories);
};

/**
 * @swagger
 * /api/product-categories/{id}:
 *   get:
 *     summary: Obtener una categoría de producto por ID
 *     tags: [Categorías de Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCategory'
 *       404:
 *         description: Categoría no encontrada
 */
const getProductCategoryById = async (req, res) => {
    const { id } = req.params;
    const category = await sqlRequester.get('SELECT * FROM categorias_producto WHERE id = ?', [id]);
    if (!category || category.length === 0) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.status(200).json(category[0]);
};

module.exports = {
    getAllProductCategories,
    getProductCategoryById
}