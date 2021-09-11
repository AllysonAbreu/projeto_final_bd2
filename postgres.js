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

//Função para adicionar um ponto do mapa no banco
const addPonto = (request, response) =>{
    const {nome, cpf, endereco, lat, lng} = request.body;
  
    const query = `INSERT INTO ponto (nome, cpf, endereco, localizacao) VALUES ('${nome}','${cpf}', '${endereco}', ST_GeomFromText('POINT(${lat} ${lng})'))`;
  
    client.query(query,(error, results) => {
            if(error){
                response.status(400).send(error);
                console.log(error);
                return;
            }
            response.status(200).send('Inserido');
        });
  };  
  
  //Função para pegar um ponto no banco
  const getPontos = (request, response) =>{
  
    // SELECT ST_AsText(the_geom) FROM myTable;
    const query = `SELECT ST_AsText(localizacao) as localizacao FROM ponto`
  
    client.query(query,(error, results) => {
            if(error){
                response.status(400).send(error);
                console.log(error);
                return;
            }
            let res = results.rows.map((row) => {
                const latLong = row.localizacao.substring(6, row.localizacao.length - 1).split(' ');
                const point = {
                    lat: latLong[0],
                    lng: latLong[1],
                }
                return point
            })
            response.status(200).json(res)
        })
    };
  
  module.exports = {
    addPonto,
    getPontos
  };    
