require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { scrapProduct } = require('./scraper');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
    origin: ['https://milistasuper.onrender.com', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Ruta para buscar producto por código de barras
app.get('/api/product/:barcode', async (req, res) => {
    try {
        const { barcode } = req.params;
        
        if (!barcode) {
            return res.status(400).json({
                error: 'Se requiere el código de barras'
            });
        }

        const product = await scrapProduct(barcode);
        res.json(product);

    } catch (error) {
        console.error('Error al buscar producto:', error);
        res.status(500).json({
            error: 'Error al buscar el producto',
            details: error.message
        });
    }
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'API de MiListaSuper funcionando correctamente' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});