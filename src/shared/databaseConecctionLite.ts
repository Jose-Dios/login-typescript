import Database from "better-sqlite3";
export class databaseConecctionLite{
    //Guardamos la instancia para que sea unica
    private static instance : Database.Database | null = null;

    //El metodo lo hacemos estatico para poder llamarlo sin hacer un new
    public static getInstance() : Database.Database {
        
        if(!databaseConecctionLite.instance){
            //Se conecta al archivo y de no existir lo crea
            databaseConecctionLite.instance = new Database('proyecto.db');

            //Esto lo estoy configurando para q funcione de forma optima
            databaseConecctionLite.instance.pragma('journal_mode = WAL');

            console.log("¡Conexión a SQLite establecida con éxito!");
        }

        return databaseConecctionLite.instance;

    }
}