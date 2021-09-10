const express = require('express')
const app = express()
app.use(express.json)
const port = 3000


app.listen(port, ()=>{
  console.log(`App runing on port ${port}.`)
})

const postgres = require('./postgres')
const mongodb = require('./mongodb')
const neo4j = require('./neo4j')

app.post('/pontos', postgres.addPonto)
app.get('/pontos', postgres.getPontos)

app.post('/pontos', mongodb.addInformation)
app.put('/pontos', mongodb.atualizarInfo)
app.get('/pontos', mongodb.getInfo)

app.post('/pontos', neo4j.addPaciente)
app.post('/pontos/:cpf1/:cpf2', neo4j.addContato)
app.post('/pontos/:cpf', neo4j.getContatoPaciente)
app.delete('/pontos/:cpf', neo4j.delPaciente)