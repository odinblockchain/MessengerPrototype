import { Component, OnInit, ElementRef, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/multicast';

/* App Core */
import { IdentityService } from '../../app-core/identity.service';

/* Models */
import { Message }          from '../Message';
import { Contact }          from '../Contact';

/* Services */
import { MessengerService } from '../messenger.service';
import { AppHeaderService } from '../../app-core/app-header.service';
import { AppModalService } from '../../app-core/app-modal.service';
import { WalletService } from '../../wallet/wallet.service';
import { MockResponseService } from '../mock/mock-response.service';

let onSelect : (message: Message) => void;

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['../common.scss', './message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit, AfterViewChecked {
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
  shouldScrollView: boolean = true;
  inputHasWarning: boolean = false;

  autoScrollTimeoutId = null;

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messengerService: MessengerService,
    private appHeader: AppHeaderService,
    private appModal: AppModalService,
    private walletService: WalletService,
    private identity: IdentityService,
    private mockResponse: MockResponseService,
    private el: ElementRef
  ) {
    this.appHeader.setAppHeader({
      title: 'Loading Messages',
      showBackAction: true
    });
  }

  /*  View State Methods
  */

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.contactId = id;
    this.getContactDetails();

    this.messengerService.messageStream
    .map(messages => {
      return messages.filter(message => message.contactId === this.contactId);
    })
    .subscribe(messages => {
      console.info('===> messageStream', messages);
      this.messages = messages;

      this.autoScrollTimeoutId = setTimeout(()=>{
        this.scrollToRecentMessage();
      }, 2000);
    });

    this.autoScrollTimeoutId = setTimeout(()=>{
      this.shouldScrollView = false;
    }, 3000);
  }

  ngAfterViewChecked() {
    if (this.shouldScrollView) this.scrollToRecentMessage();
  }

  ngOnDestroy() {
    clearTimeout(this.autoScrollTimeoutId);
  }

  scrollToRecentMessage() : void {
    this.el.nativeElement.parentElement.scrollTop = this.messageListScrollHeight();
  }

  messageListScrollHeight() : number {
    try {
      return this.el.nativeElement.parentElement.scrollHeight;
    } catch (err) {
      console.warn('!! Unable to determine message list height', err);
      return 0;
    }
  }

  /*  View Action Methods
  */
  onSelect = (message) => {
    this.shouldScrollView = false;
    if (this.selectedMessage === message) {
      return this.selectedMessage = null;
    }
    console.log('onSelect');
    this.selectedMessage = message;
  }

  onSend = () : void => {
    this.inputHasWarning = false;
    if (this.showPaymentInput === true) {
      // handle payment send
      this.sendPaymentMessage();
    }
    else if (this.showMessageInput === true) {
      // handle message send
      this.sendTextMessage();
    }
  }

  onAttach = () : void => {
    console.log('onAttach click');
    this.toggleAttachMenu();
    if (this.showAttachMenu === false && this.showPaymentInput === true) {
      this.toggleMessageInput(true);
      this.togglePaymentInput(false);
    }
  }

  onAttachPaymentClick = () : void => {
    console.log('onAttachPayment click');
    this.toggleMessageInput();
    this.togglePaymentInput();
  }

  /*  Internal Methods
  */
  toggleMessageInput(state?:boolean) : void {
    let _state = (state) ? state : !this.showMessageInput;
    this.showMessageInput = _state;
  }

  togglePaymentInput(state?:boolean) : void {
    let _state = (state) ? state : !this.showPaymentInput;
    this.showPaymentInput = _state;
  }

  toggleAttachMenu(state?:boolean) : void {
    let _state = (state) ? state : !this.showAttachMenu;
    this.showAttachMenu = _state;
  }

  sendPaymentMessage() : void {
    if (isNaN(this.odnAmount)) {
      this.inputHasWarning = true;
      return console.warn('Invalid payment attachment');
    }

    this.odnAmount = Number(this.odnAmount);
    this.walletService.sendTransaction$(this.contactId, this.odnAmount)
    .takeUntil(this.unsubscribe)
    .subscribe(response => {
      console.info('sendTransaction$ response', response);

      if (response) {
        this.messengerService.sendMessage$(this.contactId, `${this.odnAmount} ODN has been sent`, { type: 'payment-out', amount: this.odnAmount })
        .subscribe(message => {
          this.onAttach();
          this.odnAmount = 0;
        });
      }
    });
  }

  sendTextMessage() : void {
    if (!this.newMessage ||
        this.newMessage.replace(/\s/g, '') === '') {
      this.inputHasWarning = true;
      return console.warn('Invalid message');
    }

    this.messengerService.sendMessage$(this.contactId, this.newMessage)
    .subscribe(message => {
      console.info('Contact Messages', message);

      this.newMessage = '';
      this.mockResponse.triggerMock(message);
    });
  }

  getContactDetails() : void {
    this.messengerService.fetchContact$(this.contactId)
    .subscribe(contact => {
      if (!contact) {
        console.error(`Error loading contact ${this.contactId}`);
        return this.router.navigate(['/messenger']);
      }

      this.contact = contact;
      this.appHeader.setAppHeader({
        title: `${this.contact.name}`,
        actions: [
          { label: 'Edit Contact', link:`messenger/edit/${this.contact.id}` }
        ]
      });
    }, err => {
      console.warn(`Error loading contact ${this.contactId}`, err);
      this.router.navigate(['/messenger']);
    }, () => {
      console.info('Contact Loaded');
    });
  }
}
