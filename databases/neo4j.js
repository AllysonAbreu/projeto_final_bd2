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

//Função para adicionar um paciente
async function addPaciente(request, response){    
    const {cpf} = request.body;

    await session.run(`CREATE (p:Pessoa{cpf:${cpf}}) RETURN p`)
        .then(result => response.status(200).send('Paciente inserido!')) //console.log(result.records[0].length>0))
        .catch(error => response.status(400).send(error))
}

//Função para adicionar contato entre dois pacientes
async function addContato(request, response){
    
    const {cpf1, cpf2} = request.body;
        
    await session.run(`MATCH (p1:Pessoa), (p2:Pessoa) WHERE p1.cpf=${cpf1} AND p2.cpf=${cpf2} CREATE (p1)-[:CONTATO]->(p2)`)
        .then(result => response.status(200).send('Contato entre pacientes adicionado!'))
        .catch(error => response.status(400).send(error))
}

//Função para retornar todos as pessoas que um paciente teve contato
async function getContatoPaciente(request, response){
    const session = contato.session();
    const {cpf} = request.body;

    const query = `MATCH (p:Pessoa{cpf:$cpf}) -[:CONTATO] -> (p2:Pessoa)          
    RETURN p2.cpf as cpf`;
    await session.run(query, 
        {cpf: cpf})
        .then(result =>  result.records.forEach(record => response.send(record.get('cpf'))))
        .catch(error => response.status(400).send(error));
} 

//Função para excluir um paciente 
async function delPaciente(request, response){
    const session = contato.session();
    const {cpf} = request.body;
    const query = `MATCH (p:Pessoa{cpf:$cpf}) DETACH DELETE p`;
    await session.run(query,
        {cpf: cpf})
        .then(result => response.status(200).send('Paciente deletado!'))
        .catch(error => response.status(400).send(error))
}

module.exports = {
    addPaciente,
    addContato,
    getContatoPaciente,
    delPaciente,    
};