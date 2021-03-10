import {NgModule} from '@angular/core';
import {SharedModule} from '../shared';
import { BuildsContainer } from './containers/builds/builds.container';


@NgModule({
  declarations: [
    BuildsContainer
  ],
  imports: [
    SharedModule
  ]
})
export class BuildModule { }
