const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let bancoDeDados = []; // Memória temporária

// Rota onde o cliente (index.html) joga os dados
app.post('/registrar', (req, res) => {
    const novo = {
        id: Date.now(),
        nome: req.body.nome,
        conteudo: req.body.conteudo,
        timestamp: new Date()
    };
    bancoDeDados.push(novo);
    res.status(200).send({ status: "Sucesso" });
});

// Rota onde o painel (painel.html) busca os dados
app.get('/dados', (req, res) => {
    res.json(bancoDeDados);
});

app.listen(process.env.PORT || 3000);
