import express from 'express';
import { Index } from '../controllers/Index';

const router = express.Router();

router
  .get('/', async (req, res, next) => {
    const index = new Index(req, res);
    await index.run();
  });

export default router;
