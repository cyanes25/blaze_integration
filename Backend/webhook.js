require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();
const port = 7890;

const EventEmitter = require('events');
const webhookEmitter = new EventEmitter();

// Armazena as mensagens com status "QUEUED"
let queuedMessages = [];


// Configura o express para ler JSON nas requisições
app.use(express.json());

// Endpoint para receber notificações do Webhook
app.post('/', async (req, res) => {
    try {
        const message = req.body;
     
            queuedMessages.push(message);
        // Verifica e processa a última mensagem na fila
        if (queuedMessages.length > 0) {
            const lastQueuedMessage = queuedMessages.shift(); // Obtenha e remova a última mensagem
            await processQueuedMessage(lastQueuedMessage);
        }

        res.status(200).send();
       
    } catch (err) {
        console.error('Error processing webhook:', err.message);
        res.status(500).send('Error processing webhook');
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Webhook server running on port ${port}`);
});

// Processa mensagens em fila
async function processQueuedMessage(message) {
    webhookEmitter.emit('newMessage', message);
    console.log("newMessage: ", message)
    
 
}

// Exporta a variável queuedMessages para uso em outro arquivo
module.exports = {
    webhookEmitter
};
