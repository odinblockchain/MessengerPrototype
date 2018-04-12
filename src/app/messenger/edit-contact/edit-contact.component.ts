import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* Models */
import { Message }          from '../Message';
import { Contact }          from '../Contact';

/* Services */
import { MessengerService } from '../messenger.service';
import { AppHeaderService } from '../../app-core/app-header.service';
import { AppModalService }  from '../../app-core/app-modal.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  contactId: string;
  contact: Contact;
  shouldConfirmDelete: boolean;
  contactForm : FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messengerService: MessengerService,
    private appHeader: AppHeaderService,
    private appModal: AppModalService,
    private fb: FormBuilder
  ) {
    this.appHeader.setAppHeader({
      title: 'Edit Contact',
      showBackAction: true
    })

    this.contactForm = fb.group({
      'name': ['', Validators.required],
      'id': [{value: '', disabled: true }, Validators.required]
    })
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.contactId = id;
    this.getContactDetails();
  }

  onSave(contact : Contact) : void {
    this.messengerService.saveContact$(contact)
    .subscribe(contact => {
      console.info('Saved Contact Details');
      this.router.navigate(['messenger/view', this.contactId]);
    }, err => {
      console.warn('Unable to save contact details', err);
    });
  }

  onDelete(contact : Contact) : void {
    console.info('Confirming delete action...');

    this.appModal.showConfirmModal({title: 'Delete this contact?', body: `${contact.name} will be removed from your contact list and all associated messages will be wiped.`})
    .subscribe(response => {
      if (response) {
        this.messengerService.deleteContact$(contact)
        .subscribe(res => {
          console.info('Removed Contact');
          this.router.navigate(['messenger']);
        }, err => {
          console.warn('Unable to delete contact details', err);
        });
      }
    });
  }

  getContactDetails() : void {
    this.messengerService.fetchContact$(this.contactId)
    .subscribe(contact => {
      if (!contact) {
        console.error(`Unable to load contact ${this.contactId}`);
        return this.router.navigate(['messenger']);
      }

      this.contact = contact;
    }, err => {
      console.warn('Error occurred loading contact', err);
      this.router.navigate(['messenger']);
    }, () => {
      this.contactForm.controls['name'].setValue(this.contact.name);
      this.contactForm.controls['id'].setValue(this.contact.id);
    });
  }
}
