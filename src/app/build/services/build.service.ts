import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Build} from '../models/build.model';

@Injectable({
  providedIn: 'root'
})
export class BuildService {

  constructor(
    private http: HttpClient
  ) { }

  getBuildsForProject(projectId: string): Observable<Build[]> {
    // TODO transform this method to return Page<Build>
    return of();
  }
}
