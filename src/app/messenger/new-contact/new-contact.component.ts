import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

/* Models */
import { Contact } from '../contact';

/* Services */
import { MessengerService } from '../messenger.service';
import { AppHeaderService } from '../../app-header.service';
import { uuid } from '../../app-helpers/uuid';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {
  contactForm : FormGroup;
  contact : Contact = {
    name: '',
    id: uuid.generate(),
    email: ''
  };

  constructor(
    private messengerService: MessengerService,
    private router:Router,
    private appHeader: AppHeaderService,
    private fb: FormBuilder
  ) {
    this.appHeader.setAppHeader({
      title: 'Add Contact',
      showBackAction: true
    })

    this.contactForm = fb.group({
      'name': ['', Validators.required]
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
