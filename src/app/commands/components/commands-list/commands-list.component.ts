import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Project} from '../../../projects';
import {CommandsService} from '../../services/commands.service';
import {Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {Command} from '../../models/command.model';

@Component({
  selector: 'ci-commands-list',
  templateUrl: './commands-list.component.html',
  styleUrls: ['./commands-list.component.scss']
})
export class CommandsListComponent implements OnInit, OnDestroy {

  @Input()
  project: Project;

  commands: Command[];
  isLoading = false;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private commandsService: CommandsService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.commandsService.getAllByProjectId(this.project.id)
      .pipe(
        finalize(() => this.isLoading = false),
        takeUntil(this.destroy$)
      )
      .subscribe(
        value => this.commands = value,
        err => console.log(err)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
