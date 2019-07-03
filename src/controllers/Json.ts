import BaseController from './Base';

export class Json extends BaseController {
  private value: string = 'value';

  async run() {
    this.res.locals.json = {
      key: this.value,
    };
  }
}

export class Yahoo extends BaseController {
  private value: string = 'yahoo';
  
  async run() {
    this.res.locals.json = {
      site: this.value,
    };
  }
}