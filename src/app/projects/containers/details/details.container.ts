import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectsService} from '../../services/projects.service';
import {Project} from '../../models/project.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  templateUrl: './details.container.html'
})
export class DetailsContainer implements OnInit, OnDestroy {

  project: Project;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private projectsService: ProjectsService
  ) { }

  ngOnInit(): void {
    this.projectsService.getById('az123')
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        value => this.project = value,
        error => console.error(error)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
