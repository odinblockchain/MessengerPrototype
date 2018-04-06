import { Component, OnInit } from '@angular/core';

import { Address } from '../Address';
import { Wallet } from '../Wallet';
import { WalletService } from '../wallet.service';
import { AppHeaderService } from '../../app-header.service';

@Component({
  selector: 'app-wallet-home',
  templateUrl: './wallet-home.component.html',
  styleUrls: ['../common.scss', './wallet-home.component.scss']
})
export class WalletHomeComponent implements OnInit {
  wallet: Wallet;

  constructor(private walletService: WalletService,
  private appHeader: AppHeaderService) {
    this.appHeader.setAppHeader({
      title: 'Wallet Detail'
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
    });
  }

  public walletBalance() : number {
    let balance = 0;
    this.wallet.addresses.forEach((address : Address) => {
      balance += Number(address.balance);
    });
    return balance;
  }
}
