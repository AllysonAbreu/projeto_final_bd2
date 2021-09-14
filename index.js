const express = require('express')
const cors = require('cors')
require('dotenv').config();

const app = express()
app.use(express.json())
app.use(cors())
const port = 3000

app.listen(port, ()=>{
  console.log(`App runing on port ${port}.`)
})

const postgres = require('./databases/postgres')
const mongodb = require('./databases/mongodb')
const neo4j = require('./databases/neo4j')

app.post('/postgres', postgres.addPonto)
app.get('/postgres', postgres.getPontos)
app.delete('/postgres', postgres.delPonto)

app.post('/mongo', mongodb.addInformation)
app.put('/mongo/:cpf/:info', mongodb.atualizarInfo)
app.get('/mongo/:cpf', mongodb.getInfo)
app.delete('/mongo', mongodb.delInfo)

app.post('/neo', neo4j.addPaciente)
app.post('/neo/:cpf1/:cpf2', neo4j.addContato)
app.get('/neo/:cpf', neo4j.getContatoPaciente)
