import 'reflect-metadata';

import { config } from './config/environment';
import { logger } from './infrastructure/logging/logger';
import { bootstrap } from './infrastructure/web/express';

function startServer() {
  bootstrap(config.PORT)
    .then(() => {
      logger.info(`Server running on port ${config.PORT}`);
      logger.info(`Environment: ${config.NODE_ENV}`);
      logger.info(`Swagger documentation available at http://localhost:${config.PORT}/api-docs`);
    })
    .catch((error) => {
      logger.error('Application failed to start', { error });
      process.exit(1);
    });
}
startServer();
