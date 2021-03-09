import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from '../../models/project.model';

@Component({
  selector: 'ci-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  @Input() project: Project;
  @Output() projectChange: EventEmitter<Project> = new EventEmitter<Project>();
  @Input() inEditMode: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
