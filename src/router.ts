import express from 'express';

import indexRouter from './routes/index';

const router = express.Router();

router
  .use('/', indexRouter);

export default router;
