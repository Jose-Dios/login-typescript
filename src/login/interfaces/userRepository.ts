import { user } from './user';

export interface userRepository{
    //Aqui indico q el login debe ser capaz de buscar a un user
    buscarUsuario(usuario : string) : Promise<user | null>;
    buscarPorId(id : number) : Promise<user | null>;
}