import { userRepositoryMemory } from "./repositories/userRepositoryMemory.js";
import { loginService } from "./services/loginService.js";
import { loginController } from './controllers/logincontroller.js';
import { findUserService } from "./services/findUserService.js";
import { findUserController } from "./controllers/findUserController.js";
import { allUserService } from "./services/allUserService.js";
import { allUserController } from "./controllers/allUsersController.js";
import { registrarUsuarioService } from "./services/registrarUsuarioService.js";
import { registrarUsuarioController } from "./controllers/registrarUsuarioController.js";
import { updateUsuarioService } from "./services/updateUsuarioService.js";
import { updateUsuarioController } from "./controllers/UpdateUsuarioController.js";
import { deleteUsuarioServicio } from "./services/deleteUsuarioService.js";
import { deleteUsuarioController } from "./controllers/deleteUsuarioController.js";

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

// mostrarTodo
const serviceview = new allUserService(usuarioRepositorio)
const mostrar = new allUserController(serviceview);

// registrarUsuario
const registrarview = new registrarUsuarioService(usuarioRepositorio)
const registraUsuario = new registrarUsuarioController(registrarview);

// actualizarUsuario
const actualizarview = new updateUsuarioService(usuarioRepositorio)
const actualizarUsuario = new updateUsuarioController(actualizarview);

// eliminarUsuario
const eliminarview = new deleteUsuarioServicio(usuarioRepositorio)
const eliminarUsuario = new deleteUsuarioController(eliminarview);


export default {
    login: login,
    buscarID: busqueda,
    todo: mostrar,
    registra: registraUsuario,
    actualiza: actualizarUsuario,
    elimina: eliminarUsuario
};