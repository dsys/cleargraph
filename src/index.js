const resolvers = require('./resolvers');
const { GraphQLServer } = require('graphql-yoga');
const { createContext } = require('./context')

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: createContext
});

server.start(info =>
  // eslint-disable-next-line no-console
  console.log(
    `Server is running on http://localhost:${info.port}`
  )
);
