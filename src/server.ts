import 'express-async-errors';
import { graphqlHTTP } from 'express-graphql';
import { json } from 'body-parser';
import { resolvers, schemas } from './Graphql-tool';
import config from './appConfig';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import graphqlPlayground from 'graphql-playground-middleware-express';
import mongoose from 'mongoose';
import router from '@/routers';
import session from 'express-session';
import { NotFoundError } from './errors/NotFoundError';
import { errorHandler } from './middlewares/error-handler';
import socketlization from 'express-ws';
import websocketApp from './websocket';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger-docs/swagget-config';

export const start = async () => {
    try {
        const app: any = express();
        socketlization(app);

        app.use(json());
        app.use(cors());
        app.use(cookieParser());
        app.use(session(config.sessionConfig));

        // web socket
        app.use(websocketApp);

        // swagger
        if (config.MODE === 'DEVELOPMENT') {
            app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        }

        // TODO: 这边要有 一个 middleware 来检查 用户 的 session

        // #region graphql 
        app.use(
            '/graphql',
            graphqlHTTP({
                schema: schemas,
                rootValue: { ...resolvers.Query, ...resolvers.Mutations },
                graphiql: true,
            })
        );

        app.get('/playground', graphqlPlayground({ endpoint: '/graphql' }));
        // #endregion

        // database 
        await mongoose.connect(config.MONGO_URI);

        
        // routers 
        app.use(router);

        //#region error handlers
        app.all('*', async (_, __, next) => {
            const err = new NotFoundError();
            next(err);
        });

        app.use(errorHandler);
        //#endregion

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
