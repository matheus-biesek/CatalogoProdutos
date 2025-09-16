import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiBaseUrlInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (request.url.startsWith('/')) {
      const modifiedRequest = request.clone({
        url: `${environment.apiUrl}${request.url}`
      });
      return next.handle(modifiedRequest);
    }

    return next.handle(request);
  }
}