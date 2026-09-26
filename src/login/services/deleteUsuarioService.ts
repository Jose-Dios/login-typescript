import { userRepository } from '../interfaces/userRepository.js';

export class deleteUsuarioServicio{
    constructor(
        private userRepository: userRepository
    ){}

    async eliminar(id:string){
        return await this.userRepository.deleteUsuario(id);
    }
}