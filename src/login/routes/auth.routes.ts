import { Router } from "express";
import controladores from '../index.js';

const router = Router();

//Hago el llamamiento con el .bind
router.post('/login', controladores.login.login.bind(controladores.login));
router.get('/usuario/:id', controladores.buscarID.findUser.bind(controladores.buscarID));

export default router;