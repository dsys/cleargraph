import { GraphQLScalarType } from "graphql";
import { GraphQLError } from "graphql/error";
import { Kind } from "graphql/language";

export const HEX_REGEX = /^(0x)?([a-f0-9]+)$/;

export function coerceEthereumAddressString(str: string): string | null {
  const norm = str.toLowerCase();
  if (norm.match(HEX_REGEX)) {
    return norm.startsWith("0x") ? norm : "0x" + norm;
  } else if (norm.endsWith(".eth")) {
    return norm;
  } else {
    throw new GraphQLError("invalid Ethereum address");
  }
}

export const EthereumAddressString = new GraphQLScalarType({
  description: "A string representing an Ethereum address",
  name: "EthereumAddressString",
  parseValue: coerceEthereumAddressString,
  serialize: coerceEthereumAddressString,
  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.STRING:
        return coerceEthereumAddressString(ast.value);

      default:
        throw new GraphQLError("invalid Ethereum address");
    }
  }
});
