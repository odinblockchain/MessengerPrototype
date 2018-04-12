import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

// Import RxJs required methods
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/multicast';

/* App Core */
import { IdentityService } from '../app-core/identity.service';
import { uuid } from '../app-helpers/uuid';

/* Models */
import { Message }  from './message';
import { Contact }  from './contact';

/* Mock Data */
import { MockContacts } from './mock/contacts.mock';
import { MockMessages } from './mock/messages.mock';

@Injectable()
export class MessengerService {

  /*
    Grab Contacts and Messages from local storage
    - if not available, use Mock Data as baseline
  */
  public localContacts: Contact[] = JSON.parse(localStorage.getItem('contacts')) || MockContacts;

  public localMessages: Message[] = JSON.parse(localStorage.getItem('messages')) || MockMessages;

  messageStreamSource = new BehaviorSubject<any>([]);
  messageStream = this.messageStreamSource.asObservable();

  constructor(
    private http: Http,
    private identity: IdentityService)
  {
    this.messageStreamSource.publish().connect();
    this.messageStreamSource.next(this.localMessages);
  }

  observe(name:string) {
    return {
      next: (value:number) => console.log(`observer ${name}: ${value}`),
      complete: () => console.log(`observer ${name} complete`)
    }
  }

  /*
    Create new contact
    @Return Created Contact
  */
  createContact$(contact : Contact) : Observable<Contact> {
    console.info('[MessengerService] createContact$', {
      contact: contact
    });

    return new Observable(observer => {
      setTimeout(() => {
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
    console.info('[MessengerService] fetchContacts$');

    return new Observable(observer => {
      setTimeout(() => {
        console.log('[MessengerService] fetchContacts$ ... ', this.localContacts);

        observer.next(this.localContacts);
        observer.complete();
      }, 500);
    });
  }

  /*
    @Return specified local contact
  */
  fetchContact$(contactId : string) : Observable<any> {
    console.info('[MessengerService] fetchContact$', {
      contactId: contactId
    });

    return new Observable(observer => {
      setTimeout(() => {
        console.log('[MessengerService] fetchContact$ ... ', this.localContacts);

        let contact : Contact = null;
        this.localContacts.some((element : Contact, index : number) => {
          if (element.id === contactId) {
            contact = element;
            return true;
          }
        });

        if (contact) observer.next(contact);
        else observer.next(false);

        observer.complete();
      }, 500);
    });
  }

  /*
    @Return specified local contact
  */
  fetchContactMessages$(contactId : string) : Observable<any> {
    console.info('[MessengerService] fetchContactMessages$', {
      contactId: contactId
    });

    return new Observable(observer => {
      setTimeout(() => {
        console.log('[MessengerService] fetchContactMessages$ ... ', this.localContacts);

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

        if (contact && messages) observer.next(messages);
        else observer.next(false);

        observer.complete();
      }, 500);
    });
  }

  /*
    @Return updated contact object
  */
  saveContact$(contact : Contact) : Observable<any> {
    console.info('[MessengerService] saveContact$', {
      contact: contact
    });

    return new Observable(observer => {
      setTimeout(() => {
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
        else observer.next(false);

        observer.complete();
      }, 500);
    });
  }

  /*
    @Return updated contact object
  */
  deleteContact$(contact : Contact) : Observable<any> {
    console.info('[MessengerService] deleteContact$', {
      contact: contact
    });

    return new Observable(observer => {
      setTimeout(() => {
        let sizeBeforeDelete = this.localContacts.length;
        this.localContacts = this.localContacts.filter((element: Contact) => element.id !== contact.id);

        if (sizeBeforeDelete === this.localContacts.length) {
          console.warn('[MessengerService] Contact not found');
          observer.next(false);
        }
        else {
          console.log('[MessengerService] Contact found and removed');
          observer.next(true);
        }

        observer.complete();
      }, 500);
    });
  }

  sendMessage$(contactId:string, message:string, attachment?:any) : Observable<Message> {
    console.info('[MessengerService] sendMessage$', {
      contactId: contactId,
      message: message,
      attachment: attachment
    });

    return new Observable(observer => {
      setTimeout(() => {
        let newMessage : Message = {
          contactId: contactId,
          body: message,
          senderId: this.identity.personalKey,
          time: new Date().getTime(),
          attachment: (attachment) ? attachment : false
        };

        this.localMessages.push(newMessage);
        localStorage.setItem('messages', JSON.stringify(this.localMessages));
        this.messageStreamSource.next(this.localMessages);
        observer.next(newMessage);
        observer.complete();
      }, 500);
    });
  }

  receiveMessage$(message : Message) : Observable<Message> {
    console.info('[MessengerService] receiveMessage$', {
      message: message
    });

    return new Observable(observer => {
      setTimeout(() => {
        this.localMessages.push(message);
        localStorage.setItem('messages', JSON.stringify(this.localMessages));
        this.messageStreamSource.next(this.localMessages);
        observer.next(message);
        observer.complete();
      }, 500);
    });
  }
}
