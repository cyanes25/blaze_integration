const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { generatePixQRCode } = require('./payIn');
const { generatePayOut } = require('./payOut'); 

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all requests
app.use(cors());

app.use(bodyParser.json());

// Endpoint para gerar código QR do Pix (pay-in)
app.get('/pay-in', async (req, res) => {
    try {
        const { amount, referenceLabel } = req.query;
        const response = await generatePixQRCode(amount, referenceLabel);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint para realizar um pagamento (pay-out)
app.post('/pay-out', async (req, res) => {
    try {
        const { pixKey, taxId, amount } = req.body;
        const response = await generatePayOut(pixKey, taxId, amount);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

// Iniciar o Webhook em uma porta separada
require('./webhook');
