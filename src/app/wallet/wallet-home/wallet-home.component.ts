import { Component, OnInit } from '@angular/core';

/* Models */
import { Address } from '../Address';
import { Wallet } from '../Wallet';

/* Services */
import { AppHeaderService } from '../../app-core/app-header.service';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-wallet-home',
  templateUrl: './wallet-home.component.html',
  styleUrls: ['../common.scss', './wallet-home.component.scss']
})
export class WalletHomeComponent implements OnInit {
  wallet: Wallet;

  constructor(
    private walletService: WalletService,
    private appHeader: AppHeaderService)
  {
    this.appHeader.setAppHeader({
      title: 'Wallet Detail'
    })
  }

  ngOnInit() {
    this.loadWallet();
  }

  public walletBalance() : number {
    let balance = 0;
    this.wallet.addresses.forEach((address : Address) => {
      balance += Number(address.balance);
    });
    return balance;
  }

  private loadWallet() : void {
    this.walletService.fetchWallet$()
    .subscribe(wallet => {
      this.wallet = wallet;
    });
  }


}
