import { NgModule }             from '@angular/core';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components */
import { WalletComponent } from './wallet.component';
import { WalletHomeComponent } from './wallet-home/wallet-home.component';
import { ViewAddressesComponent } from './view-addresses/view-addresses.component';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';

// Route Configuration
const walletRoutes: Routes = [
  {
    path: 'wallet',
    component: WalletComponent,
    children: [
      {
        path: '',
        component: WalletHomeComponent,
      },
      {
        path: 'addresses',
        component: ViewAddressesComponent
      },
      {
        path: 'transactions',
        component: ViewTransactionsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(walletRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WalletRoutingModule { }
