import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { HttpModule }     from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

/* App Core */
import { AppHelpersModule } from '../app-helpers/app-helpers.module';

/* Routing */
import { MessengerRoutingModule } from './messenger-routing.module';

/* Components */
import { AvatarNamePipe } from './avatar-name.pipe';
import { MessengerComponent }    from './messenger.component';
import { MessageDetailComponent }  from './message-detail/message-detail.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ListContactsComponent } from './list-contacts/list-contacts.component';

/* Services */
import { MessengerService } from './messenger.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
