import express from 'express';
import authRoutes from './login/routes/auth.routes.js';


const app = express();
const PORT = 3000;

// Middleware para poder leer datos en formato JSON 
app.use(express.json());

//Ruta global para llamar del login
app.use('/login', authRoutes);

// Encender el servidor
app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});