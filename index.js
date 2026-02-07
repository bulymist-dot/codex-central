const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// ESTA LINHA É OBRIGATÓRIA: Ela permite que o Render mostre seus arquivos .html
app.use(express.static(__dirname));

let bancoDados = []; 

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

// Rota de segurança para o painel
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'painel.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor Online"));
