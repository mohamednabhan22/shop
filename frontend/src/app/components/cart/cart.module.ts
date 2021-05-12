import { cartRoutingModule } from './cart-routing.module';
import { sharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart.component';




@NgModule({
  declarations: [    CartComponent
  ],
  imports: [
    RouterModule,sharedModule,cartRoutingModule
  ],
  exports: [
    
    CartComponent
  ]
})
export class cartModule { }
