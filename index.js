const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<body style="background:#0a192f;color:#00b4ff;font-family:sans-serif;text-align:center;padding:50px;"><h1>🛡️ CODEX CENTRAL ATIVO</h1><p style="color:white;">Servidor rodando 24h gratuitamente.</p></body>');
});

app.post('/registrar', (req, res) => {
    const d = req.body;
    const log = `[${new Date().toLocaleString()}] NOME: ${d.nome} | DADOS: ${JSON.stringify(d.conteudo)}\n`;
    fs.appendFileSync('/tmp/banco.txt', log); 
    res.status(200).json({ status: "Sucesso" });
});

app.get('/ver', (req, res) => {
    const path = '/tmp/banco.txt';
    if (!fs.existsSync(path)) return res.send("Nenhum registro ainda.");
    const dados = fs.readFileSync(path, 'utf8');
    res.send(`<body style="background:#000;color:#2ecc71;padding:20px;font-family:monospace;"><h2>📂 REGISTROS ARP</h2><pre>${dados}</pre></body>`);
});

app.listen(PORT, () => console.log("Servidor Online"));
