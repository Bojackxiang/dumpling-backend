import 'express-async-errors';
import { graphqlHTTP } from 'express-graphql';
import { json } from 'body-parser';
import { resolvers, schemas } from './Graphql-tool';
import config from './config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import graphqlPlayground from 'graphql-playground-middleware-express';
import mongoose from 'mongoose';
import router from './routers';
import session from 'express-session';
import { NotFoundError } from './errors/NotFoundError';
import { errorHandler } from './middlewares/error-handler';

export const start = async () => {
    try {
        const app = express();
        app.use(json());
        app.use(cors());
        app.use(cookieParser());
        app.use(session(config.sessionConfig));

        // TODO: 这边要有 一个 middleware 来检查 用户 的 session
        app.use(
            '/graphql',
            graphqlHTTP({
                schema: schemas,
                rootValue: { ...resolvers.Query, ...resolvers.Mutations },
                graphiql: true,
            })
        );

        await mongoose.connect(config.MONGO_URI);
        app.get('/playground', graphqlPlayground({ endpoint: '/graphql' }));
        app.use(router);

        app.all('*', async (_, __, next) => {
            const err = new NotFoundError();
            next(err);
        });

        app.use(errorHandler);

        app.listen(config.BACKEND_PORT, () => {
            if (config.MODE === 'DEVELOPMENT') {
                console.log(config);
                console.log(
                    `starting ...... MODE: ${config.MODE} ...... PORT: ${config.BACKEND_PORT}`
                );
            }
        });
    } catch (error) {
        throw error;
    }
};

export default start;
