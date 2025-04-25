### 1. Abrir el puerto 1433 en la VM del SQL Server
   Ve a la VM donde está tu base de datos SQL Server y asegúrate de:

✅ Tener el puerto 1433 abierto en:

Azure Network Security Group (NSG): Agrega una regla de entrada para TCP 1433.

Firewall de Windows: Agrega una regla de entrada para permitir TCP en el puerto 1433.

### 2. Verificar que SQL Server acepte conexiones externas
   Abre SQL Server Configuration Manager en la VM.

Activa el protocolo TCP/IP.

Haz doble clic en TCP/IP → pestaña IP Addresses.

Baja hasta IPAll.

En TCP Port, asegúrate de que diga 1433.

Reinicia el servicio de SQL Server.


### 3. Descargar el backend en la nueva VM
   Sube el proyecto de backend por uno de estos métodos:

git clone desde GitHub

Copia por RDP si es Windows.

### 4. Instalar Node.js y npm
   En Windows:
   Descarga desde: https://nodejs.org


### 5. Crear el archivo .env
   En la raíz del proyecto, crea un archivo llamado .env con:
DB_USER=nombreUsuario
DB_PASS=contraseña
DB_HOST=IP_DE_TU_SQL_SERVER
DB_PORT=1433
DB_NAME=nombreBase
PORT=3000
### 6. Instalar dependencias
   En la terminal, dentro del proyecto:
npm install
### 7. Ejecutar el backend
   npm run dev
   🧭 Visita en el navegador:
http://IP_DE_TU_BACKEND:3000/api-docs