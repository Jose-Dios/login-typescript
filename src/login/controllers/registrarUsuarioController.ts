import { Request, Response } from "express";
import { registrarUsuarioService } from "../services/registrarUsuarioService";
import { user } from "../interfaces/user";

export class registrarUsuarioController{
    constructor(private registrarusuarioservice : registrarUsuarioService){}

    async registrar(req: Request, res: Response){
        //Tipamos el req.body usando Omit para asegurar que no traiga ID
         const cuerpo = req.body as Omit<user, 'id'>;

         const { usuario, contra } = cuerpo;

         if (!usuario || !contra) {
            return res.status(400).json({
                mensaje: "El usuario y la contraseña son campos obligatorios"
            });
        }

        try{
            const nuevoUsuario = await this.registrarusuarioservice.registrarUsuario(cuerpo);

            return res.status(201).json({
                mensaje: "Usuario registrado con éxito",
                data: nuevoUsuario
            });

        }catch(error: any){

            if (error.message === "EL_USUARIO_YA_EXISTE") {
            return res.status(409).json({ // 409 significa Conflict (Conflicto de datos)
                mensaje: `El nombre de usuario '${usuario}' ya se encuentra registrado`
            });
        }
            return res.status(500).json({
                mensaje: "Error interno al registrar el usuario"
            });

        }
    }
}