import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import { Message }          from '../message';
import { Contact }          from '../contact';
import { MessengerService } from '../messenger.service';
import { AppHeaderService } from '../../app-header.service';
import { AppModalService } from '../../app-modal.service';

import { WalletService } from '../../wallet/wallet.service';
import { IdentityService } from '../../app-core/identity.service';
import { MockResponseService } from '../../app-helpers/mock-response.service';

import 'rxjs/add/operator/multicast';

let onSelect : (message: Message) => void;

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['../common.scss', './message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {
  message: Message;
  contact: Contact;
  contactId: string;
  messages: Message[];
  selectedMessage: Message;


  newMessage: string;
  odnAmount: number;

  showAttachMenu: boolean = false;

  showMessageInput: boolean = true;
  showPaymentInput: boolean = false;

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messengerService: MessengerService,
    private appHeader: AppHeaderService,
    private appModal: AppModalService,
    private walletService: WalletService,
    private identity: IdentityService,
    private mockResponse: MockResponseService
  ) {
    this.appHeader.setAppHeader({
      title: 'Loading Contact',
      showBackAction: true
    });
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.contactId = id;
    this.getMessages(this.contactId);
    this.getContactDetails(this.contactId);

    // let m = this.messengerService.source.multicast(new Subject<number>());
    // m.subscribe(this.messengerService.observe('a'));
    // m.subscribe(this.messengerService.observe('b'));
    // m.connect();
    this.messengerService.messageStream
    .map(messages => {
      return messages.filter(message => message.contactId === this.contactId);
    })
    .subscribe(modal => {
      console.info('===> messageStream', modal);
      this.messages = modal;
    });

    // setTimeout(()=> {
    //   console.log('setting');
    //   this.messengerService.messageStreamSource.next('foo');
    // }, 3000);


    // this.appHeader.setAppHeader({
    //   title: 'Messenger Detail',
    //   showBackAction: true
    // })

    // this.appHeader.setAppHeader({
    //   title: 'Message Detail',
    //   showBackAction: true,
    //   actions: [
    //     { label: 'Edit Contact', link: '/edit' },
    //     { label: 'Delete Contact', link: '/delete' }
    //   ]
    // });

    // this.messageId = this.route.paramMap
    // .switchMap((params: ParamMap) => {
    //   return params.get('id');
    // });
    // this.message$ = this.route.paramMap
    // .switchMap((params: ParamMap) =>
    //   this.service.getHero(params.get('id')));
  }

  onSelect = (message) => {
    if (this.selectedMessage === message) {
      return this.selectedMessage = null;
    }

    this.selectedMessage = message;
  }

  onSend() : void {
    if (this.showPaymentInput === true) {
      // handle payment send
      if (isNaN(this.odnAmount)) {
        console.warn('invalid amount, must be numeric');
        this.odnAmount = 0;
        return;
      }

      this.odnAmount = Number(this.odnAmount);
      this.walletService.sendTransaction(this.contactId, this.odnAmount)
      .takeUntil(this.unsubscribe)
      .subscribe(response => {
        console.info('sendTransaction response', response);

        if (response) {
          this.messengerService.sendMessage$(this.contactId, `${this.odnAmount} ODN has been sent`, { type: 'payment-out', amount: this.odnAmount })
          .subscribe(message => {
            console.log('GOT MESSAGE', message);
            this.onAttach();
            this.odnAmount = 0;
            // this.mockResponse.triggerMock(message);
          });
        }
      });
    }
    else if (this.showMessageInput === true) {
      // handle message send
      if (!this.newMessage) return console.warn('message empty');
      if (this.newMessage.replace(/\s/g, '') === '') return console.warn('invalid message');

      console.log('onsend!', this.newMessage);

      this.messengerService.sendMessage$(this.contactId, this.newMessage)
      .subscribe(message => {
        console.log('GOT MESSAGE', message);

        this.newMessage = '';
        this.mockResponse.triggerMock(message);
      });
    }
  }

  onAttach = () : void => {
    console.log('onAttach click');
    this.toggleAttachMenu();
    if (this.showAttachMenu === false && this.showPaymentInput === true) {
      console.log('showAttachMenu && showPaymentInput still active?');
      this.toggleMessageInput(true);
      this.togglePaymentInput(false);
    }
  }

  onAttachPaymentClick = () : void => {
    console.log('onAttachPayment click');
    this.toggleMessageInput();
    this.togglePaymentInput();
  }

  toggleMessageInput(state?:boolean) : void {
    let _state = (state) ? state : !this.showMessageInput;
    console.log(`setting showMessageInput to: ${_state}`);
    this.showMessageInput = _state;
  }

  togglePaymentInput(state?:boolean) : void {
    let _state = (state) ? state : !this.showPaymentInput;
    console.log(`setting showPaymentInput to: ${_state}`);
    this.showPaymentInput = _state;
  }

  toggleAttachMenu(state?:boolean) : void {
    let _state = (state) ? state : !this.showAttachMenu;
    console.log(`setting showAttachMenu to: ${_state}`);
    this.showAttachMenu = _state;
  }

  getContactDetails(contactId) : void {
    this.messengerService.fetchContact$(contactId)
    .subscribe(contact => {
      if (!contact) {
        console.error(`could not load conact ${contactId}`);
        return this.router.navigate(['/messenger']);
      }

      this.contact = contact;
      this.appHeader.setAppHeader({
        title: `${this.contact.name}`,
        actions: [
          { label: 'Edit Contact', link:`messenger/edit/${this.contact.id}` }
        ]
      })
    }, err => {
      console.warn('Error occurred');
      console.warn(err);
      this.router.navigate(['/messenger']);
    }, () => {
      console.log('completed?');
    });
  }

  getMessages(contactId): void {
    console.warn('--- SKIP GET MESSAGES --');
    return;

    // this.messengerService.fetchContactMessages$(contactId)
    // .subscribe(messages => {
    //   console.log('GOT MESSAGES', messages);
    //   this.messages = messages;
    // });
  }
}
