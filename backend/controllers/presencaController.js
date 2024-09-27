// presencaController.js
const Presenca = require("../models/presencaModel");

exports.registrarPresenca = async (req, res) => {
    try {
        const { nomeAluno, resumoAula, localizacao } = req.body; // Extraindo os dados do corpo da requisição

        // Validar se todos os campos obrigatórios foram preenchidos
        if (!nomeAluno || !resumoAula || !localizacao) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        const novaPresenca = new Presenca({
            nomeAluno,
            resumoAula,
            localizacao,
        });

        await novaPresenca.save(); // Salvando a presença no banco de dados
        res.status(201).json({ message: "Presença registrada com sucesso!", data: novaPresenca });
    } catch (error) {
        console.error("Erro ao salvar presença:", error);
        res.status(400).json({ message: "Erro ao salvar presença", error });
    }
};

// Função para listar todas as presenças
exports.listarPresencas = async (req, res) => {
    try {
        const presencas = await Presenca.find(); // Buscando todas as presenças no banco de dados
        res.status(200).json(presencas);
    } catch (error) {
        console.error("Erro ao listar presenças:", error);
        res.status(500).json({ message: "Erro ao listar presenças", error });
    }
};
