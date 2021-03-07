import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {NotificationConfiguration} from '../models/notification.configuration.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private http: HttpClient
  ) { }

  getConfigurationByProjectId(projectId: string): Observable<NotificationConfiguration> {
    return of();
  }
}
