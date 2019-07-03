import { Response, Request } from 'express';

export default class Base {
  constructor(protected req: Request, protected res: Response) {}

  async run() {}
}
