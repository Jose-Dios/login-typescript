import { Request, Response } from "express";
import { findUserService } from "../services/findUserService";

export class findUserController{
    constructor(private finduserservice : findUserService){}

    async findUser(req: Request, res: Response){
        const { id } = req.params; // Usamos params para recibir el ID por la URL
      
        // Le pedimos al servicio que busque al usuario
        const usuario = await this.finduserservice.findByID(id as string);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        return res.json({
            mensaje: "Usuario encontrado con éxito",
            data: usuario
        })
    }

}