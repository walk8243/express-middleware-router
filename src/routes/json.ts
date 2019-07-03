import express from 'express';
import baseRoutingFunction from './base';
import { Json, Yahoo } from '../controllers/Json';

const router = express.Router();

router
  .get('/', baseRoutingFunction(Json))
  .get('/yahoo', baseRoutingFunction(Yahoo));

router
  .use((req, res) => {
    res.send(res.locals.json);
  });

export default router;
