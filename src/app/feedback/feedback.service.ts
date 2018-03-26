import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Feedback } from './Feedback';
import { FeedbackType } from './FeedbackType';

// import {Observable} from 'rxjs/Observable';

// Import RxJs required methods
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import { of }       from 'rxjs/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/multicast';

@Injectable()
export class FeedbackService {

  // TODO remove
  private contactsUrl = 'http://localhost:3000/api/fetch-users';

  constructor(private http: Http) { }

  fetchFeedbackTypes$() : Observable<FeedbackType[]> {
    console.info('fetchFeedbackTypes$');

    return this.http.get(`http://localhost:4201/api/feedback-options`, { withCredentials: true })
    .map((res : Response) => {
      console.log('response', res);
      return this.parseData(res);
    })
    .catch(this.handleError)
  }

  postFeedback$(feedback : Feedback) : Observable<any> {
    console.info('postFeedback$', feedback);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this.http.post(`http://localhost:4201/api/feedback-submit`, feedback, options)
    .map((res : Response) => {
      console.log('response', res);
      return this.parseData(res);
    })
    .catch(this.handleError)
  }

  private parseData(res : Response) {
    let data = res.json() || [];
    if (data === undefined)
      throw 'Bad Status!';

    return data;
  }

  private handleError(error : Response | any) {
    let errorMessage: string;
    errorMessage = error.message ? error.message : error.toString();
    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }
}
