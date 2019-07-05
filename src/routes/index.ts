import express from 'express';
import createRoutingFunction from './base';
import { Index } from '../controllers/Index';

const router = express.Router();

router
  .get('/', createRoutingFunction(Index, false));

export default router;
