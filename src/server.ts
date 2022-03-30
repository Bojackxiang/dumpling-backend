import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import * as mongoose from "mongoose";
import config from "./config";
import { resolvers, schemas } from "./Graphql-tool";
import { json } from "body-parser";
import router from "./routers";
import graphqlPlayground from "graphql-playground-middleware-express";
import * as cors from 'cors'
export const start = async () => {
  try {
    const app = express();
    app.use(json());
    app.use(cors())

    app.use(
      "/graphql",
      graphqlHTTP({
        schema: schemas,
        rootValue: { ...resolvers.Query, ...resolvers.Mutations },
        graphiql: true,
      })
    );

    await mongoose.connect(config.MONGO_URI);
    app.get("/playground", graphqlPlayground({ endpoint: "/graphql" }));
    app.use(router);

    app.listen(config.BACKEND_PORT, () => {
      console.log(`starting ..... MODE: ${config.MODE} ....., PORT: ${config.BACKEND_PORT}`);
    });
  } catch (error) {
    throw error;
  }
};

export default start;
