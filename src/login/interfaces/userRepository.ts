import { user } from './user';

export interface userRepository{
    //Aqui indico q el login debe ser capaz de buscar a un user
    buscarUsuario(usuario : string) : Promise<user | null>;
    buscarPorId(id : string) : Promise<user | null>;
    mostrarTodo() : Promise<user[]>;
    createUsuario(datos : Omit<user, 'id'>) : Promise<user>;
    updateUsuario(id: string, datos: Partial<Omit<user, 'id'>>) : Promise<user | null>;
    deleteUsuario(id:string) : Promise<boolean>;
}