const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./resolvers');

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({ ...req })
});

server.start(info =>
  // eslint-disable-next-line no-console
  console.log(
    `Server is running on http://localhost:${info.port}`
  )
);
