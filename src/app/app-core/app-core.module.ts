import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* App Services */
import { IdentityService } from './identity.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    IdentityService
  ],
  declarations: []
})
export class AppCoreModule { }
