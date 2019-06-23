import express from 'express';

import indexRouter from './routes/index';
import jsonRouter from './routes/json';

const router = express.Router();

router
  .use('/', indexRouter)
  .use('/json', jsonRouter);

export default router;
