import { Component, OnInit } from '@angular/core';

import { Address } from '../address';
import { Wallet } from '../wallet';
import { WalletService } from '../wallet.service';
import { AppHeaderService } from '../../app-header.service';

@Component({
  selector: 'app-view-addresses',
  templateUrl: './view-addresses.component.html',
  styleUrls: ['../common.scss', './view-addresses.component.scss']
})
export class ViewAddressesComponent implements OnInit {

  wallet: Wallet;
  addresses: Address[];

  constructor(private walletService: WalletService,
  private appHeader: AppHeaderService) {
    this.appHeader.setAppHeader({
      title: 'Wallet Addresses',
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
      this.addresses = wallet.addresses;
    });
  }
}
