export default class Site {
  private name!: string;
  private url!: string;

  constructor(name: string, url: string) {
    this.setName(name);
    this.setUrl(url);
  }

  getName(): Site['name'] {
    return this.name;
  }
  setName(name: Site['name']) {
    this.name = name;
  }

  getUrl(): Site['url'] {
    return this.url;
  }
  setUrl(url: Site['url']) {
    this.url = url;
  }
}