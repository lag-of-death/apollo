const bodyParser      = require('body-parser')
const {apolloExpress} = require('apollo-server')
const express         = require('express')
const cors            = require('cors')

const {graphiqlExpress} = require('graphql-server-express')

const schema = require('./schema')
const port   = 7777
const app    = express()

app.use(cors())

app.use(
    '/graphql',
    bodyParser.json(),
    apolloExpress({schema, graphiql: true})
)

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
}));

app.listen(port)

module.exports = app