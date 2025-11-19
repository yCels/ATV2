const mysql = require('mysql2');

// Criamos uma "pool" (piscina) de conexões. 
// É mais eficiente que abrir e fechar conexão toda hora.
const pool = mysql.createPool({
    host: 'localhost',      // O endereço do banco
    user: 'root',           // Seu usuário do MySQL (geralmente é root)
    password: 'root',  // ⚠️ COLOQUE A SENHA DO SEU MYSQL AQUI
    database: 'portfolio_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportamos a versão com "promise" para poder usar async/await (mais moderno e limpo)
module.exports = pool.promise();