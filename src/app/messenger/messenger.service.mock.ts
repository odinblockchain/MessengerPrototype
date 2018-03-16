import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

// Import RxJs required methods
import {Observable} from 'rxjs/Observable';
import { of }       from 'rxjs/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Message }  from './message';
import { Contact }  from './contact';

@Injectable()
export class MessengerServiceMock {
  
  private static handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      if (error.status === 404) {
        errMsg = `Resource ${error.url} was not found`;
      } else {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }

  constructor(private http: Http) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get('/fake-backend/contacts')
    .map(response => response.json() as Contact[])
    .catch(MessengerServiceMock.handleError);
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post('/fake-backend/contacts', contact)
    .map(response => response.json() as Contact)
    .catch(MessengerServiceMock.handleError);
  }

  updateContact(contact: Contact): Observable<any> {
    return this.http.put('/fake-backend/contacts', contact)
    .map(response => response.json())
    .catch(MessengerServiceMock.handleError);
  }

  deleteContact(id: string): Observable<any> {
    return this.http.delete('/fake-backend/contacts/' + id)
    .map(response => response.json())
    .catch(MessengerServiceMock.handleError);
  }
}
