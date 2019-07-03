import { Response, Request, NextFunction } from 'express';
import BaseController from '../controllers/Base';

export default function base(Controller: new (req: Request, res: Response) => BaseController, isNext: boolean = true) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const controller = new Controller(req, res);
    await controller.run();
    if(isNext) { next(); }
  }
}