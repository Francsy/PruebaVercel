const express = require('express')
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path')

const dbPath = path.join(__dirname, 'db', 'users.json')


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', (req, res, next) => {
    try {
        const result = fs.readFileSync(dbPath, 'utf8');
        const dataBase = JSON.parse(result);
        res.status(200).json(dataBase)
    } catch (error) {
        throw new Error('Error al obtener los datos de la base de datos');
    }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app
