import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/multicast';

/* Models */
import { Feedback } from './Feedback';
import { FeedbackType } from './FeedbackType';

@Injectable()
export class FeedbackService {

  constructor(private http: Http) { }

  fetchFeedbackTypes$() : Observable<FeedbackType[]> {
    console.info('[FeedbackService] fetchFeedbackTypes$');

    return this.http.get(`/api/feedback-options`, { withCredentials: true })
    .map((res : Response) => {
      return this.parseData(res);
    })
    .catch(this.handleError)
  }

  postFeedback$(feedback : Feedback) : Observable<any> {
    console.info('[FeedbackService] postFeedback$', feedback);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this.http.post(`/api/feedback-submit`, feedback, options)
    .map((res : Response) => {
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
    console.warn(errorMessage);
    return Observable.throw(errorMessage);
  }
}
