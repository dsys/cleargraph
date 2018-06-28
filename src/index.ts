import { ApolloEngine } from "apollo-engine";
import { GraphQLServer } from "graphql-yoga";
import * as path from "path";
import { createContext } from "./context";
import * as resolvers from "./resolvers";

const graphQLServer = new GraphQLServer({
  context: createContext,
  resolvers,
  typeDefs: path.resolve(__dirname, "schema.graphql")
});

const port = parseInt(process.env.PORT, 10) || 4000;

if (process.env.APOLLO_ENGINE_KEY) {
  const engine = new ApolloEngine({
    apiKey: process.env.APOLLO_ENGINE_KEY
  });

  const httpServer = graphQLServer.createHttpServer({
    cacheControl: true,
    tracing: true
  });

  engine.listen(
    {
      graphqlPaths: ["/"],
      httpServer,
      port
    },
    () =>
      // tslint:disable-next-line:no-console
      console.log(`Server with Apollo Engine is running on localhost:${port}`)
  );
} else {
  graphQLServer.start({ port }, () =>
    // tslint:disable-next-line:no-console
    console.log(`Server is running on localhost:${port}`)
  );
}
