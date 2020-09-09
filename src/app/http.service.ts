import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const headers = new HttpHeaders()
  .set('Ocp-Apim-Subscription-Key', '272101d76e92479c9762f658ecff0dc3');

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private http: HttpClient) { }
  url = 'https://preview-demo-mm.azure-api.net/private/api/management/apis?';

  getCharacters() {
    return this
      .http
      .get(`${this.url}`, { headers });
  }
}

