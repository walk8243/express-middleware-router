import BaseController from './Base';

export class Index extends BaseController {
  async run() {
    this.res.send('index');
  } 
}