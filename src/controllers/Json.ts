import BaseController from './Base';
import Site from '../models/Site';

export class Json extends BaseController {
  private value: string = 'value';

  async run() {
    this.res.locals.json = {
      key: this.value,
    };
  }
}

export class Yahoo extends BaseController {
  async run() {
    const site = new Site('yahoo', 'https://yahoo.co.jp');

    this.res.locals.json = {
      site: {
        name: site.getName(),
        url: site.getUrl(),
      },
    };
  }
}