import { Database } from 'better-sqlite3';
import { databaseConecctionLite } from '../../shared/databaseConecctionLite';
import { user } from "../interfaces/user";
import { userRepository } from "../interfaces/userRepository";
// import { randomUUID } from 'crypto'; // Librería nativa de Node para crear IDs únicos

export class userRepositorySqlite implements userRepository{
    private db : Database;


    constructor() {
        // Invocas a la clase conexión para obtener la instancia única
        this.db = databaseConecctionLite.getInstance();
        this.init();
    }

    private init() {
        this.db.prepare(`
            CREATE TABLE IF NOT EXISTS user (
                id INTEGER PRIMARY KEY,
                usuario TEXT UNIQUE,
                contra TEXT
            )
        `).run();
    }

    async buscarUsuario(usuario: string): Promise<user | null> {
        const dato = this.db.prepare('Select * from user WHERE usuario = ?');
        const busqueda = dato.get(usuario)
        return busqueda ? (busqueda as user) : null;
    }

    async createUsuario(datos: Omit<user, 'id'>): Promise<user> {
        try{
            //genero id unico
            // const nuevoId = randomUUID();

            // Contamos cuántos usuarios existen en la tabla
            const total = this.db.prepare('SELECT COUNT(*) as total FROM user').get() as any;
            
            // Calculamos el siguiente ID como un número entero (number)
            const nuevoId: number = (total.total as number) + 1;

            //preparo la sentencia sql apuntando a las columnas de la tabla
            const nuevodato = this.db.prepare('INSERT INTO user (id, usuario, contra) VALUES (?, ?, ?)');

            //Ejecuto la consulta pasándole los valores en orden
            nuevodato.run(nuevoId, datos.usuario, datos.contra);

            //creo un objeto para mostrarlo como respuesta
            const usuarioCreado: user = {
                id: nuevoId,
                usuario: datos.usuario,
                contra: datos.contra
            };

            console.log(`-> Usuario "${datos.usuario}" guardado con ID numérico: ${nuevoId}`);
            return usuarioCreado;

        }catch(error){
            console.error("Error al crear el usuario en SQLite:", error);
            throw new Error('No se pudo crear el usuario.');

        }
    }

    async mostrarTodo(): Promise<user[]> {
        const consulta = this.db.prepare('Select * from user');
        const usuarios = consulta.all();
        return usuarios as user[];
    }

    buscarPorId(id: number): Promise<user | null> {
        throw new Error('Method not implemented.');
    }
    
    
    updateUsuario(id: number, datos: Partial<Omit<user, 'id'>>): Promise<user | null> {
        throw new Error('Method not implemented.');
    }
    deleteUsuario(id: number): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}