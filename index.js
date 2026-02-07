const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Memória para guardar as fichas (limpa se o servidor reiniciar)
let bancoDados = [];

// Rota para receber do index.html
app.post('/registrar', (req, res) => {
    const novaFicha = {
        id: Date.now(),
        agente: req.body.nome,
        dados: req.body.conteudo, // Aqui entra Identificação, Físico, etc.
        hora: new Date().toLocaleString('pt-BR')
    };
    bancoDados.push(novaFicha);
    res.status(200).json({ status: "Ficha arquivada com sucesso" });
});

// Rota para o painel.html ler as fichas
app.get('/dados', (req, res) => {
    res.json(bancoDados);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Codex operando na porta ${PORT}`));
