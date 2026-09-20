import { user } from '../interfaces/user.js';
import { userRepository } from '../interfaces/userRepository.js';

export class registrarUsuarioService{
    constructor(
        private userRepository: userRepository
    ){}

    async registrarUsuario(datos: Omit<user, 'id'>){
        const usuarioExistente = await this.userRepository.buscarUsuario(datos.usuario);

        // Si lo encuentra, lanzamos un error para detener el registro
        if (usuarioExistente) {
            throw new Error("EL_USUARIO_YA_EXISTE");
        }

        return await this.userRepository.createUsuario(datos)
    }
}