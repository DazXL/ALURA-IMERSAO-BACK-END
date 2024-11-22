import express from "express"; // Importa o framework Express.js para criar aplicações web.
import routes from "./src/routes/postsRoutes.js";

const app = express(); // Cria uma instância do aplicativo Express.
app.use(express.static("uploads"));
routes(app);

app.listen(3000, () => {
	console.log("Servidor escutando..."); // Loga uma mensagem no console indicando que o servidor está ouvindo na porta 3000.
});
