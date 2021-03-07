import {NgModule} from '@angular/core';
import {SharedModule} from '../shared';
import {CommandsConfiguratorComponent} from './components/commands-configurator/commands-configurator.component';


@NgModule({
  declarations: [
    CommandsConfiguratorComponent
  ],
  exports: [
    CommandsConfiguratorComponent
  ],
  imports: [
    SharedModule
  ]
})
export class CommandsModule {
}
