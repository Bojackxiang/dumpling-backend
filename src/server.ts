import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import * as mongoose from "mongoose";
import config from "./config";
import { resolvers, schemas } from "./Graphql-tool";
import { json } from 'body-parser';
import router from "./routers";

export const start = async () => {
  try {
    
    const app = express();
    app.use(json());
    
    app.use(
      "/graphql",
      graphqlHTTP({
        schema: schemas,
        rootValue: { ...resolvers.Query, ...resolvers.Mutations },
        graphiql: true,
      })
    );
    
    await mongoose.connect(config.MONGO_URI);

    app.use(router)

    app.listen(config.port, () => {
      console.log("starting .....");
    });
  } catch (error) {
    throw error
  }
};

export default start;
