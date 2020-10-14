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

  urlService = 'https://preview-demo-mm.azure-api.net/private/api/management/apis/';
  urlAPi = 'https://preview-demo-mm.azure-api.net/private/api/management/apis/';

  getListByService(): Observable<Service> {
    return this
      .http
      .get<Service>(this.urlService);
  }

  getListByApi(param: string): Observable<Apis> {
    return this
      .http
      .get<Apis>(this.urlAPi + param);
  }
}

