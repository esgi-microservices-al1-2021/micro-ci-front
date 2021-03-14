import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {BuildService} from '../../services/build.service';
import {Build} from '../../models/build.model';

@Component({
  templateUrl: './builds.container.html'
})
export class BuildsContainer implements OnInit, OnDestroy {

  projectId: string;
  builds: Build[];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private buildService: BuildService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(params => params.id),
        tap(projectId => this.projectId = projectId),
        switchMap(projectId => this.buildService.getBuildsForProject(projectId)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        value => this.builds = value,
        error => console.error(error)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
