const express = require('express')
require('dotenv').config()
const express_graphql = require('express-graphql')

const connectDB = require('./util/database')
const graphqlSchema = require('./graphql/schema')
const graphqlResolver = require('./graphql/resolver')

const app = express()

connectDB()

app.use(
  '/graphql',
  express_graphql({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn(err) {
      if (!err.originalError) {
        return err
      }
      const data = err.originalError.data
      const message = err.message || 'An error occured'
      const code = err.originalError.code
      return { message, status: code, data }
    }
  })
)

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'))
