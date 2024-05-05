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
    bearerAuth: {
      type: 'apiKey',
      in: 'header', // can be 'header', 'query' or 'cookie'
      name: 'Authorization', // name of the header, query parameter or cookie
      description: '請加上 Bearer "Token" 以取得授權'
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
