import express from 'express';
import baseRoutingFunction from './base';
import { Index } from '../controllers/Index';

const router = express.Router();

router
  .get('/', baseRoutingFunction(Index, false));

export default router;
