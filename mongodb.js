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