// Imports
import { NgModule }             from '@angular/core';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackComponent } from './feedback.component';

// Route Configuration
const feedbackRoutes: Routes = [
  {
    path: 'feedback',
    component: FeedbackComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(feedbackRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FeedbackRoutingModule { }
