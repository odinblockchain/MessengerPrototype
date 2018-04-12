import { Component, OnInit } from '@angular/core';

/* Models */
import { Address } from '../Address';
import { Wallet } from '../Wallet';
import { Transaction } from '../Transaction';

/* Services */
import { WalletService } from '../wallet.service';
import { AppHeaderService } from '../../app-core/app-header.service';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['../common.scss', './view-transactions.component.scss']
})
export class ViewTransactionsComponent implements OnInit {
  wallet: Wallet;
  transactions: Transaction[];

  constructor(
    private walletService: WalletService,
    private appHeader: AppHeaderService)
  {
    this.appHeader.setAppHeader({
      title: 'Wallet Transactions',
      showBackAction: true
    })
  }

  ngOnInit() {
    this.loadWallet();
  }

  private loadWallet() : void {
    this.walletService.fetchWallet$()
    .subscribe(wallet => {
      this.wallet = wallet;
      this.transactions = wallet.transactions;
    });
  }
}
