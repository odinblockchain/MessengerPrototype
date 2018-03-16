import { Injectable } from '@angular/core';

import { MessengerService } from '../messenger/messenger.service';

@Injectable()
export class MockResponseService {

  constructor(
    private messengerService: MessengerService
  ) { }

  triggerMock(message) : void {
    // Send mock response randomly (between 0 - 10s)
    setTimeout(() => {
      console.info('[MOCK] triggerMock', message);
      let mockMessage = {
        contactId: message.contactId,
        body: `Just saw your message: ${message.body}`,
        senderId: message.contactId,
        time: new Date().getTime(),
        attachment: false
      };

      this.messengerService.receiveMessage$(mockMessage)
      .subscribe(message => {
        console.log('[MOCK] delivered mockMessage', message);
      });
    }, Math.floor(Math.random() * 10) * 1000)
  }
}
