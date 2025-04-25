const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const apiRoutes = require("./src/routes/router.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger config
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'CraftyNet API',
            version: '1.0.0',
            description: 'API para gestión de productos, usuarios y más',
        },
    },
    apis: ['./src/controllers/*.js'], // Asegúrate que tus controllers tienen los comentarios Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Tus rutas unificadas
app.use('/api', apiRoutes);

// Redirección de raíz
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
