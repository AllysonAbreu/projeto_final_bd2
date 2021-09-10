require('dotenv').config();

const {MongoClient} = require('mongodb');

//Criando banco
const cache = new MongoClient(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
        { useUnifiedTopology: true });

//Verificando conexão
async function conectar (){
    await cache.connect()
}

conectar().then(console.log ("Conectado ao Mongo Database!"));

//Função para adicionar informação sobre um paciente
async function addInformation(request, response){
    try{
        await cache.connect();
        const addInfo = cache.db(`${process.env.MONGO_DATABASE}`).collection('Cache');
        const {cpf,text} = request.body;
        await addInfo.insertOne({cpf,text})
        .then(result => response.status(200).send('Informação inserida'))
        .catch(error => response.status(400).send(error));

    }finally{
        await cache.close();
    }
}

//Função para retornar as informações de um paciente
async function getInfo(request, response){
    try{
        await cache.connect();
        const verInfo = cache.db(`${process.env.MONGO_DATABASE}`);
        const {cpf} = request.body;
        const info = cache.collection('Cache');
        const filter =  {cpf: cpf};
        await info.find(filter).forEach(cache => response.send(cache));
    } finally{
        await cache.close();
    }
}

//Função para atualizar informações sobre o paciente
async function atualizarInfo(request, response){
    try{
        await cache.connect();
        const info = cache.db(`${process.env.MONGO_DATABASE}`).collection('Cache');
        const {query, update} = request.body;
        await info.updateOne({query, update})
        .then(result => response.status(200).send('Informações atualizadas!'))
        .catch(error => response.status(400).send(error))
    }finally{
        await cache.close();
    }
}

module.exports = {
    addInformation,
    getInfo,
    atualizarInfo
}