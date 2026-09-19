#PASO 1: INICIAR EL PROYECTO
    yarn init -y

#PASO 2: Instalar TypeScript y Express
    yarn add -D typescript @types/node @types/express

#PASO 3: Instalar express
    yarn add express

#PASO 4: Crea la carpeta src y dentro server.ts

#PASO 5: Configurar script de ejecucion nativo
  {
  "name": "proyecto_login",
  "version": "1.0.0",
  "type": "module",
  "main": "src/server.ts",
  "license": "MIT",
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "tsx watch src/server.ts"
  },
  "devDependencies": {
    "@types/express": "^5.0.6",
    "@types/node": "^22.20.2",
    "ts-node": "^10.9.2",
    "tsx": "^4.23.13",
    "typescript": "^7.0.2"
  },
  "dependencies": {
    "express": "^5.2.1"
  }
}

#PASO 5: para levantar en pruebas pon en consola 
- yarn dev
