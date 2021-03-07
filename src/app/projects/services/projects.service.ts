import { Injectable } from '@angular/core';
import {Project} from '../models/project.model';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return of([{id: 'az123', name: 'project1'}]);
  }
}
