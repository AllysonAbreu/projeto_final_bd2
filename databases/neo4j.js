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
        .then(result => response.status(200).send('Paciente inserido!'))
        .catch(error => response.status(400).send(error))
}

//Função para adicionar contato entre dois pacientes
async function addContato(request, response){
    
    const {cpf1, cpf2} = request.body;

    console.log({cpf1,cpf2})
    const query = `MATCH (p1:Pessoa), (p2:Pessoa) WHERE p1.cpf=${cpf1} AND p2.cpf=${cpf2} CREATE (p1)-[c:CONTATO]->(p2)`;
    console.log(query);
    await session.run(`MATCH (p1:Pessoa), (p2:Pessoa) WHERE p1.cpf=${cpf1} AND p2.cpf=${cpf2} CREATE (p1)-[c:CONTATO]->(p2)`)
        .then(result => response.status(200).send('Contato entre pacientes adicionado!'))
        .catch(error => response.status(400).send(error))
    await session.run(`MATCH (p1:Pessoa), (p2:Pessoa) WHERE p1.cpf=${cpf1} AND p2.cpf=${cpf2} CREATE (p2)-[c:CONTATO]->(p1)`)
    .then(result => response.status(200).send('Contato entre pacientes adicionado!'))
    .catch(error => response.status(400).send(error))
}

//Função para retornar todos as pessoas que um paciente teve contato
async function getContatoPaciente(request, response){
    console.log(request.params)

    const {cpf} = request.params;

    console.log({cpf}) 
    
    await session.run(`MATCH (p:Pessoa {cpf: ${cpf}})-[c:CONTATO]->(p2:Pessoa) RETURN p2.cpf as cpf`)
        .then(({records}) =>  {
            const cpfs = records
                .map(record => record.get('cpf'))
                .map((cpf) => ({ cpf: cpf.low}));
            response.send(cpfs);
        })
        .catch(error => {
            console.log(error);
            response.status(400).send(error)
        });
}

async function delPaciente(request, response){
    console.log(request.params)

    const {cpf} = request.body;

    console.log({cpf})     
    await session.run(`MATCH (p:Pessoa{cpf:${cpf}}) DETACH DELETE p`,
        {cpf: cpf})
        .then(result => response.status(200).send('Paciente deletado!'))
        .catch(error => response.status(400).send(error))
} 

module.exports = {
    addPaciente,
    addContato,
    getContatoPaciente,
    delPaciente    
}