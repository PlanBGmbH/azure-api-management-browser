import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { apis } from './apis';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class HttpService {
  constructor(private http: HttpClient) { }

  url = 'https://preview-demo-mm.azure-api.net/private/api/management/apis?';

  getCharacters(): Observable<apis> {
    return this
      .http
      .get<apis>(this.url).pipe(
        map(result => result)
      );
  }
}

