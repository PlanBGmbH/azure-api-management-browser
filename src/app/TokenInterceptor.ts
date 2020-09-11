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
        'Ocp-Apim-Subscription-Key': '272101d76e92479c9762f658ecff0dc3',
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
    return next.handle(request);
  }
}
