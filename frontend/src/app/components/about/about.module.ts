import { AboutComponent } from './about.component';
import { NgModule } from '@angular/core';
import { sharedModule } from './../../shared/shared.module';
import { aboutRoutingModule } from './about-routing.module';


@NgModule({
  declarations: [AboutComponent],
  imports: [
    sharedModule,
    aboutRoutingModule
  ]
})
export class aboutModule { }
