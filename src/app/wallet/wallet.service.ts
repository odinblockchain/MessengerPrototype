import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

// Import RxJs required methods
import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import { of }       from 'rxjs/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/publish';

import { Address }  from './address';
import { Transaction }  from './transaction';
import { Wallet }  from './wallet';

import { MockWallet } from './mock/wallet';

import { AppModalService } from '../app-modal.service';

import { uuid } from './uuid';

@Injectable()
export class WalletService {

  localWallet: Wallet = JSON.parse(localStorage.getItem('wallet')) || MockWallet;

  private unsubscribe: Subject<void> = new Subject();

  constructor(private http: Http, private appModal: AppModalService) {
    // const obsv = new Observable(observer => {
    //
    //   setTimeout(() => {
    //     observer.next(1);
    //   }, 1000);
    //
    //   setTimeout(() => {
    //     observer.next(2);
    //   }, 2000);
    //
    //   setTimeout(() => {
    //     observer.next(3);
    //   }, 3000);
    //
    //   setTimeout(() => {
    //     observer.next(4);
    //   }, 4000);
    //
    // }).publish();
    //
    // obsv.connect();
    //
    // // Subscription A
    // setTimeout(() => {
    //   obsv.subscribe(value => console.log(value));
    // }, 0);
    //
    // // Subscription B
    // setTimeout(() => {
    //   obsv.subscribe(value => console.log(`      ${value}`));
    // }, 2500);

    // // Subscription A
    // setTimeout(() => {
    //   obsv.subscribe(value => console.log(value));
    // }, 0);
    //
    // // Subscription B
    // setTimeout(() => {
    //   obsv.subscribe(value => console.log(`>>>> ${value}`));
    // }, 2500);
  }

  fetchWallet() : Observable<Wallet> {
    return new Observable(observer => {
      setTimeout(() => {
        console.log('fetchWallet ... ');
        console.log(this.localWallet);

        observer.next(this.localWallet);
        observer.complete();
      }, 500);
    });
  }

  sendTransaction(sendTo:string, amount:number) : Observable<boolean> {
    return new Observable(observer => {
      this.appModal.showConfirmModal({title: 'Confirm this transaction', body: `You are sending ${amount} ODN, are you sure?`})
      .takeUntil(this.unsubscribe)
      .subscribe(response => {
        console.log('confirmModal Response:', response);

        if (response) {

          let primaryAddress = this.localWallet.addresses[this.localWallet.primaryAddress];

          if (primaryAddress.balance <= amount) {
            console.warn('balance insufficient!');

            console.log('sending showNoticeModal action');
            this.appModal.showNoticeModal({title: 'Balance Insufficient', body: `The transaction for ${amount} ODN was rejected because your primary address balance is ${primaryAddress.balance} ODN.`})
            .publish().connect();

            // setTimeout(() => {
            //   console.log('sending showNoticeModal action');
            //   this.appModal.showNoticeModal({title: 'Balance Insufficient', body: `The transaction for ${amount} ODN was rejected because your primary address balance is ${primaryAddress.balance} ODN.`})
            //   .publish().connect();
            //   // .takeUntil(this.unsubscribe)
            //   // .subscribe(response => {
            //   //   console.log(response);
            //   // });
            // }, 2000);

            observer.next(false);
          }
          else {
            console.log(`sending ${amount} to ${sendTo}`);
            console.log(`current balance: ${primaryAddress.balance}`);

            primaryAddress.balance -= amount;

            console.log(`after balance: ${primaryAddress.balance}`);
            console.log('Addresses', this.localWallet);

            this.localWallet.transactions.push(this.buildTransaction(sendTo, amount));

            localStorage.setItem('wallet', JSON.stringify(this.localWallet));
            observer.next(true);
          }
        }
        else {
          console.log(`send rejected`);
          observer.next(false);
        }
        observer.complete();
      });
    });
  }

  private buildTransaction(sendTo:string, amount:number, label?:string) : Transaction {
    return {
      fromPublicKey: 'xxxx1',
      toPublicKey: sendTo,
      txid: `${uuid.generate()}`,
      timestamp: Number(`${new Date().getTime()}`),
      amount: amount,
      label: (label) ? label : ''
    }
  }

  private parseData(res : Response) {
    let data = res.json() || [];
    if (data === undefined || data['status'] != 'ok')
      throw 'Bad Status!';

    return data;
  }

  private handleError(error : Response | any) {
    let errorMessage: string;
    errorMessage = error.message ? error.message : error.toString();
    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }
}
