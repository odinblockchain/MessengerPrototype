import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

// import { MockBackend } from '@angular/http/testing';
// import { BaseRequestOptions } from '@angular/http';
// import { MockWalletBackend } from './mock/mockdb.service';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent }    from './wallet.component';
import { WalletHomeComponent } from './wallet-home/wallet-home.component';
import { WalletService } from './wallet.service';
import { ViewAddressesComponent } from './view-addresses/view-addresses.component';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    WalletRoutingModule
  ],
  declarations: [
    WalletComponent,
    WalletHomeComponent,
    ViewAddressesComponent,
    ViewTransactionsComponent
  ],
  providers: [
    WalletService
  ]
})
export class WalletModule {}
