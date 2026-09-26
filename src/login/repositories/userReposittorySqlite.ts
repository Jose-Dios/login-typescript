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
                id TEXT PRIMARY KEY,
                usuario TEXT UNIQUE,
                contra TEXT NOT NULL,
                activo INTEGER DEFAULT 1
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
            const total = this.db.prepare('SELECT COUNT(*) as total FROM user');
            const resultado = total.get() as { total: number };

            const siguienteNumero = resultado.total + 1;

            const nuevoId = `User-${siguienteNumero}`;
            
            // Calculamos el siguiente ID como un número entero (number)
            // const nuevoId: string = (total.total as string) + 1;

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
        const consulta = this.db.prepare('Select * from user WHERE activo = 1');
        const usuarios = consulta.all();
        return usuarios as user[];
    }

    async buscarPorId(id: string): Promise<user | null> {
        const dato = this.db.prepare('Select * from user WHERE id = ? AND activo = 1');
        const usuario = dato.get(id);
        return usuario ? (usuario as user) : null;
    }
    
    
    async updateUsuario(id: string, datos: Partial<Omit<user, 'id'>>): Promise<user | null> {
        const dato = this.db.prepare('Select * from user WHERE id = ? AND activo = 1');
        const usuario = dato.get(id) as user | undefined;

        if (!usuario) return null;

        //Si no se enviaron datos para actualizar, retornar el usuario actual
        const keys = Object.keys(datos) as Array<keyof typeof datos>;

        // Si el objeto de datos viene vacío (ej. {}), devolvemos el usuario intacto
        if (keys.length === 0) return usuario;

        // Construir el fragmento "SET usuario = ?, contra = ?"
        const setQuery = keys.map(key => `${key} = ?`).join(', ');

        const stmtUpdate = this.db.prepare(`UPDATE user SET ${setQuery} WHERE id = ?`);

        // Mapeamos los valores en el mismo orden de las llaves y añadimos el ID al final
        const valores = keys.map(key => datos[key]);
        stmtUpdate.run(...valores, id);

        // Retornar el usuario con los datos actualizados desde la BD
        return dato.get(id) as user;
    }

    async deleteUsuario(id: string): Promise<boolean> {
        const usuarioeliminado = this.db.prepare('UPDATE user SET activo = 0 WHERE id = ? AND activo = 1')
        usuarioeliminado.run(id);

        return true;
    }

}