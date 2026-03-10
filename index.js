const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// CONFIGURAÇÃO DO SEU PROJETO CODEX-DATA (Extraído dos seus prints)
const SUPABASE_URL = 'https://ljkpkrkfuuugiyoilfmr.supabase.co'; 
const SUPABASE_KEY = 'sb_publishable_BkKrTmWOjam2NKZEuu21LQ_CmAhzPoh'; 
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ROTA PARA BUSCAR OS DADOS GUARDADOS
app.get('/dados', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('registros')
            .select('*');
        
        if (error) throw error;
        res.json(data || []);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ROTA PARA SALVAR OU ATUALIZAR NOTAS PARA SEMPRE
app.post('/atualizar/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const { notas } = req.body;
        
        const { data, error } = await supabase
            .from('registros')
            .upsert({ nome: nome, notas: notas }, { onConflict: 'nome' });

        if (error) throw error;
        res.json({ status: "Sincronizado na Nuvem", data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("D'ARC CODEX: Sistema Online e Conectado"));
