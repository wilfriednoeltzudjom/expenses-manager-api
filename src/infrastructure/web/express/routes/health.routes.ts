import { Router } from 'express';

import { SERVER_IS_RUNNING } from '@/application/messages/common.messages';
import { HttpResponse } from '@/application/payloads/http-response';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check if the server is running
 *     responses:
 *       '200':
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     timestamp:
 *                       type: string
 *                       example: 2021-01-01T00:00:00.000Z
 */
router.get('/', (req, res) => {
  const httpResponse = HttpResponse.succeeded({ timestamp: new Date().toISOString() }, SERVER_IS_RUNNING);

  res.status(httpResponse.statusCode).json(httpResponse.toJSON());
});

export default router;
