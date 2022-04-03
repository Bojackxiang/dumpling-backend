import { graphqlHTTP } from "express-graphql";
import { json } from "body-parser";
import { resolvers, schemas } from "./Graphql-tool";
import config from "./config";
import cors from "cors";
import express from "express";
import graphqlPlayground from "graphql-playground-middleware-express";
import mongoose from "mongoose";
import router from "./routers";
import session from 'express-session'
import cookieParser from 'cookie-parser'

export const start = async () => {
  try {
    const app = express();
    app.use(json());
    app.use(cors());
    app.use(cookieParser());
    app.use(session(config.sessionConfig));
    
  app.get("/set-session", (request:any, response) => {
    request.session.name = "yunmu";
    request.session.email = "yunmuteacher@qq.com";
    response.send("登录成功");
  });

  app.get("/get-session", (request: any, response) => {
    //读取session
    //用户名
    console.log("当前登录的用户为" + request.session.name);
    console.log("当前登录的邮箱为" + request.session.email);
    response.send("个人中心");
  });
  

    app.use(
      "/graphql",
      graphqlHTTP({
        schema: schemas,
        rootValue: { ...resolvers.Query, ...resolvers.Mutations },
        graphiql: true,
      })
    );

    // await mongoose.connect(config.MONGO_URI);
    app.get("/playground", graphqlPlayground({ endpoint: "/graphql" }));
    app.use(router);

    app.listen(config.BACKEND_PORT, () => {
      console.log(
        `starting ..... MODE: ${config.MODE} ....., PORT: ${config.BACKEND_PORT}`
      );
    });
  } catch (error) {
    throw error;
  }
};

export default start;
