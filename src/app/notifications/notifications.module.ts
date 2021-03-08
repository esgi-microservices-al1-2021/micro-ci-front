import {NgModule} from '@angular/core';
import {SharedModule} from '../shared';
import {NotificationsConfiguratorComponent} from './components/notifications-configurator/notifications-configurator.component';


@NgModule({
  declarations: [
    NotificationsConfiguratorComponent
  ],
  exports: [
    NotificationsConfiguratorComponent
  ],
  imports: [
    SharedModule
  ]
})
export class NotificationsModule { }
