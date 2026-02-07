const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Nosso banco de dados temporário (em memória)
let registros = [];

// Rota para o Cliente enviar dados
app.post('/registrar', (req, res) => {
    const novaFicha = {
        id: Date.now(),
        agente: req.body.nome,
        dados: req.body.conteudo,
        hora: new Date().toLocaleTimeString()
    };
    registros.push(novaFicha);
    console.log("Ficha recebida de:", novaFicha.agente);
    res.status(200).json({ mensagem: "Enviado com sucesso!" });
});

// Rota para o Painel ler os dados
app.get('/dados', (req, res) => {
    res.json(registros);
});

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
