import BaseController from './Base';
import Site from '../models/Site';
import Random from '../utils/Random';

export class Json extends BaseController {
  async run() {
    this.res.locals.json = {
      key: Random.getString(10),
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
