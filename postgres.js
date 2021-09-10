require('dotenv').config();

const {Client} = require('pg');

//Criando banco
const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
});

//Verificando conexão
client.connect()
    .then(()=> console.log('Conectado ao postgress!'))
    .catch(err => console.log(err.stack));
