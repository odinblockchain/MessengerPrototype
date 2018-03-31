import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

/* App Core */
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { AppHelpersModule } from './app-helpers/app-helpers.module';

/* App Services */
import { AppHeaderService } from './app-header.service';
import { AppModalService } from './app-modal.service';
import { AppNotificationService } from './app-notification.service';

import { MockResponseService } from './app-helpers/mock-response.service';

/* App Directives */
import { HeaderDirective } from './header.directive';

/* App Modules */
import { MessengerModule } from './messenger/messenger.module';
import { WalletModule } from './wallet/wallet.module';
import { FeedbackModule } from './feedback/feedback.module';
import { AppCoreModule } from './app-core/app-core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MessengerModule,
    WalletModule,
    FeedbackModule,
    AppRoutingModule,
    AppHelpersModule,
    AppCoreModule
  ],
  providers: [
    AppHeaderService,
    AppModalService,
    AppNotificationService,
    MockResponseService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
