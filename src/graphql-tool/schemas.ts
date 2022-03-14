import { buildSchema } from "graphql";

const schemas = buildSchema(`
type User {
    username: String
}
type Query {
    hello: User
}

type Mutation {
    hello2: String
}
`);


export default schemas;