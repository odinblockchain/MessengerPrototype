import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* Services */
import { AppHeaderService } from '../app-core/app-header.service';
import { AppNotificationService } from '../app-core/app-notification.service';
import { Feedback } from './Feedback';

/* Models */
import { FeedbackType } from './FeedbackType';
import { FeedbackService } from './feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackLoaded: boolean = false;
  feedbackEnabled: boolean = false;

  feedbackForm : FormGroup;

  feedback: Feedback = {
    type: '',
    subject: '',
    body: ''
  };

  feedbackTypes: FeedbackType[];

  constructor(
    private feedbackService: FeedbackService,
    private appHeader: AppHeaderService,
    private appNotification: AppNotificationService,
    private fb: FormBuilder) {

    this.appHeader.setAppHeader({
      title: 'User Feedback'
    });

    this.feedbackTypes = [];

    this.feedbackForm = fb.group({
      'type': ['', Validators.required],
      'subject': '',
      'body': [null, Validators.required]
    })
  }

  ngOnInit() {
    this.feedbackService.fetchFeedbackTypes$()
    .subscribe(types => {
      if (types['status'] && types['status'] === 'ok') {
        this.feedbackEnabled = true;
        this.feedbackTypes = types['options'];
      }
      this.feedbackLoaded = true;
    }, err => {
      console.warn('Feedback load error', err);
      this.feedbackLoaded = true;
    });
  }

  handleError(error:any) : void {
    let errorMessage = (error.message) ? error.message : 'We are unable to accept feedback at this time. Please try again later';
    console.log(this.feedbackForm);

    if (error.field) {
      this.feedbackForm.controls[error.field].setErrors({'required': true});
    }

    this.appNotification.displayNotification({
      type: 'warning',
      body: errorMessage
    });
  }

  handleSuccess() : void {
    this.feedbackForm.reset();
    this.appNotification.displayNotification({
      type: 'success',
      body: 'Feedback received!'
    });
  }

  submitForm = (form: any): void => {
    this.feedbackService.postFeedback$(form)
    .subscribe(res => {
      if (res.status && res.status === 'ok') {
        return this.handleSuccess();
      }
      else {
        let error = (res.error) ? res.error : {};
        return this.handleError(error);
      }
    });
  }
}
