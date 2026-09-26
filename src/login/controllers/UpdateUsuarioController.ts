import { Request, Response } from "express";
import { user } from "../interfaces/user";
import { updateUsuarioService } from "../services/updateUsuarioService";

export class updateUsuarioController{
    constructor(private updateusuarioservice : updateUsuarioService){}

    async actualizarUsuario(req: Request, res: Response){
        const { id } = req.params;
        const idNumerico = id as string; // Extraemos el /usuarios/:id

        if (!idNumerico) {
            return res.status(400).json({
                mensaje: "El ID proporcionado no es un número válido"
            });
        }

        // Tipamos el body para que solo acepte campos editables de forma opcional
        const cuerpo = req.body as Partial<Omit<user, 'id'>>; 

        // Validación: Si mandan un body vacío {}, no hacemos nada
        if (Object.keys(cuerpo).length === 0) {
            return res.status(400).json({ mensaje: "No se proporcionaron datos para actualizar" });
        }

        try{
            const usuarioActualizado = await this.updateusuarioservice.actualizar(idNumerico,cuerpo);
            
            // Si el repositorio devolvió null, significa que el ID no existía
            if (!usuarioActualizado) {
                return res.status(404).json({ mensaje: "Usuario no encontrado" });
            }

            return res.status(200).json({
                mensaje: "Usuario actualizado con éxito",
                data: usuarioActualizado
            });

        }catch(error){
            return res.status(500).json({
                mensaje: "Error interno al actualizar el usuario"
            });
        }


    }
}