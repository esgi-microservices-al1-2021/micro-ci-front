import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CommandsConfiguration} from '../models/commands.configuration.model';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  constructor(
    private http: HttpClient
  ) { }

  getConfigurationByProjectId(projectId: string): Observable<CommandsConfiguration> {
    return of();
  }

  /* TODO
    - getConfigurationByProjectId
    - create
    - update
    - delete
   */
}
