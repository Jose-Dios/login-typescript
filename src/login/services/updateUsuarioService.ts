import { user } from '../interfaces/user.js';
import { userRepository } from '../interfaces/userRepository.js';

export class updateUsuarioService{
    constructor(
        private userRepository: userRepository
    ){}

    async actualizar(id: string, datos: Partial<Omit<user, 'id'>>){
        return await this.userRepository.updateUsuario(id,datos)
    }
}