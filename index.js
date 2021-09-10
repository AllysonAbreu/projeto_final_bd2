const express = require('express')
const app = express()
app.use(express.json)
const port = 3000


app.listen(port, ()=>{
  console.log(`App runing on port ${port}.`)
})

const postgres = require('./postgres')
//const mongodb = require('./mongodb')
const neo4j = require('./neo4j')

