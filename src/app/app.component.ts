import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router, NavigationStart, NavigationEnd, Event as NavigationEvent } from '@angular/router';

import { AppHeaderService } from './app-header.service';
import { AppModalService } from './app-modal.service';
import { AppNotificationService } from './app-notification.service';

import { MockResponseService } from './app-helpers/mock-response.service';
import { Modal } from './Modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  menuActive = false;

  modalActiveState = false;
  notificationState = false;

  modalConfig = Modal;
  notificationConfig = {};

  actionMenuActive = false;

  showMenuAction = true;
  showBackAction = false;

  actionMenu = <any>[];

  appReady = false;

  constructor(
    private router: Router,
    private _location: Location,
    private appHeader: AppHeaderService,
    private appModal: AppModalService,
    private appNotification: AppNotificationService,
    private mockResponse: MockResponseService) {
    /*  Route event types
        NavigationEnd
        NavigationCancel
        NavigationError
        RoutesRecognized
    */
    router.events.forEach((event: NavigationEvent) => {
      // Before Navigation (event instanceof NavigationStart)
      if (event instanceof NavigationStart) {
        this.appHeader.setAppHeader({
          actions: [],
          showBackAction: false
        });
      }

      //After Navigation (event instanceof NavigationEnd)
      if (event instanceof NavigationEnd) {
        if (this.menuActive === true) this.menuActive = false;
        if (this.actionMenuActive === true) this.actionMenuActive = false;
      }
    });
  }

  ngOnInit() {
    this.appHeader.title.subscribe(message => this.title = message);
    this.appHeader.showMenuAction.subscribe(displayState => this.showMenuAction = displayState);
    this.appHeader.showBackAction.subscribe(displayState => this.showBackAction = displayState);
    this.appHeader.actionMenu.subscribe(actionMenuItems => this.actionMenu = actionMenuItems);

    this.appModal.showModal.subscribe(state => this.modalActiveState = state);
    this.appModal.modal.subscribe(modal => this.modalConfig = modal);

    this.appNotification.showNotification.subscribe(state => this.notificationState = state);
    this.appNotification.notification.subscribe(notification => this.notificationConfig = notification);

    this.appReady = true;
  }

  toggleMenu(active?: boolean): void {
    this.menuActive = !this.menuActive;
    console.log('toggleMenu', this.menuActive);
  }

  toggleActionMenu(active? : boolean) : void {
    this.actionMenuActive = !this.actionMenuActive;
    console.log('toggleActionMenu', this.actionMenuActive);
  }

  goBackAction() : void {
    console.log('goback');
    this._location.back();
  }

  modalClick(e) : void {
    console.log('e', e);
    this.appModal.onModalClick();
  }

  modalConfirm(confirmation?:boolean) : void {
    this.appModal.onConfirmAction(confirmation);
  }
}
