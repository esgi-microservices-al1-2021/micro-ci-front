import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DetailsContainer, ProjectsContainer} from './projects';

const routes: Routes = [
  {
    path: '',
    component: ProjectsContainer
  },
  {
    path: 'project/id',
    component: DetailsContainer
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
