const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let bancoDados = []; // Onde as fichas ficam guardadas

app.post('/registrar', (req, res) => {
    const novaFicha = {
        id: Date.now(),
        agente: req.body.nome,
        dados: req.body.conteudo,
        hora: new Date().toLocaleString('pt-BR')
    };
    bancoDados.push(novaFicha);
    res.status(200).json({ status: "Sucesso" });
});

app.get('/dados', (req, res) => {
    res.json(bancoDados);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor Online"));
