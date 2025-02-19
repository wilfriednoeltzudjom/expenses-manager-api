import { Express } from 'express';
import { join } from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export function setupSwagger(app: Express, port: number) {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'AI Expenses Manager API',
        version: '1.0.0',
        description: 'API documentation for AI Expenses Manager',
      },
      servers: [
        {
          url: process.env.API_URL ?? `http://localhost:${port}`,
          description: 'Development server',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    apis: [join(__dirname, '../routes/*.ts')],
  };
  const specs = swaggerJsdoc(options);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}
