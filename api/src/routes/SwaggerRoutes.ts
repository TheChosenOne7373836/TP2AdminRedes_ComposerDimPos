// routes/example.ts

import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @swagger
 * /conductores/all:
 *   get:
 *     summary: Obtiene todos los conductores
 *     description: Obtiene todos los conductores de la base en formato json
 *     responses:
 *       200:
 *         description: Se obtuvieron los conductores con exito
 */
router.get('/conductores/all', (req: Request, res: Response) => {
  res.status(200).send('Este es un ejemplo de la API');
});
/**
 * @swagger
 * /programas/all:
 *   get:
 *     summary: Obtiene todos los programas
 *     description: Obtiene todos los programas de la base en formato json
 *     responses:
 *       200:
 *         description: Se obtuvieron los programas con exito
 */
router.get('/programas/all', (req: Request, res: Response) => {
    res.status(200).send('Este es un ejemplo de la API2');
});

export default router;
