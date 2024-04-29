import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',
    title: 'API',
    description: 'API Documentation Sample'
  },
  host: 'localhost:3006',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    JWT: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: '請加上 Bearer Token 以取得授權'
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./app.ts'];

swaggerAutogen()(outputFile, routes, doc)
  .then(() => {
    console.log('Swagger file created successfully.');
  })
  .catch((err) => {
    console.error(err);
  });
