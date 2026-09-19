import { userRepositoryMemory } from "./repositories/userRepositoryMemory.js";
import { loginService } from "./services/loginService.js";
import { loginController } from './controllers/logincontroller.js';
import { findUserService } from "./services/findUserService.js";
import { findUserController } from "./controllers/findUserController.js";

// LoginService depende de la interfaz,
// no de una implementación concreta.
// Esto permite cambiar la fuente de datos
// sin modificar la lógica del login.
const usuarioRepositorio = new userRepositoryMemory();

//ingresar
const servicelogin = new loginService(usuarioRepositorio);
const login = new loginController(servicelogin);

// buscarporID
const servicebusquerda = new findUserService(usuarioRepositorio)
const busqueda = new findUserController(servicebusquerda);


export default {
    login: login,
    buscarID: busqueda
};