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

    // Inicializamos el contador buscando el ID más alto del array de arriba y sumándole 1
    private idAutoincremental: number = this.usuarios.length > 0 
        ? Math.max(...this.usuarios.map(u => u.id)) + 1 
        : 1;
    

    async createUsuario(datos: Omit<user, "id">): Promise<user> {
        
        const nuevoUsuario : user = {
            id: this.idAutoincremental++,
            ...datos
        }

        this.usuarios.push(nuevoUsuario);
        return nuevoUsuario;  
    }
     
    
    async buscarUsuario(usuario: string): Promise<user | null> {
        return this.usuarios.find( u => u.usuario === usuario) ?? null;
    }

    async buscarPorId(id: number): Promise<user | null> {
        // Buscamos en tu array de memoria por ID
        return this.usuarios.find(u => u.id === id) ?? null;
    }

    async mostrarTodo(): Promise<user[]> {
        return this.usuarios;
    }

    async updateUsuario(id: number, datos: Partial<Omit<user, "id">>): Promise<user | null> {
        const indice = this.usuarios.findIndex(u => u.id === id);

        // Si no encuentra el id, devuelve -1
        if (indice === -1) return null;

        this.usuarios[indice] = {
            ...this.usuarios[indice],
            ...datos
        }

        return this.usuarios[indice];
    }

    async deleteUsuario(id: number): Promise<boolean> {
        const dato = this.usuarios.findIndex(u => u.id === id);

        // Si no lo encuentra, avisa que no se pudo borrar
        if (dato === -1) return false;
        
        this.usuarios.splice(dato, 1); 
        return true;
    }
}