import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export function BaseResource(path: string, serviceName: 'CM_SAAS' | 'SC_SAAS') {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      http = inject(HttpClient);
      basePath = path;
      serviceName = serviceName;
    };
  };
}