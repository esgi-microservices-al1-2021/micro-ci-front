import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core';
import {ProjectsModule} from './projects';
import {CommandsModule} from './commands';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    CoreModule,

    ProjectsModule,
    CommandsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
