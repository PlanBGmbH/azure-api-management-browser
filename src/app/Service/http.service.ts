import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Service } from '../Models/Model.Service';
import { Apis } from '../Models/Model.Apis';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class HttpService {
  constructor(private http: HttpClient) { }

  urlServiceProd = 'https://preview-demo-mm01.azure-api.net/private/api/management/apis/';
  urlServiceStaged = 'https://preview-demo-mm01.azure-api.net/private/api/management/dev/apis/';

  getListByService(viewDataToggle: boolean): Observable<Service> {
    if (viewDataToggle) {
      return this
        .http
        .get<Service>(this.urlServiceProd);
    } else {
      return this
        .http
        .get<Service>(this.urlServiceStaged);
    }

  }

  getListByApi(param: string, viewDataToggle: boolean): Observable<Apis> {
    if (viewDataToggle) {
      return this
        .http
        .get<Apis>(this.urlServiceProd + param);
    } else {
      return this
        .http
        .get<Apis>(this.urlServiceStaged + param);
    }

  }
}

