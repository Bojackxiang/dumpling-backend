import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import config from "./config";
import { resolvers, schemas } from "./graphql";

const start = () => {
  const app = express();

  app.use(
      '/graphql',
      graphqlHTTP({
          schema: schemas,
          rootValue: resolvers,
          graphiql: true,
      }),
  );

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(config.port, () => {
    console.log("starting .....");
  });
};

export default start;
