require('dotenv').config();
const neo4j = require('neo4j-driver');

const uri = `neo4j://${process.env.NEO4J_HOST}:${process.env.NEO4J_PORT}`;

//Criando Banco
const contato = neo4j.driver(uri, neo4j.auth
    .basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD));

//Iniciando conexão no banco 
const session = contato.session();

//Verificando conexão
async function conectar (){
    const session = contato.session();
}
conectar().then(console.log ("Conectado ao Neo4j!"));