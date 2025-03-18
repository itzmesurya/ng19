import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface BaseResourceOptions {
    path: string;
    serviceName: 'CM_SAAS' | 'SC_SAAS';
    // Future properties can be added here
}

export function BaseResource(options: BaseResourceOptions) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      basePath = options.path;
      serviceName = options.serviceName;
      http = inject(HttpClient);
    };
  };
}
