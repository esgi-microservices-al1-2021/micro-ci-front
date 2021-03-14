import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {SharedModule} from '../shared';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {

    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import CoreModule in the AppModule only.');
    }
  }
}
