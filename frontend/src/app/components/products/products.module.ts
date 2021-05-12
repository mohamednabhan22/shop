import { ProductComponent } from './product/product.component';
import { productsComponent } from './products.component';
import { NgModule } from '@angular/core';
import { productsRoutingModule } from './products-routing.module';
import { sharedModule } from './../../shared/shared.module';
@NgModule({
  declarations: [productsComponent,ProductComponent],
  imports: [
    sharedModule,
    productsRoutingModule
  ]
})
export class productsModule { }
