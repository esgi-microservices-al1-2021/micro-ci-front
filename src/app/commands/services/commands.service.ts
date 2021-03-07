import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Command} from '../models/command.model';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllByProjectId(projectId: string): Observable<Command[]> {
    return of();
  }
}
