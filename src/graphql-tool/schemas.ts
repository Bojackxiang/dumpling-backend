import { buildSchema } from 'graphql';

const schemas = buildSchema(`
type User {
    username: String
}

scalar Void

input signUpInput {
  email: String!
  password: String!
  nick_name: String! 
  phone: String!
}
type Query {
    hello: User
}

input sampleInput {
  name: String
}

type Mutation {
    hello2(input: sampleInput): String
    signUp(input: signUpInput): Void
}
`);

export default schemas;
