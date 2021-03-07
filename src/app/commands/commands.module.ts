import {NgModule} from '@angular/core';
import {SharedModule} from '../shared';
import {CommandsListComponent} from './components/commands-list/commands-list.component';


@NgModule({
  declarations: [
    CommandsListComponent
  ],
  exports: [
    CommandsListComponent
  ],
  imports: [
    SharedModule
  ]
})
export class CommandsModule {
}
