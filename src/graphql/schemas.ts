import { buildSchema } from "graphql";

const schemas = buildSchema(`
type Query {
    hello: String
}
type Subscription {
    countDown: Int
}
`);


export default schemas;