import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {SchedulerConfiguration} from '../models/scheduler.configuration.model';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  constructor(
    private http: HttpClient
  ) { }

  getSchedulerConfigurationByProjectId(projectId: string): Observable<SchedulerConfiguration> {
    return of();
  }
}
