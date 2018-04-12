import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* App Core */
import { AppHelpersModule } from '../app-helpers/app-helpers.module';

/* Routing */
import { FeedbackRoutingModule } from './feedback-routing.module';

/* Components */
import { FeedbackComponent } from './feedback.component';

/* Services */
import { FeedbackService } from './feedback.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeedbackRoutingModule,
    AppHelpersModule
  ],
  declarations: [
    FeedbackComponent
  ],
  providers: [
    FeedbackService
  ]
})
export class FeedbackModule { }
