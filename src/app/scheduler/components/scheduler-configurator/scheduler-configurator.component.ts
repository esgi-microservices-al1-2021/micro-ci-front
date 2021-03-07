import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Project} from '../../../projects';
import {SchedulerConfiguration} from '../../models/scheduler.configuration.model';
import {SchedulerService} from '../../services/scheduler.service';
import {finalize, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ci-scheduler-configurator',
  templateUrl: './scheduler-configurator.component.html',
  styleUrls: ['./scheduler-configurator.component.scss']
})
export class SchedulerConfiguratorComponent implements OnInit, OnDestroy {

  @Input()
  project: Project;

  schedulerConfiguration: SchedulerConfiguration;

  isLoading = false;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private schedulerService: SchedulerService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.schedulerService.getSchedulerConfigurationByProjectId(this.project.id)
      .pipe(
        finalize(() => this.isLoading = false),
        takeUntil(this.destroy$)
      )
      .subscribe(
        value => this.schedulerConfiguration = value,
        error => console.log(error)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
