import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Message }          from '../message';
import { Contact }          from '../contact';
import { MessengerService } from '../messenger.service';
import { AppHeaderService } from '../../app-header.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  contactId: string;
  contact: Contact;
  shouldConfirmDelete: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messengerService: MessengerService,
    private appHeader: AppHeaderService
  ) {
    this.appHeader.setAppHeader({
      title: 'Edit Contact',
      showBackAction: true
    })
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.contactId = id;
    this.getContactDetails(this.contactId);
  }

  onSave(contact : Contact) : void {
    console.log('save it...', contact);
    this.messengerService.saveContact$(contact)
    .subscribe(contact => {
      console.log('GOT CONTACT', contact);

      this.contact = contact;
      this.router.navigate(['messenger/view', this.contactId]);
    }, err => {
      console.warn('ERR occurred');
      console.warn(err);
    });
  }

  onDelete(contact : Contact) : void {
    console.log('delete it...', contact);
    this.messengerService.deleteContact$(contact)
    .subscribe(res => {
      console.log('GOT death', res);

      this.contact = null;
      this.router.navigate(['messenger']);
    }, err => {
      console.warn('ERR occurred');
      console.warn(err);
    });
  }

  getContactDetails(contactId) : void {
    this.messengerService.fetchContact$(contactId)
    .subscribe(contact => {
      if (!contact) {
        console.error(`could not load contact ${contactId}`);
        return this.router.navigate(['messenger']);
      }

      this.contact = contact;
    }, err => {
      console.warn('Error occurred');
      console.warn(err);
      this.router.navigate(['messenger']);
    }, () => {
      console.log('completed?');
    });
  }
}