import { user } from "../interfaces/user";
import { userRepository } from "../interfaces/userRepository";

export class userRepositoryMemory implements userRepository{

    //Este array es de prueba para probar el comportamiento con un db en caso sea db lo pasas en el constructor
    private usuarios : user[] = [
        {
            id: 1,
            usuario: "jose",
            contra: "123456"
        },
        {
            id: 2,
            usuario: "admin",
            contra: "admin123"
        }        
    ];

    async buscarUsuario(usuario: string): Promise<user | null> {
        return this.usuarios.find( u => u.usuario === usuario) ?? null;
    }
}