import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Project} from '../../../projects';
import {NotificationConfiguration} from '../../models/notification.configuration.model';
import {NotificationsService} from '../../services/notifications.service';
import {Observable, of, Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ci-notifications-configurator',
  templateUrl: './notifications-configurator.component.html',
  styleUrls: ['./notifications-configurator.component.scss']
})
export class NotificationsConfiguratorComponent implements OnChanges, OnDestroy {

  @Input() project: Project;
  @Input() inEditMode: boolean;

  notificationConfiguration: NotificationConfiguration;

  isLoading = false;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private notificationsService: NotificationsService
  ) { }

  ngOnChanges({project, inEditMode}: SimpleChanges): void {
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

  saveOrUpdate(project: Project): Observable<NotificationConfiguration> {
    console.log('call notificationsService');
    return of();
  }
}
