import {NgModule} from '@angular/core';
import {SharedModule} from '../shared';
import {ProjectsListComponent} from './components/projects-list/projects-list.component';
import {ProjectsContainer} from './containers/list/projects.container';
import {DetailsContainer} from './containers/details/details.container';
import {CommandsModule} from '../commands';
import {NotificationsModule} from '../notifications';
import {SchedulerModule} from '../scheduler';


@NgModule({
  declarations: [
    ProjectsListComponent,
    ProjectsContainer,
    DetailsContainer
  ],
  imports: [
    SharedModule,
    CommandsModule,
    NotificationsModule,
    SchedulerModule
  ]
})
export class ProjectsModule { }
