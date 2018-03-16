import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {Observable} from 'rxjs/Observable';

@Injectable()
export class AppModalService {

  private showModalSource = new BehaviorSubject<boolean>(false);
  showModal = this.showModalSource.asObservable();

  private modalSource = new BehaviorSubject<any>({});
  modal = this.modalSource.asObservable();

  private modalObserver = null;

  constructor() { }

  showConfirmModal(options?:any) : Observable<boolean> {
    return new Observable(observer => {
      options = (options) ? options : {};
      console.log('showConfirmModal', options);

      options.type = 'confirm';
      this.modalSource.next(options);
      this.showModalSource.next(true);

      this.modalObserver = observer;
    });
  }

  showNoticeModal(options?:any) : Observable<boolean> {
    console.log('...showNoticeModal');
    return new Observable(observer => {
      options = (options) ? options : {};
      console.log('showNoticeModal', options);

      options.type = 'notice';
      this.modalSource.next(options);
      this.showModalSource.next(true);

      this.modalObserver = observer;
    });
  }

  onModalClick = (e) : void => {
    console.log('onModalClick', e);
  }

  onConfirmAction = (action?:boolean) : void => {
    console.log('onConfirmAction', action);

    this.showModalSource.next(false);
    if (this.modalObserver !== null) {
      this.modalObserver.next(action);
      this.modalObserver.complete();
      this.modalObserver = null;
    }
  }
}
