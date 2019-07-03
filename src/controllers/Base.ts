import { Response, Request } from "express";

export class Base {
  constructor(protected req: Request, protected res: Response) {}

  async run() {}
}
