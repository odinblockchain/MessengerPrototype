import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

/* App Core */
import { AppHelpersModule } from '../app-helpers/app-helpers.module';

/* Components */
import { WalletComponent }    from './wallet.component';
import { WalletHomeComponent } from './wallet-home/wallet-home.component';
import { ViewAddressesComponent } from './view-addresses/view-addresses.component';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';

/* Routing */
import { WalletRoutingModule } from './wallet-routing.module';

/* Services */
import { WalletService } from './wallet.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    AppHelpersModule,
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
