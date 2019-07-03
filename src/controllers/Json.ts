import { Base } from "./Base";

export class Json extends Base {
  private value: string = 'value';

  async run() {
    this.res.locals.json = {
      key: this.value,
    };
  }
}

export class Yahoo extends Base {
  private value: string = 'yahoo';
  
  async run() {
    this.res.locals.json = {
      site: this.value,
    };
  }
}