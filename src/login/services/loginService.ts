import { userRepository } from '../interfaces/userRepository.js';
export class loginService{
    constructor(
        private userRepository: userRepository
    ){}

    async login(usuario : string, password : string){
        const busqueda = await this.userRepository.buscarUsuario(usuario)

        if (!busqueda) {
            return false;
        }

        if (busqueda.contra !== password) {
            return false;
        }

        return true;
    }

}