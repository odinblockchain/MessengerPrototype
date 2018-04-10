import { uuid } from '../../app-helpers/uuid';
import { Message } from '../Message';
import { MockContacts } from './contacts.mock';

const Messages = [
  'New phone, who dis?',
  'Last night was crazy!',
  'The cake is moist',
  'Just read all that FUD lol',
  'I voted Trump',
  'I wiretapped the oval office',
  'Russia was involved',
  'Did you see the look on Clinton\'s face? LOL',
  'My hands aren\'t small, right?',
  'I actually hate pizza',
  'When moon?',
  'Just bought 100k',
  'Put the cake in the oven',
  'I like it spicy',
  'Just cracked that phone',
  'Secrets secrets secrets',
  'The cake is a lie'
];

let _messages : Message[] = [];

for (let contact of MockContacts) {
  let mockCount = 0;
  while(mockCount < 5) {
    mockCount++;
    let mockTime = new Date();
    mockTime.setHours(mockTime.getHours() - (mockCount + 1));
    let _message:Message = {
      senderId: contact.id,
      contactId: contact.id,
      body: Messages[~~(Messages.length * Math.random())],
      time: mockTime.getTime()
    };
    _messages.push(_message);
  }
}

export const MockMessages: Message[] = _messages;
