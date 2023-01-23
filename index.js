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


app.post('/users', (req, res, next) => {
  const { email, firstName, lastName, username } = req.body;
  if (email && firstName && lastName && username) {
      const newUser = {
          id: uuidv4(),
          email,
          firstName,
          lastName,
          phone: req.body.phone || '',
          img: req.body.img || '',
          username,
          address: req.body.address || {},
          vehicles: req.body.vehicles || [],
          favouritesFood: req.body.favouritesFood || [],
          deleted: false
      }
      let dataBase = getData();
      dataBase.push(newUser);
      fs.writeFile(dbPath, JSON.stringify(dataBase), (err, data) => {
          if (err) {
              next(err);
          } else {
              console.log('Usuario guardado')
              res.status(201).json({ success: true, message: `Usuario creado` })
          }
      })
  } else {
      res.status(400).json({ success: false, message: "Datos incompletos" })
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app
