import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import * as mongoose from "mongoose";
import config from "./config";
import { resolvers, schemas } from "./Graphql-tool";

export const start = async () => {
  try {
    const app = express();
    
    await mongoose.connect(config.MONGO_URI);

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
  } catch (error) {
    throw error
  }
};

export default start;
