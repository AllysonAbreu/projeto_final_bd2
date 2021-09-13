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
        const {cpf,info} = request.body;
        await addInfo.insertOne({cpf,info})
        .then(result => response.status(200).send('Informação inserida'))
        .catch(error => response.status(400).send(error));

    }finally{
        await cache.close();
    }
}    

//Função para retornar as informações de um paciente
async function getInfo(request, response){
    try{
        await cache.connect()
        const verInfo = cache.db(`${process.env.MONGO_DATABASE}`).collection('Cache')
        const {cpf} = request.body
        const filter =  {cpf: cpf}
        await verInfo.find(filter).forEach(p => response.send(p))
        .then(result => response.status(200).send('Busca concluída'))
        .catch(error => response.status(400).send(error));
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
//Função para deletar informações
async function delInfo(request, response){
    try{
        await cache.connect();
        const delinfo = publicacao.db(`${process.env.MONGO_DATABASE}`).collection('Cache');
        const {filter} = request.body;
        const result = await delinfo.deleteOne({filter});
        response.send(`${result.deletedCount} informações removidas.`);
    }finally{
        await cache.close();
    }
}
module.exports = {
    addInformation,
    getInfo,
    atualizarInfo,
    delInfo
}