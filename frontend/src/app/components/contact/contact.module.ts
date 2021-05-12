import { ContactComponent } from './contact.component';
import { NgModule } from '@angular/core';
import { contactRoutingModule } from './contact-routing.module';
import { sharedModule } from './../../shared/shared.module';


@NgModule({
  declarations: [ContactComponent],
  imports: [
       sharedModule,
    contactRoutingModule
  ]
})
export class contactModule { }
