// swagger.ts

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de ejemplo',
      version: '1.0.0',
      description: 'Documentación de la API de ejemplo en TypeScript con Express y Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de express',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Rutas donde se encuentran tus controladores
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app : any) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
