import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import * as mongoose from "mongoose";
import config from "./config";
import { resolvers, schemas } from "./Graphql-tool";
import {authRouters} from "./routers";
import { json } from 'body-parser';

export const start = async () => {
  try {
    
    const app = express();
    app.use(json());
    app.use(authRouters);
    app.use(
      "/graphql",
      graphqlHTTP({
        schema: schemas,
        rootValue: { ...resolvers.Query, ...resolvers.Mutations },
        graphiql: true,
      })
    );
    await mongoose.connect(config.MONGO_URI);

    app.get("/test", (req, res) => {
      res.send("Hello World!");
    });

    app.get("/tes2", (req, res) => {
      res.send("Hello World!");
    });

    app.listen(config.port, () => {
      console.log("starting .....");
    });
  } catch (error) {
    throw error
  }
};

export default start;
