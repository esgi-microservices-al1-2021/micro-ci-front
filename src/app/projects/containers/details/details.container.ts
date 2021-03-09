import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {ProjectsService} from '../../services/projects.service';
import {Project} from '../../models/project.model';
import {forkJoin, Subject} from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';
import {SchedulerConfiguratorComponent} from '../../../scheduler/components/scheduler-configurator/scheduler-configurator.component';
import {CommandsConfiguratorComponent} from '../../../commands/components/commands-configurator/commands-configurator.component';
import {NotificationsConfiguratorComponent} from '../../../notifications/components/notifications-configurator/notifications-configurator.component';

@Component({
  templateUrl: './details.container.html'
})
export class DetailsContainer implements OnInit, OnDestroy, AfterViewInit {

  project: Project;
  editMode = false;

  @ViewChild('commandsConfigurator') commandsConfigurator: CommandsConfiguratorComponent;
  @ViewChild('notificationsConfigurator') notificationsConfigurator: NotificationsConfiguratorComponent;
  @ViewChild('schedulerConfigurator') schedulerConfigurator: SchedulerConfiguratorComponent;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private projectsService: ProjectsService
  ) { }

  ngOnInit(): void {
    this.projectsService.getById('az123')
      .pipe(
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

  ngAfterViewInit(): void {
    this.saveOrUpdateProject();
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
