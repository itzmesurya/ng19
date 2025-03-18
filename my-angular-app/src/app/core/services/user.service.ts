import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BaseResource } from './base-resource.decorator';

@BaseResource({ path: '/users', serviceName: 'CM_SAAS' })
@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  getUserDetails(userId: string) {
    return this.get(`/${userId}`);
  }
}
