import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpContextToken } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define a context token for serviceName
export const SERVICE_NAME = new HttpContextToken<null | 'CM_SAAS' | 'SC_SAAS'>(() => null);

const baseUrls = {
  CM_SAAS: 'https://api.cm-saas.com',
  SC_SAAS: 'https://api.sc-saas.com'
};

export const apiInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<any> => {
  const serviceName = req.context.get(SERVICE_NAME);

  if (serviceName && baseUrls[serviceName]) {
    const modifiedReq = req.clone({
      url: `${baseUrls[serviceName]}${req.url}`
    });
    return next(modifiedReq);
  }

  return next(req);
};
