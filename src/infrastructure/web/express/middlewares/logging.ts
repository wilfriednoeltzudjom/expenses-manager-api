import { Express } from 'express';
import morgan from 'morgan';

import { logger } from '@/infrastructure/logging/logger';

export function setupLogging(app: Express) {
  app.use(
    morgan('combined', {
      stream: {
        write: function (message: string) {
          logger.info(message.substring(0, message.lastIndexOf('\n')));
        },
      },
    }),
  );
}
