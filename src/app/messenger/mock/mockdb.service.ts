import {Http, BaseRequestOptions, Response, ResponseOptions,
        RequestMethod, XHRBackend, RequestOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import { contacts } from '../mock-db-contacts';
import { MESSAGES } from '../mock-db-messages';
import { UUID } from 'angular2-uuid';
import { uuid } from '../uuid';
import { Contact } from '../contact';
import { Message } from  '../message';

function fakeBackendFactory(backend: MockBackend,
                            options: BaseRequestOptions,
                            realBackend: XHRBackend) {

  // first, get contacts from the local storage or initial localContacts array
  let localContacts: Contact[] = JSON.parse(localStorage.getItem('contacts')) || contacts;

  let localMessages: Message[] = JSON.parse(localStorage.getItem('messages')) || MESSAGES;

  // configure fake backend
  backend.connections.subscribe((connection: MockConnection) => {
    // wrap in timeout to simulate server api call

    setTimeout(() => {

      console.log('CONNECTION', connection.request.url);

      // get all contacts
      if (
        connection.request.url.endsWith('/mock/contact') &&
        connection.request.method === RequestMethod.Get) {
        console.info('!! MOCKDB Get All Contacts');
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: {
            status: 'ok',
            contacts: localContacts
          }
        })));
        return;
      }



      // create contact
      if (
        connection.request.url.endsWith('/mock/contact') &&
        connection.request.method === RequestMethod.Post) {
        console.info('!! MOCKDB Create Contact');
        let receivedContact = JSON.parse(connection.request.getBody());
        let newContact = Object.assign(receivedContact, {id: uuid.generate()});
        localContacts[localContacts.length] = newContact;

        localStorage.setItem('contacts', JSON.stringify(localContacts));

        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: {
            status: 'ok',
            contact: newContact
          }
        })));
        return;
      }



      // get contact
      if (connection.request.url.match(/\/mock\/contact\/.{36}$/) &&
        connection.request.method === RequestMethod.Get) {
        console.info('!! MOCKDB Get Contact');
        let urlParts = connection.request.url.split('/');
        let contactId = urlParts[urlParts.length - 1];
        let contact : Contact = null;

        console.log('get contact', contactId);
        localContacts.some((element : Contact, index : number) => {
          if (element.id === contactId) {
            contact = element;
            return true;
          }
        });

        if (!contact) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 400,
            body: {
              status: 'error',
              erorr: 'Contact not found'
            }
          })));
        }
        else {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: {
              status: 'ok',
              contact: contact
            }
          })));
        }
        return;
      }



      // get contact messages
      if (
        connection.request.url.match('/mock/messages/*') &&
        connection.request.method === RequestMethod.Get) {
        console.info('!! MOCKDB Get Messages');
        let contactId = connection.request.url.split('/messages/')[1]
        let contact : Contact = null;
        let messages : Message[] = null;

        console.log('get contact messages', contactId);
        localContacts.some((element : Contact, index : number) => {
          if (element.id === contactId) {
            contact = element;
            return true;
          }
        });

        messages = localMessages.filter((element : Message) => {
          return element.contactId === contactId
        });

        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: {
            status: 'ok',
            contact: contact,
            messages: messages
          }
        })));
        return;
      }



      // send contact message
      if (
        connection.request.url.match('/mock/messages/*') &&
        connection.request.method === RequestMethod.Post) {
        console.info('!! MOCKDB Send Message');
        let receivedMessage = JSON.parse(connection.request.getBody());
        console.log('receivedMessage', receivedMessage);

        let newMessage : Message = {
          contactId: receivedMessage.contactId,
          body: receivedMessage.message,
          senderId: 'Me',
          time: new Date().getTime(),
          attachment: (receivedMessage.attachment) ? receivedMessage.attachment : false
        };

        console.log('newMessage', newMessage)

        localMessages.push(newMessage);
        localStorage.setItem('messages', JSON.stringify(localMessages));

        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: {
            status: 'ok',
            message: newMessage
          }
        })));
        return;
      }



      // update contact
      if (
        connection.request.url.match('/mock/contact/*') &&
        connection.request.method === RequestMethod.Put) {
        console.info('!! MOCKDB Update Contact');
        let receivedContact = JSON.parse(connection.request.getBody());
        let clonedContact = Object.assign({}, receivedContact);
        let contactFound = false;
        console.log('...update', {
          receivedContact: receivedContact,
          clonedContact: clonedContact,
          contactFound: contactFound
        });
        localContacts.some((element: Contact, index: number) => {
          if (element.id === clonedContact.id) {
            localContacts[index] = clonedContact;
            contactFound = true;
            console.log('found!');
            return true;
          }
        });

        if (!contactFound) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 400,
            body: {
              status: 'error',
              error: 'Contact could not be updated because was not found'
            }
          })));
        } else {
          localStorage.setItem('contacts', JSON.stringify(localContacts));

          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: {
              status: 'ok',
              contact: clonedContact
            }
          })));
        }
        return;
      }



      // delete employee
      if (connection.request.url.match(/\/mock\/contact\/.{36}$/) &&
        connection.request.method === RequestMethod.Delete) {
        console.info('!! MOCKDB Delete Contact');
        let urlParts = connection.request.url.split('/');
        let id = urlParts[urlParts.length - 1];
        let sizeBeforeDelete = localContacts.length;
        localContacts = localContacts.filter((element: Contact) => element.id !== id);

        if (sizeBeforeDelete === localContacts.length) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 400,
            body: {
              status: 'error',
              error: 'Contact could not be deleted because was not found'
            }
          })));
        } else {
          localStorage.setItem('contacts', JSON.stringify(localContacts));
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: {
              status: 'ok',
              message: 'Contact removed'
            }
          })));
        }

        return;
      }

      // pass through any requests not handled above
      let realHttp = new Http(realBackend, options);
      let requestOptions = new RequestOptions({
        method: connection.request.method,
        headers: connection.request.headers,
        body: connection.request.getBody(),
        url: connection.request.url,
        withCredentials: connection.request.withCredentials,
        responseType: connection.request.responseType
      });

      realHttp.request(connection.request.url, requestOptions)
      .subscribe((response: Response) => {
         connection.mockRespond(response);
       },
       (error: any) => {
         connection.mockError(error);
       });

    }, 500);
  });
  return new Http(backend, options);
}

export let MockMessengerBackend = {
  // use fake backend in place of Http service
  provide: Http,
  useFactory: fakeBackendFactory,
  deps: [MockBackend, BaseRequestOptions, XHRBackend]
};
