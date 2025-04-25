// test-db.js
const sql = require('mssql');

const config = {
    user: 'administrador',               // Cambia esto por tu usuario SQL
    password: '@dministrador1',    // Cambia esto por tu contraseña
    server: '4.228.64.138',                // O la IP pública si accedes desde fuera
    port: 1433,                         // Asegúrate de que este puerto está habilitado
    database: 'craftynet',             // Cambia esto por el nombre real de tu base
    options: {
        encrypt: false,                  // Solo true si estás usando Azure o certificado válido
        trustServerCertificate: true     // Recomendado si no tienes certificado SSL
    }
};

async function testConnection() {
    try {
        console.log('🟡 Intentando conectar a SQL Server...');
        const pool = await sql.connect(config);
        const result = await pool.query('SELECT GETDATE() AS fecha_actual');
        console.log('✅ Conexión exitosa. Resultado:', result.recordset);
        sql.close();
    } catch (err) {
        console.error('❌ Error al conectar con SQL Server:', err.message);
    }
}

testConnection();
