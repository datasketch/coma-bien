const debug = require('debug')('coma-bien:services')
const neo4j = require('neo4j-driver').v1

const driver = neo4j.driver(
  process.env.DB_BOLT,
  neo4j.auth.basic(process.env.DB_USER, process.env.DB_PASSWORD)
)
const session = driver.session()

async function getCards () {
  debug('Executing getCards()')
  return session.run('MATCH (n:Card) RETURN n')
}

async function getTips () {
  debug('Executing getTips()')
  return session.run('MATCH (n:Tip) RETURN n')
}

async function getIngredients () {
  debug('Executing getIngredients()')
  return session.run('MATCH (n:Ingredient) RETURN n')
}

module.exports = { getCards, getTips, getIngredients }
