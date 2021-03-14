import {NgModule} from '@angular/core';
import {SharedModule} from '../shared';
import {ProjectsListComponent} from './components/projects-list/projects-list.component';
import {ProjectsContainer} from './containers/list/projects.container';
import {DetailsContainer} from './containers/details/details.container';
import {CommandsModule} from '../commands';
import {NotificationsModule} from '../notifications';
import {SchedulerModule} from '../scheduler';
import {ProjectDetailsComponent} from './components/project-details/project-details.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    ProjectsListComponent,
    ProjectsContainer,
    DetailsContainer,
    ProjectDetailsComponent
  ],
    imports: [
        SharedModule,
        CommandsModule,
        NotificationsModule,
        SchedulerModule
    ]
})
export class ProjectsModule { }
