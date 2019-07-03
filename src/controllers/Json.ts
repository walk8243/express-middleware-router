import { Base } from "./Base";

export class Json extends Base {
  run() {
    this.res.locals.json = {
      key: 'value',
    };
  }
}
