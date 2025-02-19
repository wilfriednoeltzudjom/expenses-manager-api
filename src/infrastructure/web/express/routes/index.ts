import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware';
import authRouter from './auth.routes';
import expensesRouter from './expenses.routes';
import healthRouter from './health.routes';

export function createRouter() {
  const router = Router();

  router.use('/health', healthRouter);
  router.use('/auth', authRouter);
  router.use('/expenses', authMiddleware, expensesRouter);

  return router;
}
