import { Component, OnInit } from '@angular/core';

import { Address } from '../address';
import { Wallet } from '../wallet';
import { Transaction } from '../transaction';
import { WalletService } from '../wallet.service';
import { AppHeaderService } from '../../app-header.service';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.scss']
})
export class ViewTransactionsComponent implements OnInit {

  wallet: Wallet;
  transactions: Transaction[];

  constructor(private walletService: WalletService,
  private appHeader: AppHeaderService) {
    this.appHeader.setAppHeader({
      title: 'Wallet Transactions',
      showBackAction: true
    })
  }

  ngOnInit() {
    this.getWallet();
  }

  getWallet() : void {
    this.walletService.fetchWallet()
    .subscribe(wallet => {
      console.log('GOT WALLET', wallet);
      this.wallet = wallet;
      this.transactions = wallet.transactions;
    });
  }
}
