import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import config from "./config";
import { resolvers, schemas } from "./Graphql-tool";

export const start = () => {
    const app = express();

    app.use(
        "/graphql",
        graphqlHTTP({
            schema: schemas,
            rootValue: { ...resolvers.Query, ...resolvers.Mutations },
            graphiql: true,
        })
    );
    
    app.get("/test", (req, res) => {
        res.send("Hello World!");
    });

    app.get("/tes2", (req, res) => {
        res.send("Hello World!");
    });


    app.listen(config.port, () => {
        console.log("starting .....");
    });
};


export default start;
