import { GraphQLScalarType } from "graphql";
import { GraphQLError } from "graphql/error";
import { Kind } from "graphql/language";

export const HEX_REGEX = /^(0x)?([a-f0-9]+)$/;

export function hexValue(str: string, len: number | null): string | null {
  const norm = str.toLowerCase();
  if (!norm.match(HEX_REGEX)) {
    throw new GraphQLError("invalid hex value");
  }

  return norm.startsWith("0x") ? norm : "0x" + norm;
}

export function createHexValueGraphQLScalarType({
  name,
  description,
  byteLength
}: {
  name: string;
  description: string;
  byteLength: number;
}): GraphQLScalarType {
  const coerceHexValue = (str: string): string | null => {
    const norm = str.toLowerCase();
    const match = norm.match(HEX_REGEX);
    if (!match) {
      throw new GraphQLError("invalid hex value");
    }

    const actualByteLength = match[2].length / 2;
    if (byteLength && actualByteLength !== byteLength) {
      throw new GraphQLError(
        `invalid hex value length (expected ${byteLength})`
      );
    }

    return norm.startsWith("0x") ? norm : "0x" + norm;
  };

  return new GraphQLScalarType({
    description,
    name,
    parseValue: coerceHexValue,
    serialize: coerceHexValue,
    parseLiteral(ast) {
      switch (ast.kind) {
        case Kind.STRING:
          return coerceHexValue(ast.value);

        default:
          throw new GraphQLError("invalid hex value");
      }
    }
  });
}

export const HexValue = createHexValueGraphQLScalarType({
  byteLength: 0,
  description: "A value encoded as a hexadecimal string",
  name: "HexValue"
});

export const EthereumTransactionHashHexValue = createHexValueGraphQLScalarType({
  byteLength: 32,
  description:
    "An Ethereum transaction hash encoded as a hexadecimal string (32 bytes)",
  name: "EthereumTransactionHashHexValue"
});

export const EthereumBlockHashHexValue = createHexValueGraphQLScalarType({
  byteLength: 32,
  description:
    "An Ethereum block hash encoded as a hexadecimal string (32 bytes)",
  name: "EthereumBlockHashHexValue"
});
