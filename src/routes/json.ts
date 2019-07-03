import express from 'express';
import { Json, Yahoo } from '../controllers/Json';

const router = express.Router();

router
  .get('/', async (req, res, next) => {
    const json = new Json(req, res);
    await json.run();
    next();
  })
  .get('/yahoo', async (req, res, next) => {
    const yahoo = new Yahoo(req, res);
    await yahoo.run();
    next();
  });

router
  .use((req, res) => {
    res.send(res.locals.json);
  });

export default router;
