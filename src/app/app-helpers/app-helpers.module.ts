import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoadingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppHelpersModule { }
