import express from 'express';
import createRoutingFunction from './base';
import { Json, Yahoo } from '../controllers/Json';

const router = express.Router();

router
  .get('/', createRoutingFunction(Json))
  .get('/yahoo', createRoutingFunction(Yahoo));

router
  .use((req, res) => {
    res.send(res.locals.json);
  });

export default router;
