const express = require('express');
const { getAllUsers } = require('../controllers/userController');
const { createStudent, getAllStudents, getStudentById } = require('../controllers/StudentController');
const { getAllProductCategories, getProductCategoryById } = require('../controllers/ProductCategoryController');
const { createProduct, getAllProducts } = require('../controllers/ProductController');
const { createOrderDetail, getAllOrderDetails, getOrderDetailById } = require('../controllers/OrderDetailsController');
const { createOrder, getAllOrders, getOrderById } = require('../controllers/OrderController');
const {createUser} = require("../controllers/UserController");

const router = express.Router();

// Usuarios
router.get('/users', getAllUsers);
router.post('/users', createUser);

// Estudiantes
router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.post('/students', createStudent);

// Productos
router.get('/products', getAllProducts);
router.post('/products', createProduct);

// Categorías de producto
router.get('/product-categories', getAllProductCategories);
router.get('/product-categories/:id', getProductCategoryById);

// Detalles de pedido
router.get('/order-details', getAllOrderDetails);
router.get('/order-details/:id', getOrderDetailById);
router.post('/order-details', createOrderDetail);

// Pedidos
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.post('/orders', createOrder);

module.exports = router;
