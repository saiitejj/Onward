import express, { Router } from 'express';
import prisma from '../lib/db.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router=new Router();

router.use(authMiddleware);

export default router;