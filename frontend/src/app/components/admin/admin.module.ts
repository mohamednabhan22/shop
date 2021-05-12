import { sharedModule } from './../../shared/shared.module';
import { addProductRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { AddProductComponent } from './add-product/add-product.component';



@NgModule({
  declarations: [AddProductComponent],
  imports: [
    sharedModule,
    addProductRoutingModule
  ]
})
export class adminModule { }
