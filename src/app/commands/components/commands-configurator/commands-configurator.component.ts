import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Project} from '../../../projects';
import {CommandsService} from '../../services/commands.service';
import {Observable, of, Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {CommandsConfiguration} from '../../models/commands.configuration.model';

@Component({
  selector: 'ci-commands-configurator',
  templateUrl: './commands-configurator.component.html',
  styleUrls: ['./commands-configurator.component.scss']
})
export class CommandsConfiguratorComponent implements OnChanges, OnDestroy {

  @Input() project: Project;
  @Input() inEditMode: boolean;

  commandsConfiguration: CommandsConfiguration;
  isLoading = false;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private commandsService: CommandsService
  ) { }

  ngOnChanges({project, inEditMode}: SimpleChanges): void {
    this.isLoading = true;
    this.commandsService.getConfigurationByProjectId(this.project.id)
      .pipe(
        finalize(() => this.isLoading = false),
        takeUntil(this.destroy$)
      )
      .subscribe(
        value => this.commandsConfiguration = value,
        err => console.log(err)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  saveOrUpdate(project: Project): Observable<CommandsConfiguration> {
    console.log('call commandsService');
    return of();
  }

}
