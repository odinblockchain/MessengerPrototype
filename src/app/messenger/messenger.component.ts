import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'messenger-module',
  host: { 'class': 'messenger-module' },
  styleUrls: ['./messenger.component.scss'],
  template:  `<router-outlet></router-outlet>`
})
export class  MessengerComponent { }
