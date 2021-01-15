import { Observable } from 'rxjs';
import { Service } from './Model.Service';

export class PageModel {
    index: number;
    services: Service[];

    constructor(index: number, services: Service[] = null) {
        this.index = index;
        this.services = services;
    }
}
