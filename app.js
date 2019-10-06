const express = require('express')
const app = express() // create application object
require('dotenv').config();

const port = process.env.PORT
const indexAbsolutePath = __dirname + '/views/index.html'

app.use(express.static(__dirname + '/views'))



app.use(function middleware(req, res, next) {
    var string = req.method + ' ' + req.path + ' - ' + req.ip;
    console.log(string)
    next();
  });

// added first route
app.get(
  '/',
  (req, res) => res.sendFile(indexAbsolutePath)
  // res.send('Response String')
)

app.get('/error', function (req, res, next) {
  setTimeout(function () {
    try {
      throw new Error('BROKEN')
    } catch (err) {
      next(err)
    }
  }, 100)
})

app.get('/json', function (req, res) {
  res.json({ message: 'Hello World' })
})

// start server, listening on port 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
