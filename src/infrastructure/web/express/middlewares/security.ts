import { Express } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { config } from '@/config/environment';

export function setupSecurity(app: Express) {
  app.use(helmet());

  const limiter = rateLimit({
    windowMs: config.RATE_LIMIT_WINDOW_MS,
    max: config.RATE_LIMIT_MAX,
  });

  app.use('/api/', limiter);

  app.disable('x-powered-by');
}
