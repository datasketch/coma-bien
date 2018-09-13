require('dotenv').config()
const debug = require('debug')('coma-bien:server')
const express = require('express')
const http = require('http')
const path = require('path')
const services = require('./services')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res, next) => {
  debug('Request /')
  try {
    const result = await services.getCards()
    const cards = result.records.map(record => record.toObject().n.properties)
    res.render('index', { cards })
  } catch (error) {
    return next(error)
  }
})

app.get('/tips', async (req, res, next) => {
  debug('Request /tips')
  try {
    const result = await services.getTips()
    const tips = result.records.map(record => record.toObject().n.properties)
    res.render('index', { tips })
  } catch (error) {
    return next(error)
  }
})

app.get('/ingredientes', async (req, res, next) => {
  debug('Request /ingredientes')
  try {
    const result = await services.getIngredients()
    const ingredients = result.records.map(record => record.toObject().n.properties)
    res.render('index', { ingredients })
  } catch (error) {
    return next(error)
  }
})

app.use((req, res) => {
  res.send('Not found')
})

app.use((error, req, res, next) => {
  console.error('error' + error.message)
  console.error(error.stack)
  res.send('Error')
})

function handleFatalError (error) {
  console.error('error: ' + error.message)
  console.error(error.stack)
  process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

const port = process.env.PORT || 3000
const server = http.createServer(app)
server.listen(port, () => debug(`Server up in port ${port}`))
