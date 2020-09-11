import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class HttpService {
  constructor(private http: HttpClient) { }

  url = 'https://preview-demo-mm.azure-api.net/private/api/management/apis?';

  async getCharacters() {
    await  this
      .http
      .get(this.url).subscribe(data => {
        return data;
      });
  }
}

