import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

/* Models */
import { Modal } from './Modal';

@Injectable()
export class AppModalService {

  private showModalSource = new BehaviorSubject<boolean>(false);
  showModal = this.showModalSource.asObservable();

  private modalSource = new BehaviorSubject<any>(Modal);
  modal = this.modalSource.asObservable();

  private modalObserver = null;

  constructor() {
    this.modalSource.next({
      type:'',
      title:'',
      body:''
    })
  }

  showConfirmModal(options?:any) : Observable<boolean> {
    return new Observable(observer => {
      options = (options) ? options : {};
      console.info('[AppModalService] showConfirmModal', options);

      options.type = 'confirm';
      this.modalSource.next(options);
      this.showModalSource.next(true);

      this.modalObserver = observer;
    });
  }

  showNoticeModal(options?:any) : Observable<boolean> {
    return new Observable(observer => {
      options = (options) ? options : {};
      console.info('[AppModalService] showNoticeModal', options);

      options.type = 'notice';
      this.modalSource.next(options);
      this.showModalSource.next(true);

      this.modalObserver = observer;
    });
  }

  onModalClick = () : void => {
    console.info('onModalClick');
  }

  onConfirmAction = (action?:boolean) : void => {
    console.info('[AppModalService] onConfirmAction', action);

    this.showModalSource.next(false);
    if (this.modalObserver !== null) {
      this.modalObserver.next(action);
      this.modalObserver.complete();
      this.modalObserver = null;
    }
  }
}
