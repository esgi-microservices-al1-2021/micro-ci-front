import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DetailsContainer, ProjectsContainer} from './projects';
import {BuildsContainer} from './build';

const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectsContainer },
  { path: 'projects/new', component: DetailsContainer, data: {inEditMode: true} },
  { path: 'project/:id', component: DetailsContainer },
  { path: 'project/:id/edit', component: DetailsContainer, data: {inEditMode: true} },
  { path: 'project/:id/builds', component: BuildsContainer }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
