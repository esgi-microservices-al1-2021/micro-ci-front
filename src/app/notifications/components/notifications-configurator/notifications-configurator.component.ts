import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Project} from '../../../projects';
import {NotificationConfiguration} from '../../models/notification.configuration.model';
import {NotificationsService} from '../../services/notifications.service';
import {Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ci-notifications-configurator',
  templateUrl: './notifications-configurator.component.html',
  styleUrls: ['./notifications-configurator.component.scss']
})
export class NotificationsConfiguratorComponent implements OnInit, OnDestroy {

  @Input()
  project: Project;

  notificationConfiguration: NotificationConfiguration;

  isLoading = false;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.notificationsService.getConfigurationByProjectId(this.project.id)
      .pipe(
        finalize(() => this.isLoading = false),
        takeUntil(this.destroy$)
      )
      .subscribe(
        value => this.notificationConfiguration = value,
        error => console.log(error)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
