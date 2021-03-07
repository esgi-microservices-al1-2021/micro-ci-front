import {Component, OnDestroy, OnInit} from '@angular/core';
import {Project} from '../../models/project.model';
import {Subject} from 'rxjs';
import {ProjectsService} from '../../services/projects.service';
import {finalize, takeUntil} from 'rxjs/operators';

@Component({
  templateUrl: './projects.container.html'
})
export class ProjectsContainer implements OnInit, OnDestroy {

  projects: Project[];
  isLoading = false;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {

    this.isLoading = true;
    this.projectsService.getProjects()
      .pipe(
        finalize(() => this.isLoading = false),
        takeUntil(this.destroy$)
      )
      .subscribe(
        value => this.projects = value,
        error => console.error(error)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
