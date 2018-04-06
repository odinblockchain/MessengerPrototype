import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { MessengerComponent }    from './messenger.component';
import { MessageDetailComponent }  from './message-detail/message-detail.component';

import { MessengerRoutingModule } from './messenger-routing.module';

import { MessengerService } from './messenger.service';

import { AvatarNamePipe } from './avatar-name.pipe';
import { NewContactComponent } from './new-contact/new-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ListContactsComponent } from './list-contacts/list-contacts.component';


import { AppHelpersModule } from '../app-helpers/app-helpers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MessengerRoutingModule,
    AppHelpersModule
  ],
  declarations: [
    MessengerComponent,
    ListContactsComponent,
    MessageDetailComponent,
    AvatarNamePipe,
    NewContactComponent,
    EditContactComponent
  ],
  providers: [
    MessengerService,
    MockBackend,
    BaseRequestOptions
  ]
})
export class MessengerModule {}
