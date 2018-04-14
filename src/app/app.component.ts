import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationStart, NavigationEnd, Event as NavigationEvent } from '@angular/router';

/* Services */
import { AppHeaderService } from './app-core/app-header.service';
import { AppModalService } from './app-core/app-modal.service';
import { AppNotificationService } from './app-core/app-notification.service';

/* Modal */
import { Modal } from './app-core/Modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  menuActive = false;

  navElem = null;

  modalActiveState = false;
  notificationState = false;

  modalConfig = Modal;
  notificationConfig = {};

  actionMenuActive = false;

  showMenuAction = true;
  showBackAction = false;

  actionMenu = <any>[];

  appReady = false;

  touches = {
    "touchstart": {"x":-1, "y":-1},
  	"touchmove" : {"x":-1, "y":-1},
  	"touchend"  : false,
  	"direction" : "undetermined"
  };

  constructor(
    private router: Router,
    private _location: Location,
    private appHeader: AppHeaderService,
    private appModal: AppModalService,
    private appNotification: AppNotificationService) {
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
    this.navElem = document.getElementById('navWrapper');

    this.navElem.addEventListener('touchstart', (event) => {
      let touch = event.touches[0];
      this.touches[event.type].x = touch.pageX;
      this.touches[event.type].y = touch.pageY;
    }, false);

    this.navElem.addEventListener('touchmove', (event) => {
      let touch = event.touches[0];
      this.touches[event.type].x = touch.pageX;
      this.touches[event.type].y = touch.pageY;

      let pageX = touch.pageX;
      pageX = Math.min(Math.max(pageX, 50), 240);
      this.navElem.style.transform = `translate3d(${0-(240 - pageX)}px, 0, 0)`;
    }, false);

  	this.navElem.addEventListener('touchend', (event) => {
      // console.log('touchend', event);
      let difference = (this.touches['touchstart'].x - this.touches['touchmove'].x);

      if (difference >= 50) {
        this.toggleMenu();
      }

      // this.touches[event.type] = true;
      // let x = (this.touches['touchstart'].x - this.touches['touchmove'].x);
      // let y = (this.touches['touchstart'].y - this.touches['touchmove'].y);
      // if (x < 0) x /= -1;
      // if (y < 0) y /= -1;
      // if (x > y)
      //   console.log(this.touches['touchstart'].x < this.touches['touchmove'].x ? "right" : "left");
      // else
      //   console.log(this.touches['touchstart'].y < this.touches['touchmove'].y ? "down" : "up");
    }, false);
  }

  toggleMenu(active?: boolean): void {
    this.menuActive = !this.menuActive;
    this.navElem.style.transform = null;
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
