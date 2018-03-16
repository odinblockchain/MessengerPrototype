// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import { NgModule }             from '@angular/core';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
  // { path: '', component: MessengerComponent },
  // { path: 'message/:id', component: MessageDetailComponent },
  // { path: 'new-contact', component: NewContactComponent },
  // { path: 'edit/:id', component: EditContactComponent },
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

// export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    RouterModule.forChild(walletRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WalletRoutingModule { }
