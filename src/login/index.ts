import { userRepositoryMemory } from "./repositories/userRepositoryMemory.js";
import { loginService } from "./services/loginService.js";
import { loginController } from './controllers/logincontroller.js';

// LoginService depende de la interfaz,
// no de una implementación concreta.
// Esto permite cambiar la fuente de datos
// sin modificar la lógica del login.
const usuarioRepositorio = new userRepositoryMemory();
const service = new loginService(usuarioRepositorio);
const controller = new loginController(service);

export default controller;