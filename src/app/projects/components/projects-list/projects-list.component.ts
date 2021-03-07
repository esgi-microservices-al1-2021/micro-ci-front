import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../models/project.model';

@Component({
  selector: 'ci-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  @Input() projects: Project[];
  @Input() isLoading: boolean;

  columns: string[] = ['id', 'name', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }

}
