import { Router } from "express";
import controladores from '../index.js';

const router = Router();

//Hago el llamamiento con el .bind
router.post('/login', controladores.login.login.bind(controladores.login));
router.get('/usuario/:id', controladores.buscarID.findUser.bind(controladores.buscarID));
router.get('/usuario', controladores.todo.allUser.bind(controladores.todo));
router.post('/registrar', controladores.registra.registrar.bind(controladores.registra));
router.put('/actualizar/:id', controladores.actualiza.actualizarUsuario.bind(controladores.actualiza));
router.delete('/eliminar/:id', controladores.elimina.eliminarusuario.bind(controladores.elimina));

export default router;