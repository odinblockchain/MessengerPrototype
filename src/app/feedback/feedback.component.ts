import { Component, OnInit } from '@angular/core';

import { AppHeaderService } from '../app-header.service';
import { Feedback } from './Feedback';

import { FeedbackType } from './FeedbackType';
import { FeedbackService } from './feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  formToken: string;
  feedbackLoaded: boolean = false;
  feedbackEnabled: boolean = true;

  feedback: Feedback = {
    type: '',
    subject: '',
    body: ''
  };

  feedbackTypes: FeedbackType[];

  constructor(
    private feedbackService: FeedbackService,
    private appHeader: AppHeaderService) {

    this.appHeader.setAppHeader({
      title: 'User Feedback'
    });

    this.feedbackTypes = [];
  }

  ngOnInit() {
    this.feedbackService.fetchFeedbackTypes$()
    .subscribe(types => {
      console.log('GOT IT', types);
      if (types['status'] && types['status'] === 'ok') {
        this.feedbackEnabled = true;
        this.feedbackTypes = types['listOptions'];
      }
      this.feedbackLoaded = true;
    }, err => {
      console.warn('Error occurred');
      console.warn(err);
      this.feedbackLoaded = true;
    });
  }

  onSubmit = () : void => {
    console.log('submit', this.feedback);
    this.feedbackService.postFeedback$(this.feedback)
    .subscribe(res => {
      console.log('GOT POST', res);
    });
  }
}
