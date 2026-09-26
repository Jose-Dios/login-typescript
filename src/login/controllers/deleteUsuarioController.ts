import { Request, Response } from "express";
import { deleteUsuarioServicio } from '../services/deleteUsuarioService';

export class deleteUsuarioController{
    constructor(private deleteusuarioservicio : deleteUsuarioServicio){}

    async eliminarusuario(req: Request, res: Response){
        const { id } = req.params;
        const idCadena = id as string;

        if (!id) {
            return res.status(400).json({
                mensaje: "El ID proporcionado no es un número válido"
            });
        }

        try{
            const eliminado = await this.deleteusuarioservicio.eliminar(idCadena);

            // Si el servicio devuelve false, significa que el ID no existía en memoria
            if (!eliminado) {
                return res.status(404).json({
                    mensaje: "Usuario no encontrado, no se pudo eliminar"
                });
            }

            // Código 200 o 204 para eliminaciones exitosas
            return res.status(200).json({
                mensaje: "Usuario eliminado con éxito"
            });

        }catch(error){
            return res.status(500).json({
                mensaje: "Error interno al eliminar el usuario"
            });            
        }

    }
}