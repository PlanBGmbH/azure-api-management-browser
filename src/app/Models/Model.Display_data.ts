export class Display_data {

  constructor(name: string, id: string, path: string, serviceUrl: string) {

    this.name = name;
    this.id = id;
    this.path = path;
    this.serviceUrl = serviceUrl;
  }

  name?: string;
  id?: string;
  path?: string;
  serviceUrl?: string;
}

