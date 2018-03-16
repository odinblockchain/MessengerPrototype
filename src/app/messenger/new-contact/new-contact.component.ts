import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact';
import { MessengerService } from '../messenger.service';
import { AppHeaderService } from '../../app-header.service';
import { uuid } from '../uuid';

import {Router} from "@angular/router";

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {
  contact : Contact = {
    name: '',
    id: uuid.generate(),
    email: ''
  };

  constructor(private messengerService: MessengerService, private router:Router,
  private appHeader: AppHeaderService) {
    this.appHeader.setAppHeader({
      title: 'Add Contact',
      showBackAction: true
    })
  }

  ngOnInit() {
  }

  onSave(contact : Contact) : void {
    if (contact.name === '') return console.warn('invalid name');

    console.log('onsave!', contact);
    this.messengerService.createContact$(contact)
    .subscribe(response => {
      console.log('SAVE CONTACT RESPONSE', response);
      this.router.navigate(['/messenger'])
    });
  }
}
