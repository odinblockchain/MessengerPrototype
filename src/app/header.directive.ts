import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-header]'
})
export class HeaderDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
