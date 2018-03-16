import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
// import {ConnectableObservable} from 'rxjs/ConnectableObservable';

import { Message }  from './message';
import { Contact }  from './contact';

import { uuid } from './uuid';

import { MockContacts } from './mock/contacts';
import { MockMessages } from './mock/messages';

// import { MockResponseService } from '../app-helpers/mock-response.service';

/* TODO
- Convert to localized DB vs API
- Convert conversations into streams to be subscribed to
*/

@Injectable()
export class MessengerService {

  // TODO remove
  private contactsUrl = 'http://localhost:3000/api/fetch-users';
  private messagesUrl = 'http://localhost:3000/api/fetch-user';

  // first, get contacts from the local storage or initial localContacts array
  public localContacts: Contact[] = JSON.parse(localStorage.getItem('contacts')) || MockContacts;

  public localMessages: Message[] = JSON.parse(localStorage.getItem('messages')) || MockMessages;

  messageStreamSource = new BehaviorSubject<any>([]);
  messageStream = this.messageStreamSource.asObservable();
  // messageStream : Observable<any> = null;

  // sample : Observable<any> = <any>[];

  source = null;

  constructor(private http: Http) {
    this.messageStreamSource.publish().connect();
    this.messageStreamSource.next(this.localMessages);

    this.source = Observable.defer(() => {
      Observable.of(Math.floor(Math.random() * 100));
    })

    // setTimeout(()=>{
    //   console.log('interval timer');
    //   let _items = this.messageStreamSource.value;
    //
    //   _items.push({
    //     senderId: "f1fb7b52-b3d1-486a-9fd2-5a1fc242ee8f",
    //     contactId: "f1fb7b52-b3d1-486a-9fd2-5a1fc242ee8f",
    //     body: 'SAMPLE STREAM',
    //     time: (new Date()).getTime()
    //   });
    //
    //   console.log(_items);
    //
    //   this.messageStreamSource.next(_items);
    //   // _items.push(Math.random())
    //
    // }, 3000);
  }

  observe(name:string) {
    return {
      next: (value:number) => console.log(`observer ${name}: ${value}`),
      complete: () => console.log(`observer ${name} complete`)
    }
  }

  // sampleStream() : ConnectableObservable

  /*
    Create new contact
    @Return Created Contact
  */
  createContact$(contact : Contact) : Observable<Contact> {
    console.info('createContact$', {
      contact: contact
    });

    return new Observable(observer => {
      setTimeout(() => {
        console.log('createContact$ ... ');

        let newContact = Object.assign(contact, { id: uuid.generate() });
        this.localContacts[this.localContacts.length] = newContact;

        localStorage.setItem('contacts', JSON.stringify(this.localContacts));

        observer.next(newContact);
        observer.complete();
      }, 500);
    });
  }

  /*
    @Return local contacts
  */
  fetchContacts$() : Observable<Contact[]> {
    console.info('fetchContacts$');

    return new Observable(observer => {
      setTimeout(() => {
        console.log('fetchContacts$ ... ');
        console.log(this.localContacts);

        observer.next(this.localContacts);
        observer.complete();
      }, 500);
    });
  }

  /*
    @Return specified local contact
  */
  fetchContact$(contactId : string) : Observable<any> {
    console.info('fetchContact$', {
      contactId: contactId
    });

    return new Observable(observer => {
      setTimeout(() => {
        console.log('fetchContact$ ... ');
        console.log(this.localContacts);

        let contact : Contact = null;
        this.localContacts.some((element : Contact, index : number) => {
          if (element.id === contactId) {
            contact = element;
            return true;
          }
        });

        if (contact) {
          observer.next(contact);
        }
        else {
          observer.next(false);
        }

        observer.complete();
      }, 500);
    });
  }

  /*
    @Return specified local contact
  */
  fetchContactMessages$(contactId : string) : Observable<any> {
    console.info('fetchContactMessages$', {
      contactId: contactId
    });

    return new Observable(observer => {
      setTimeout(() => {
        console.log('fetchContactMessages$ ... ');
        console.log(this.localContacts);

        let contact : Contact = null;
        let messages : Message[] = null;

        this.localContacts.some((element : Contact, index : number) => {
          if (element.id === contactId) {
            contact = element;
            return true;
          }
        });

        messages = this.localMessages.filter((element : Message) => {
          return element.contactId === contactId
        });

        if (contact && messages) {
          console.log('returning messages');
          observer.next(messages);
        }
        else {
          console.warn('contact or messages dont exist')
          observer.next(false);
        }

        observer.complete();
      }, 500);
    });
  }

  /*
    @Return updated contact object
  */
  saveContact$(contact : Contact) : Observable<any> {
    console.info('saveContact$', {
      contact: contact
    });

    return new Observable(observer => {
      setTimeout(() => {
        console.log('saveContact$ ... ');

        let contactUpdated:boolean = false;
        this.localContacts.some((element : Contact, index : number) => {
          if (element.id === contact.id) {
            this.localContacts[index] = contact;
            contactUpdated = true;
            return true;
          }
        });

        if (contactUpdated) {
          localStorage.setItem('contacts', JSON.stringify(this.localContacts));
          console.log('contact upated');
          observer.next(contact);
        }
        else {
          console.warn('contact not found');
          observer.next(false);
        }

        observer.complete();
      }, 500);
    });
  }

  /*
    @Return updated contact object
  */
  deleteContact$(contact : Contact) : Observable<any> {
    console.info('deleteContact$', {
      contact: contact
    });

    return new Observable(observer => {
      setTimeout(() => {
        console.log('deleteContact$ ... ');

        let sizeBeforeDelete = this.localContacts.length;
        this.localContacts = this.localContacts.filter((element: Contact) => element.id !== contact.id);

        if (sizeBeforeDelete === this.localContacts.length) {
          console.warn('contact not found');
          observer.next(false);
        }
        else {
          console.log('contact found');
          observer.next(true);
        }

        observer.complete();
      }, 500);
    });
  }

  sendMessage$(contactId:string, message:string, attachment?:any) : Observable<Message> {
    console.info('sendMessage$', {
      contactId: contactId,
      message: message,
      attachment: attachment
    });

    return new Observable(observer => {
      setTimeout(() => {
        console.log('sendMessage$ ... ');

        let newMessage : Message = {
          contactId: contactId,
          body: message,
          senderId: 'Me',
          time: new Date().getTime(),
          attachment: (attachment) ? attachment : false
        };

        this.localMessages.push(newMessage);
        localStorage.setItem('messages', JSON.stringify(this.localMessages));
        this.messageStreamSource.next(this.localMessages);
        observer.next(newMessage);
        observer.complete();
        // this.mockResponse.triggerMock(newMessage);
      }, 500);
    });
  }

  receiveMessage$(message : Message) : Observable<Message> {
    console.info('receiveMessage$', {
      message: message
    });

    return new Observable(observer => {
      setTimeout(() => {
        console.log('receiveMessage$ ... ');

        this.localMessages.push(message);
        localStorage.setItem('messages', JSON.stringify(this.localMessages));
        this.messageStreamSource.next(this.localMessages);
        observer.next(message);
        observer.complete();
        // this.mockResponse.triggerMock(newMessage);
      }, 500);
    });
  }





  // done
  fetchContacts() : Observable<Contact[]> {
    console.info('fetchingContacts');
    return this.http.get('/mock/contact')
    .map((res : Response) => {
      console.log('fetchContacts ... ');
      console.log(res);

      let data = this.parseData(res);
      if (data.hasOwnProperty('contacts') === false)
        throw 'No Contacts!';

      return data['contacts'];
    })
    .catch(this.handleError);
  }

  // done
  createContact(contact : Contact) : Observable<Contact> {
    console.log('creating...');
    return this.http.post('/mock/contact', contact)
    .map((res : Response) => {
      console.log('createContact ... ');
      console.log(res);

      let data = this.parseData(res);
      if (data.hasOwnProperty('contact') === false)
        throw 'No Contact!';

      return data['contact'];
    })
    .catch(this.handleError);
  }

  // done
  saveContact(contact : Contact) : Observable<Contact> {
    console.log('saving...');
    return this.http.put('/mock/contact', contact)
    .map((res : Response) => {
      console.log('saveContact ... ');
      console.log(res);

      let data = this.parseData(res);
      if (data.hasOwnProperty('contact') === false)
        throw 'No Contact!';

      return data['contact'];
    })
    .catch(this.handleError);
  }

  // done
  deleteContact(contact : Contact) : Observable<Contact> {
    console.log('deleting...');
    return this.http.delete(`/mock/contact/${contact.id}`)
    .map((res : Response) => {
      console.log('deleteContact ... ');
      console.log(res);

      let data = this.parseData(res);
      return data;
    })
    .catch(this.handleError);
  }

  fetchMessages(contactId : String) : Observable<Message[]> {
    console.log('fetchMessages', contactId);
    return this.http.get(`/mock/messages/${contactId}`)
    .map((res : Response) => {
      let data = this.parseData(res);
      if (data.hasOwnProperty('messages') === false)
        throw 'No messages!';

      return data['messages'];
    })
    .catch(this.handleError);
  }

  // done
  fetchContact(contactId : String) : Observable<Contact> {
    console.log('fetchContact', contactId);
    return this.http.get(`/mock/contact/${contactId}`)
    .map((res : Response) => {
      let data = this.parseData(res);
      if (data.hasOwnProperty('contact') === false)
        throw 'No contact!';

      return data['contact'];
    })
    .catch(this.handleError)
  }

  sendMessage(contactId : String, message: String, attachment?: any) : Observable<Message> {
    console.log('sendMessage', contactId, message, attachment);
    return this.http.post(`/mock/messages/`, { contactId: contactId, message: message, attachment: attachment })
    .map((res : Response) => {
      let data = this.parseData(res);
      if (data.hasOwnProperty('message') === false)
        throw 'No message!';

      return data['message'];
    })
    .catch(this.handleError)
  }

  private parseData(res : Response) {
    let data = res.json() || [];
    if (data === undefined || data['status'] != 'ok')
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

// .map(this.parseData)
// .map((res: Response) => res['users'])
// .catch((error: any) => Observable.throw(error));
// .catch((error: any) => {
//   console.log(error);
//   Observable.throw("Error in x service")
// });
// .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
