import { HttpClient, HttpParams, HttpContext } from '@angular/common/http';
import { SERVICE_NAME } from '../interceptors/api.interceptor';

export abstract class BaseService {
  protected http!: HttpClient;
  protected basePath!: string;
  protected serviceName!: 'CM_SAAS' | 'SC_SAAS';

  constructor() {
    if (!this.http) {
      throw new Error('HttpClient is not available. Ensure BaseResource decorator is used.');
    }
  }

  get<T>(endpoint: string, params?: Record<string, string | number>) {
    return this.http.get<T>(`${this.basePath}${endpoint}`, {
      params: this.toHttpParams(params),
      context: new HttpContext().set(SERVICE_NAME, this.serviceName),
    });
  }

  post<T>(endpoint: string, data: any) {
    return this.http.post<T>(`${this.basePath}${endpoint}`, data, {
      context: new HttpContext().set(SERVICE_NAME, this.serviceName),
    });
  }

  put<T>(endpoint: string, data: any) {
    return this.http.put<T>(`${this.basePath}${endpoint}`, data, {
      context: new HttpContext().set(SERVICE_NAME, this.serviceName),
    });
  }

  delete<T>(endpoint: string, params?: Record<string, string | number>) {
    return this.http.delete<T>(`${this.basePath}${endpoint}`, {
      params: this.toHttpParams(params),
      context: new HttpContext().set(SERVICE_NAME, this.serviceName),
    });
  }

  private toHttpParams(params?: Record<string, string | number>): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.set(key, params[key]);
      });
    }
    return httpParams;
  }
}
