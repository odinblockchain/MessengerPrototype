import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';

import { FeedbackService } from './feedback.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeedbackRoutingModule
  ],
  declarations: [
    FeedbackComponent
  ],
  providers: [
    FeedbackService
  ]
})
export class FeedbackModule { }
