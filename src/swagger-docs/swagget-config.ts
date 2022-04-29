import swaggerJSDoc from 'swagger-jsdoc';

// Swagger definition
const swaggerDefinition = {
    info: {
        title: 'REST API for my App',
        version: '1.0.0',
        description: 'This is the REST API for my product',
    },
    host: 'localhost:3001',
    basePath: '/api',
};


const options = {
    swaggerDefinition,
    apis: ['src/swagger-docs/router-user.yaml'],
}

// initialize swagger-jsdoc
export const swaggerSpec = swaggerJSDoc(options);