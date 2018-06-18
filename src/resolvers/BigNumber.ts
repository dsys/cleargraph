import { BigNumber as BigNumberValue } from "bignumber.js";
import { GraphQLScalarType } from "graphql";
import { GraphQLError } from "graphql/error";
import { Kind } from "graphql/language";

export function coerceBigNumber(value: string | number): BigNumberValue {
  return new BigNumberValue(value);
}

export const BigNumber = new GraphQLScalarType({
  description: "An arbitrary precision value representing a number",
  name: "BigNumber",
  parseValue: coerceBigNumber,
  serialize(val) {
    return coerceBigNumber(val).toString();
  },
  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.STRING:
      case Kind.INT:
      case Kind.FLOAT:
        return coerceBigNumber(ast.value);

      default:
        throw new GraphQLError("invalid number value");
    }
  }
});
