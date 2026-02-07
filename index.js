const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Configurações Básicas
app.use(cors());
app.use(express.json());

// 1. COMANDO MÁGICO: Isso faz o Render servir seus arquivos .html automaticamente
app.use(express.static(__dirname));

// Banco de dados temporário na memória
let bancoDados = [];

// 2. Rota para receber os dados do formulário
app.post('/registrar', (req, res) => {
    console.log("Recebendo nova ficha...");
    const novaFicha = {
        id: Date.now(),
        agente: req.body.nome,
        dados: req.body.conteudo,
        hora: new Date().toLocaleString('pt-BR')
    };
    bancoDados.push(novaFicha);
    res.status(200).json({ status: "Sucesso no registro" });
});

// 3. Rota para o painel buscar os dados
app.get('/dados', (req, res) => {
    res.json(bancoDados);
});

// 4. Rota principal: Quando você abrir o link puro, ele abre o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 5. Rota para o Painel: Se digitar /admin, abre o painel.html
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'painel.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`📡 Servidor Codex Online na porta ${PORT}`);
});
