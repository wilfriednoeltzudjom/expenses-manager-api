import cors from 'cors';
import express from 'express';

import { errorMiddleware } from './middlewares/errors.middleware';
import { setupLogging } from './middlewares/logging';
import { setupSecurity } from './middlewares/security';
import { setupSwagger } from './middlewares/swagger';
import { createRouter } from './routes';

export function bootstrap(port: number) {
  const app = express();
  setupSecurity(app);
  setupLogging(app);

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  setupSwagger(app, port);

  app.use('/api', createRouter());

  app.use(errorMiddleware);

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      resolve(server);
    });
  });
}
