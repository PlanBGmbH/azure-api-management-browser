import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { service } from './service';
import { apis } from './apis';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class HttpService {
  constructor(private http: HttpClient) { }

  urlService = 'https://preview-demo-mm.azure-api.net/private/api/management/apis?';
  urlAPi = "https://preview-demo-mm.azure-api.net/private/api/management/apis/";

  getListByService(): Observable<service> {
    return this
      .http
      .get<service>(this.urlService);
  }

  getListByApi(param: string): Observable<apis> {
    return this
      .http
      .get<apis>(this.urlAPi + param);
  }
}

