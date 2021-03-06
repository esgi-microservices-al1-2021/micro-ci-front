import {Injectable} from '@angular/core';
import {Project} from '../models/project.model';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private http: HttpClient
  ) {}

  getAllByPage(): Observable<Project[]> {
    return of([{id: 'az123', name: 'project1'}]);
  }

  getById(projectId: string): Observable<Project> {
    console.log(projectId);
    return of({id: 'az123', name: 'project1'});
  }

  saveOrUpdate(project: Project): Observable<Project> {
    console.log('saveOrUpdate project');
    return of({id: 'test', name: 'test'});
  }
}
