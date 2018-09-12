const debug = require('debug')('server')
const express = require('express')
const http = require('http')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index')
})

const port = process.env.PORT || 3000
const server = http.createServer(app)
server.listen(port, () => debug(`Server up in port ${port}`))
