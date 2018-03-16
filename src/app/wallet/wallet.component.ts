import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wallet-module',
  host: { 'class': 'wallet-module' },
  styleUrls: ['./wallet.component.scss'],
  template:  `<router-outlet></router-outlet>`
})
export class WalletComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
