import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

/* App Core */
import { AppCoreModule } from './app-core/app-core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { AppHelpersModule } from './app-helpers/app-helpers.module';

/* App Services */
import { AppHeaderService } from './app-core/app-header.service';
import { AppModalService } from './app-core/app-modal.service';
import { AppNotificationService } from './app-core/app-notification.service';

/* App Modules */
import { MessengerModule } from './messenger/messenger.module';
import { WalletModule } from './wallet/wallet.module';
import { FeedbackModule } from './feedback/feedback.module';


@NgModule({
  declarations: [
    AppComponent
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
    AppNotificationService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
