const express = require('express')
const app = express() // create application object
const bodyParser = require('body-parser') // to extract parameters from POST req body

require('dotenv').config() // environment variables from .env

const port = process.env.PORT // environment variables from .env
const indexAbsolutePath = __dirname + '/views/index.html'

app.use(express.static(__dirname + '/views')) // serve static content from given dir
app.use(bodyParser.urlencoded({ extended: false })) // to extract parameters from POST req body
app.use(bodyParser.json()) // to extract parameters from POST req body

// middleware - logger
app.use(function middleware (req, res, next) {
  const string = req.method + ' ' + req.path + ' - ' + req.ip
  console.log(string)
  next()
})

// POST - extracting request params
app.post('/login', (req, res) => {
  const user_name = req.body.user
  const password = req.body.password
  console.log(JSON.stringify(req.body))
  console.log('User name = ' + user_name + ', password is ' + password)
  res.end('Welcome ' + user_name)
})

// added first route
app.get('/', (req, res) => res.sendFile(indexAbsolutePath))

// handling errors
app.get('/error', (req, res, next) => {
  setTimeout(function () {
    try {
      throw new Error('BROKEN')
    } catch (err) {
      next(err)
    }
  }, 100)
})

// serve json file
app.get('/json', (req, res) => res.json({ message: 'Hello World' }))

//  chain middleware
app.get(
  '/now',
  (req, res, next) => {
    req.time = new Date().toString()
    next()
  },
  (req, res) => {
    res.json({ time: req.time })
  }
)

// reading path params
app.get('/user/:user_id/books/:book_id', (req, res) => {
  const params = req.params
  console.log(JSON.stringify(params))
  res.json(params)
})

// read query string
app.get('/food/thai', (req, res) => {
  const params = req.query
  console.log(JSON.stringify(params))
  res.json(params)
})

// start server, listening on previously defined port
app.listen(port, () => console.log(`Example app listening on port ${port}!`))