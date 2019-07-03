import { Base } from './Base';

export class Index extends Base {
  async run() {
    this.res.send('index');
  } 
}