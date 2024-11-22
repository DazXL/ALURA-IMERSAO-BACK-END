import express from "express"; // Importa o framework Express.js para criar aplicações web.
import multer from "multer"; // Importa o middleware Multer para upload de arquivos.
import cors from "cors";

const corsOptions = {
	origin: "http://localhost:8000",
	optionsSuccessStatus: 200,
};
// Importa funções controladoras do arquivo postsController.js
import {
	listarPosts, // Função para listar todos os posts
	postarNovoPost, // Função para criar um novo post
	uploadImagem, // Função para processar o upload de imagens
	atualizarNovoPost,
} from "../controllers/postsController.js";

// Configura o armazenamento de arquivos para o Multer
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// Define o diretório para salvar os arquivos enviados (pasta uploads/)
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		// Mantém o nome original do arquivo enviado
		cb(null, file.originalname);
	},
});

// Cria uma instância do middleware Multer com as configurações de armazenamento
const upload = multer({ storage });

// Função para definir rotas na aplicação Express
const routes = (app) => {
	// Habilita o parseamento de JSON no corpo das requisições
	app.use(express.json());
	app.use(cors(corsOptions));

	// Rota GET para listar todos os posts (tratada pela função listarPosts)
	app.get("/posts", listarPosts);

	// Rota POST para criar um novo post (tratada pela função postarNovoPost)
	app.post("/posts", postarNovoPost);

	// Rota POST para upload de imagens (usa o middleware upload.single("imagem") e é tratada pela função uploadImagem)
	app.post("/upload", upload.single("imagem"), uploadImagem);

	app.put("/upload/:id", atualizarNovoPost);
};

export default routes; // Exporta a função routes para uso em outros arquivos
