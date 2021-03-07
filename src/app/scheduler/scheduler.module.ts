import {NgModule} from '@angular/core';
import {SchedulerConfiguratorComponent} from './components/scheduler-configurator/scheduler-configurator.component';
import {SharedModule} from '../shared';


@NgModule({
  declarations: [
    SchedulerConfiguratorComponent
  ],
  exports: [
    SchedulerConfiguratorComponent
  ],
  imports: [
    SharedModule
  ]
})
export class SchedulerModule { }
