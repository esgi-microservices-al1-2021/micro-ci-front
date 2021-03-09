import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {ProjectsService} from '../../services/projects.service';
import {Project} from '../../models/project.model';
import {forkJoin, Subject} from 'rxjs';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {SchedulerConfiguratorComponent} from '../../../scheduler/components/scheduler-configurator/scheduler-configurator.component';
import {CommandsConfiguratorComponent} from '../../../commands/components/commands-configurator/commands-configurator.component';
import {NotificationsConfiguratorComponent} from '../../../notifications/components/notifications-configurator/notifications-configurator.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './details.container.html'
})
export class DetailsContainer implements OnInit, OnDestroy {

  project: Project;
  editMode: boolean;

  @ViewChild('commandsConfigurator') commandsConfigurator: CommandsConfiguratorComponent;
  @ViewChild('notificationsConfigurator') notificationsConfigurator: NotificationsConfiguratorComponent;
  @ViewChild('schedulerConfigurator') schedulerConfigurator: SchedulerConfiguratorComponent;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.data
      .pipe(
        map(datas => datas.inEditMode),
      )
      .subscribe(inEditMode => this.editMode = inEditMode != null);

    this.route.params
      .pipe(
        map(params => params.id),
        switchMap(projectId => this.projectsService.getById(projectId)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        value => this.project = value,
        error => console.error(error)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  saveOrUpdateProject(): void {
    this.projectsService.saveOrUpdate(this.project)
      .pipe(
        switchMap(project => forkJoin([
          this.commandsConfigurator.saveOrUpdate(project),
          this.notificationsConfigurator.saveOrUpdate(project),
          this.schedulerConfigurator.saveOrUpdate(project)
        ])),
        takeUntil(this.destroy$)
      ).subscribe();
  }
}
