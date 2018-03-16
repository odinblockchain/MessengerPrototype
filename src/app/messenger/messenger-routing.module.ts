// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import { NgModule }             from '@angular/core';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessengerComponent } from './messenger.component';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';

import { ListContactsComponent } from './list-contacts/list-contacts.component';

// Route Configuration
const messengerRoutes: Routes = [
  {
    path: 'messenger',
    component: MessengerComponent,
    children: [
      {
        path: '',
        component: ListContactsComponent,
      },
      {
        path: 'new',
        component: NewContactComponent
      },
      {
        path: 'view/:id',
        component: MessageDetailComponent
      },
      {
        path: 'edit/:id',
        component: EditContactComponent
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
    RouterModule.forChild(messengerRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MessengerRoutingModule { }
