import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Ocp-Apim-Subscription-Key': '9deca1fa39b94d20ad4bea64b38bb439',
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
    return next.handle(request);
  }
}
