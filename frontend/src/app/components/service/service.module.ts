import { sharedModule } from './../../shared/shared.module';
import { ServiceComponent } from './service.component';
import { NgModule } from '@angular/core';
import { serviceRoutingModule } from './service-routing.module';




@NgModule({
  declarations: [ServiceComponent],
  imports: [
    sharedModule,
    serviceRoutingModule
  ]
})
export class serviceModule { }
