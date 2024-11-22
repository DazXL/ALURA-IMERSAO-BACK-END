import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão fornecida no ambiente.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados.
export async function getTodosPosts() {
	const db = conexao.db("imersao-instabytes"); // Seleciona o banco de dados "imersao-instabytes".
	const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados.
	return colecao.find().toArray(); // Encontra todos os documentos na coleção e retorna como um array.
}

export async function criarPost(novoPost) {
	const db = conexao.db("imersao-instabytes"); // Seleciona o banco de dados "imersao-instabytes".
	const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados.
	return colecao.insertOne(novoPost); // Encontra todos os documentos na coleção e retorna como um array.
}

export async function atualizarPost(id, novoPost) {
	const db = conexao.db("imersao-instabytes");
	const colecao = db.collection("posts");
	const objID = ObjectId.createFromHexString(id);
	return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: novoPost });
}
