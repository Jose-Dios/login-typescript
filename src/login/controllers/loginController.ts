import { Request, Response } from "express";
import {loginService} from '../services/loginService.js';

export class loginController{
    constructor(
        private loginservice : loginService
    ){}

    async login(req: Request, res: Response){

        const { usuario, password } = req.body;

        const resultado = await this.loginservice.login(
            usuario,
            password
        );

        if(!resultado){
            return res.status(401).json({
                mensaje  : "Usuario o contraseña incorrectos"
            });
        }

        return res.json({
            mensaje : "Bienvenido"
        })

    }

}