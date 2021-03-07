import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from './material';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    MaterialModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }
