import { Request, Response } from "express";
import { allUserService } from "../services/allUserService";

export class allUserController{
    constructor(private alluserservice : allUserService){}

    async allUser(req: Request, res: Response){
        const usuarios = await this.alluserservice.allUsers();

        if (usuarios.length === 0) {
            return res.status(404).json({
                mensaje: "Usuarios no encontrados"
            });
        }

        return res.status(200).json({
            mensaje: "Usuarios encontrados con éxito",
            data: usuarios
        })
    }
}