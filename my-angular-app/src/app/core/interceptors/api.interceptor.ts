import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpContextToken } from '@angular/common/http';
import { Observable } from 'rxjs';

export const SERVICE_NAME = new HttpContextToken<null | 'CM_SAAS' | 'SC_SAAS'>(() => null);

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private baseUrls = {
    CM_SAAS: 'https://api.cm-saas.com',
    SC_SAAS: 'https://api.sc-saas.com'
  };

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const serviceName = req.context.get(SERVICE_NAME);

    if (serviceName && this.baseUrls[serviceName]) {
      const modifiedReq = req.clone({
        url: `${this.baseUrls[serviceName]}${req.url}`
      });
      return next.handle(modifiedReq);
    }

    return next.handle(req);
  }
}
