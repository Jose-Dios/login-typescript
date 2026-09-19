import express from 'express';
import controller from './login/index.js';

const app = express();
const PORT = 3000;

// Middleware para poder leer datos en formato JSON 
app.use(express.json());

// Ruta base para el Login 
app.post("/login", controller.login.bind(controller));

// Encender el servidor
app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});