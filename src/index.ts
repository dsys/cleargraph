import { GraphQLServer } from "graphql-yoga";
import * as path from "path";
import { createContext } from "./context";
import * as resolvers from "./resolvers";

const server = new GraphQLServer({
  context: createContext,
  resolvers,
  typeDefs: path.resolve(__dirname, "schema.graphql"),
});

server.start(info =>
  // tslint:disable-next-line:no-console
  console.log(`Server is running on localhost:${info.port}`),
);
