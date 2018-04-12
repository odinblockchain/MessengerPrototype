import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AppHeaderService {

  private messageSource = new BehaviorSubject<string>("default message");
  currentMessage = this.messageSource.asObservable();

  private titleSource = new BehaviorSubject<string>("App Title");
  title = this.titleSource.asObservable();

  private showBackActionSource = new BehaviorSubject<boolean>(false);
  showBackAction = this.showBackActionSource.asObservable();

  private showMenuActionSource = new BehaviorSubject<boolean>(true);
  showMenuAction = this.showMenuActionSource.asObservable();

  private actionMenuSource = new BehaviorSubject<any>([]);
  actionMenu = this.actionMenuSource.asObservable();

  constructor() {
    this.titleSource.next('Loading');
    this.actionMenuSource.next([]);
  }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  setAppHeader(headerOpts : any) {
    if (headerOpts.hasOwnProperty('title')) {
      this.titleSource.next(headerOpts['title']);
    }

    if (headerOpts.hasOwnProperty('showBackAction')) {
      this.showBackActionSource.next(headerOpts['showBackAction']);
    }

    if (headerOpts.hasOwnProperty('showMenuAction')) {
      this.showBackActionSource.next(false);
      this.showMenuActionSource.next(true);
    }

    if (headerOpts.hasOwnProperty('actions')) {
      console.info('[AppHeaderService] Actions', headerOpts);
      this.actionMenuSource.next(headerOpts['actions']);
    }
  }
}
