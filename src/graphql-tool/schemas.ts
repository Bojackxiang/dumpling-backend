import { buildSchema } from "graphql";

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

type Mutation {
    hello2: String
    signUp(input: signUpInput): Void
}
`);


export default schemas;