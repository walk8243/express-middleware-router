import express from 'express';

const router = express.Router();

router
  .get('/', (req, res, next) => {
    res.locals.json = {
      key: 'value',
    };
    next();
  })
  .get('/yahoo', (req, res, next) => {
    res.locals.json = {
      site: 'yahoo',
    };
    next();
  });

router
  .use((req, res) => {
    res.send(res.locals.json);
  });

export default router;
