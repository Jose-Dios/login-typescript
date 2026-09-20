import { userRepository } from '../interfaces/userRepository.js';
export class allUserService{
    constructor(
        private userRepository: userRepository
    ){}

    async allUsers(){
        return await this.userRepository.mostrarTodo(); 
    }

}