import { Component, OnInit } from '@angular/core';

/* Models */
import { Contact }          from '../contact';

/* Services */
import { MessengerService } from '../messenger.service';
import { AppHeaderService } from '../../app-header.service';

let onSelect : (contact: Contact) => void;

@Component({
  selector: 'app-messenger',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['../common.scss', './list-contacts.component.scss'],
  host: { 'class': 'someClass1' }
})
export class ListContactsComponent implements OnInit {
  contacts: Contact[];
  selectedContact: Contact;

  constructor(private messengerService: MessengerService, private appHeader: AppHeaderService) {
    this.appHeader.setAppHeader({
      title: 'Messages',
      showBackAction: false
    })
  }

  ngOnInit() : void {
    this.getContacts();
  }

  onSelect = (contact) => {
    if (this.selectedContact === contact) {
      return this.selectedContact = null;
    }

    this.selectedContact = contact;
  }

  getContacts() : void {
    this.messengerService.fetchContacts$()
    .subscribe(contacts => {
      this.contacts = contacts;
    });
  }

}
