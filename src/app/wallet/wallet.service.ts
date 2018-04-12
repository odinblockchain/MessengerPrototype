import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/publish';

/* Helpers*/
import { uuid } from '../app-helpers/uuid';

/* Models */
import { Address }  from './Address';
import { Transaction }  from './Transaction';
import { Wallet }  from './Wallet';

/* Services */
import { IdentityService } from '../app-core/identity.service';
import { AppModalService } from '../app-core/app-modal.service';

/* Mock */
import { MockWallet } from './mock/wallet.mock';

@Injectable()
export class WalletService {

  localWallet: Wallet = JSON.parse(localStorage.getItem('wallet')) || MockWallet;

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private http: Http,
    private appModal: AppModalService,
    private identity: IdentityService) { }

  fetchWallet$() : Observable<Wallet> {
    return new Observable(observer => {
      setTimeout(() => {
        console.info('[WalletService] fetchWallet$', this.localWallet);

        observer.next(this.localWallet);
        observer.complete();
      }, 500);
    });
  }

  sendTransaction$(sendTo:string, amount:number) : Observable<boolean> {
    console.info('[WalletService] sendTransaction$', { sendTo: sendTo, amount: amount});

    return new Observable(observer => {
      this.appModal.showConfirmModal({title: 'Confirm this transaction', body: `You are sending ${amount} ODN, are you sure?`})
      .takeUntil(this.unsubscribe)
      .subscribe(response => {
        console.log('confirmModal Response:', response);

        if (response) {

          let primaryAddress = this.localWallet.addresses[this.localWallet.primaryAddress];

          if (primaryAddress.balance <= amount) {
            console.warn('[WalletService] Balance insufficient for transaction');

            this.appModal.showNoticeModal({title: 'Balance Insufficient', body: `The transaction for ${amount} ODN was rejected because your primary address balance is ${primaryAddress.balance} ODN.`})
            .publish().connect();
            observer.next(false);
          }
          else {
            console.log(`[WalletService] Sending ${amount} to ${sendTo}. Pre-balance: ${primaryAddress.balance}`);

            primaryAddress.balance -= amount;

            console.log(`[WalletService] Post-balance: ${primaryAddress.balance}`);

            this.localWallet.transactions.push(this.buildTransaction(sendTo, amount));

            localStorage.setItem('wallet', JSON.stringify(this.localWallet));
            observer.next(true);
          }
        }
        else {
          console.info('[WalletService] Transaction cancelled');
          observer.next(false);
        }
        observer.complete();
      });
    });
  }

  private buildTransaction(sendTo:string, amount:number, label?:string) : Transaction {
    return {
      fromPublicKey: this.identity.personalKey,
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
