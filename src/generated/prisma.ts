import { GraphQLResolveInfo, GraphQLSchema } from "graphql";
import { Options } from "graphql-binding";
import { IResolvers } from "graphql-tools/dist/Interfaces";
import { BasePrismaOptions, makePrismaBindingClass } from "prisma-binding";

export interface Query {
  phoneNumbers: <T = PhoneNumber[]>(
    args: {
      where?: PhoneNumberWhereInput;
      orderBy?: PhoneNumberOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  phoneNumber: <T = PhoneNumber | null>(
    args: { where: PhoneNumberWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  phoneNumbersConnection: <T = PhoneNumberConnection>(
    args: {
      where?: PhoneNumberWhereInput;
      orderBy?: PhoneNumberOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  node: <T = Node | null>(
    args: { id: ID_Output },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
}

export interface Mutation {
  createPhoneNumber: <T = PhoneNumber>(
    args: { data: PhoneNumberCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  updatePhoneNumber: <T = PhoneNumber | null>(
    args: { data: PhoneNumberUpdateInput; where: PhoneNumberWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  deletePhoneNumber: <T = PhoneNumber | null>(
    args: { where: PhoneNumberWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  upsertPhoneNumber: <T = PhoneNumber>(
    args: {
      where: PhoneNumberWhereUniqueInput;
      create: PhoneNumberCreateInput;
      update: PhoneNumberUpdateInput;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  updateManyPhoneNumbers: <T = BatchPayload>(
    args: { data: PhoneNumberUpdateInput; where?: PhoneNumberWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
  deleteManyPhoneNumbers: <T = BatchPayload>(
    args: { where?: PhoneNumberWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>;
}

export interface Subscription {
  phoneNumber: <T = PhoneNumberSubscriptionPayload | null>(
    args: { where?: PhoneNumberSubscriptionWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<AsyncIterator<T>>;
}

export interface Exists {
  PhoneNumber: (where?: PhoneNumberWhereInput) => Promise<boolean>;
}

export interface Prisma {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
  exists: Exists;
  request: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;
  delegate(
    operation: "query" | "mutation",
    fieldName: string,
    args: {
      [key: string]: any;
    },
    infoOrQuery?: GraphQLResolveInfo | string,
    options?: Options
  ): Promise<any>;
  delegateSubscription(
    fieldName: string,
    args?: {
      [key: string]: any;
    },
    infoOrQuery?: GraphQLResolveInfo | string,
    options?: Options
  ): Promise<AsyncIterator<any>>;
  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new (options: BasePrismaOptions): T;
}
/**
 * Type Defs
 */

const typeDefs = `type AggregatePhoneNumber {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

scalar DateTime

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createPhoneNumber(data: PhoneNumberCreateInput!): PhoneNumber!
  updatePhoneNumber(data: PhoneNumberUpdateInput!, where: PhoneNumberWhereUniqueInput!): PhoneNumber
  deletePhoneNumber(where: PhoneNumberWhereUniqueInput!): PhoneNumber
  upsertPhoneNumber(where: PhoneNumberWhereUniqueInput!, create: PhoneNumberCreateInput!, update: PhoneNumberUpdateInput!): PhoneNumber!
  updateManyPhoneNumbers(data: PhoneNumberUpdateInput!, where: PhoneNumberWhereInput): BatchPayload!
  deleteManyPhoneNumbers(where: PhoneNumberWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type PhoneNumber {
  hashedPhoneNumber: String!
  address: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""A connection to a list of items."""
type PhoneNumberConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [PhoneNumberEdge]!
  aggregate: AggregatePhoneNumber!
}

input PhoneNumberCreateInput {
  hashedPhoneNumber: String!
  address: String!
}

"""An edge in a connection."""
type PhoneNumberEdge {
  """The item at the end of the edge."""
  node: PhoneNumber!

  """A cursor for use in pagination."""
  cursor: String!
}

enum PhoneNumberOrderByInput {
  hashedPhoneNumber_ASC
  hashedPhoneNumber_DESC
  address_ASC
  address_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  id_ASC
  id_DESC
}

type PhoneNumberPreviousValues {
  hashedPhoneNumber: String!
  address: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type PhoneNumberSubscriptionPayload {
  mutation: MutationType!
  node: PhoneNumber
  updatedFields: [String!]
  previousValues: PhoneNumberPreviousValues
}

input PhoneNumberSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [PhoneNumberSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [PhoneNumberSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PhoneNumberSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PhoneNumberWhereInput
}

input PhoneNumberUpdateInput {
  hashedPhoneNumber: String
  address: String
}

input PhoneNumberWhereInput {
  """Logical AND on all given filters."""
  AND: [PhoneNumberWhereInput!]

  """Logical OR on all given filters."""
  OR: [PhoneNumberWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PhoneNumberWhereInput!]
  hashedPhoneNumber: String

  """All values that are not equal to given value."""
  hashedPhoneNumber_not: String

  """All values that are contained in given list."""
  hashedPhoneNumber_in: [String!]

  """All values that are not contained in given list."""
  hashedPhoneNumber_not_in: [String!]

  """All values less than the given value."""
  hashedPhoneNumber_lt: String

  """All values less than or equal the given value."""
  hashedPhoneNumber_lte: String

  """All values greater than the given value."""
  hashedPhoneNumber_gt: String

  """All values greater than or equal the given value."""
  hashedPhoneNumber_gte: String

  """All values containing the given string."""
  hashedPhoneNumber_contains: String

  """All values not containing the given string."""
  hashedPhoneNumber_not_contains: String

  """All values starting with the given string."""
  hashedPhoneNumber_starts_with: String

  """All values not starting with the given string."""
  hashedPhoneNumber_not_starts_with: String

  """All values ending with the given string."""
  hashedPhoneNumber_ends_with: String

  """All values not ending with the given string."""
  hashedPhoneNumber_not_ends_with: String
  address: String

  """All values that are not equal to given value."""
  address_not: String

  """All values that are contained in given list."""
  address_in: [String!]

  """All values that are not contained in given list."""
  address_not_in: [String!]

  """All values less than the given value."""
  address_lt: String

  """All values less than or equal the given value."""
  address_lte: String

  """All values greater than the given value."""
  address_gt: String

  """All values greater than or equal the given value."""
  address_gte: String

  """All values containing the given string."""
  address_contains: String

  """All values not containing the given string."""
  address_not_contains: String

  """All values starting with the given string."""
  address_starts_with: String

  """All values not starting with the given string."""
  address_not_starts_with: String

  """All values ending with the given string."""
  address_ends_with: String

  """All values not ending with the given string."""
  address_not_ends_with: String
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
}

input PhoneNumberWhereUniqueInput {
  hashedPhoneNumber: String
}

type Query {
  phoneNumbers(where: PhoneNumberWhereInput, orderBy: PhoneNumberOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PhoneNumber]!
  phoneNumber(where: PhoneNumberWhereUniqueInput!): PhoneNumber
  phoneNumbersConnection(where: PhoneNumberWhereInput, orderBy: PhoneNumberOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PhoneNumberConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Subscription {
  phoneNumber(where: PhoneNumberSubscriptionWhereInput): PhoneNumberSubscriptionPayload
}
`;

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({
  typeDefs
});

/**
 * Types
 */

export type PhoneNumberOrderByInput =
  | "hashedPhoneNumber_ASC"
  | "hashedPhoneNumber_DESC"
  | "address_ASC"
  | "address_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC"
  | "id_ASC"
  | "id_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export interface PhoneNumberCreateInput {
  hashedPhoneNumber: String;
  address: String;
}

export interface PhoneNumberWhereUniqueInput {
  hashedPhoneNumber?: String;
}

export interface PhoneNumberUpdateInput {
  hashedPhoneNumber?: String;
  address?: String;
}

export interface PhoneNumberSubscriptionWhereInput {
  AND?: PhoneNumberSubscriptionWhereInput[] | PhoneNumberSubscriptionWhereInput;
  OR?: PhoneNumberSubscriptionWhereInput[] | PhoneNumberSubscriptionWhereInput;
  NOT?: PhoneNumberSubscriptionWhereInput[] | PhoneNumberSubscriptionWhereInput;
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: PhoneNumberWhereInput;
}

export interface PhoneNumberWhereInput {
  AND?: PhoneNumberWhereInput[] | PhoneNumberWhereInput;
  OR?: PhoneNumberWhereInput[] | PhoneNumberWhereInput;
  NOT?: PhoneNumberWhereInput[] | PhoneNumberWhereInput;
  hashedPhoneNumber?: String;
  hashedPhoneNumber_not?: String;
  hashedPhoneNumber_in?: String[] | String;
  hashedPhoneNumber_not_in?: String[] | String;
  hashedPhoneNumber_lt?: String;
  hashedPhoneNumber_lte?: String;
  hashedPhoneNumber_gt?: String;
  hashedPhoneNumber_gte?: String;
  hashedPhoneNumber_contains?: String;
  hashedPhoneNumber_not_contains?: String;
  hashedPhoneNumber_starts_with?: String;
  hashedPhoneNumber_not_starts_with?: String;
  hashedPhoneNumber_ends_with?: String;
  hashedPhoneNumber_not_ends_with?: String;
  address?: String;
  address_not?: String;
  address_in?: String[] | String;
  address_not_in?: String[] | String;
  address_lt?: String;
  address_lte?: String;
  address_gt?: String;
  address_gte?: String;
  address_contains?: String;
  address_not_contains?: String;
  address_starts_with?: String;
  address_not_starts_with?: String;
  address_ends_with?: String;
  address_not_ends_with?: String;
  createdAt?: DateTime;
  createdAt_not?: DateTime;
  createdAt_in?: DateTime[] | DateTime;
  createdAt_not_in?: DateTime[] | DateTime;
  createdAt_lt?: DateTime;
  createdAt_lte?: DateTime;
  createdAt_gt?: DateTime;
  createdAt_gte?: DateTime;
  updatedAt?: DateTime;
  updatedAt_not?: DateTime;
  updatedAt_in?: DateTime[] | DateTime;
  updatedAt_not_in?: DateTime[] | DateTime;
  updatedAt_lt?: DateTime;
  updatedAt_lte?: DateTime;
  updatedAt_gt?: DateTime;
  updatedAt_gte?: DateTime;
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output;
}

export interface AggregatePhoneNumber {
  count: Int;
}

export interface PhoneNumber {
  hashedPhoneNumber: String;
  address: String;
  createdAt: DateTime;
  updatedAt: DateTime;
}

export interface PhoneNumberPreviousValues {
  hashedPhoneNumber: String;
  address: String;
  createdAt: DateTime;
  updatedAt: DateTime;
}

export interface PhoneNumberSubscriptionPayload {
  mutation: MutationType;
  node?: PhoneNumber;
  updatedFields?: String[];
  previousValues?: PhoneNumberPreviousValues;
}

/*
 * An edge in a connection.

 */
export interface PhoneNumberEdge {
  node: PhoneNumber;
  cursor: String;
}

/*
 * A connection to a list of items.

 */
export interface PhoneNumberConnection {
  pageInfo: PageInfo;
  edges: PhoneNumberEdge[];
  aggregate: AggregatePhoneNumber;
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface BatchPayload {
  count: Long;
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

export type DateTime = Date | string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number;

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string;
