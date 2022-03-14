
import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import {Test} from "@models";
import config from "./config";
import { resolvers, schemas } from "./graphql-tool";


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
    
    const test = new Test();
    console.log(test)
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
