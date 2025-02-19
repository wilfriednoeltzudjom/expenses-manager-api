import { NextFunction, Request, Response, Router } from 'express';

import { HttpRequest } from '@/application/payloads/http-request';
import { container } from '@/config/container';
import { AuthController } from '@/controllers/auth.controller';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     SignInResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         statusCode:
 *           type: number
 *         data:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *             user:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Sign in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User signed in successfully
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
 *                   $ref: '#/components/schemas/SignInResponse'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: number
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 */
router.post('/sign-in', (req: Request, res: Response, next: NextFunction) => {
  const authController = container.resolve<AuthController>(AuthController);

  authController
    .signIn(HttpRequest.instance(req))
    .then((httpResponse) => {
      res.status(httpResponse.statusCode).json(httpResponse.toJSON());
    })
    .catch(next);
});

/**
 * @swagger
 * /api/auth/sign-up:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *               - confirmPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input or user already exists
 */
router.post('/sign-up', (req: Request, res: Response, next: NextFunction) => {
  const authController = container.resolve<AuthController>(AuthController);

  authController
    .signUp(HttpRequest.instance(req))
    .then((httpResponse) => {
      res.status(httpResponse.statusCode).json(httpResponse.toJSON());
    })
    .catch(next);
});

export default router;
