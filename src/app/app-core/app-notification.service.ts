import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AppNotificationService {

  private showNotificationSource = new BehaviorSubject<boolean>(false);
  showNotification = this.showNotificationSource.asObservable();

  private notificationSource = new BehaviorSubject<any>({});
  notification = this.notificationSource.asObservable();

  constructor() { }

  displayNotification(options?:any) : void {
    options = (options) ? options : {};
    console.info('[AppNotificationService] showNotification', options);

    this.notificationSource.next(options);
    this.showNotificationSource.next(true);

    setTimeout(()=> {
      this.resetNotification();
    }, 5000);
  }

  resetNotification() : void {
    this.notificationSource.next({});
    this.showNotificationSource.next(false);
  }
}
