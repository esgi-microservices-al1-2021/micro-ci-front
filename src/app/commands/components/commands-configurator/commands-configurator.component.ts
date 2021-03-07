import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Project} from '../../../projects';
import {CommandsService} from '../../services/commands.service';
import {Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {CommandsConfiguration} from '../../models/commands.configuration.model';

@Component({
  selector: 'ci-commands-configurator',
  templateUrl: './commands-configurator.component.html',
  styleUrls: ['./commands-configurator.component.scss']
})
export class CommandsConfiguratorComponent implements OnInit, OnDestroy {

  @Input()
  project: Project;

  commandsConfiguration: CommandsConfiguration;
  isLoading = false;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private commandsService: CommandsService
  ) { }

  ngOnInit(): void {
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

}
