import { Injectable } from '@angular/core';

@Injectable()
export class IdentityService {
  public personalKey  = 'xxx1';
  public personalName = 'Me';

  constructor() { }
}
