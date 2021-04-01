const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const {MONGODB} = require('./config')


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req})
})


mongoose
  .connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Mongodb connected successfully')
    return server.listen({port: 3000})
  })
  .then(res => {
    console.log(`Server running at ${res.url}`)
  })
