import { userRepository } from '../interfaces/userRepository.js';
export class findUserService{
    constructor(
        private userRepository: userRepository
    ){}

    async findByID(id: number){
        return await this.userRepository.buscarPorId(id); 
    }

}