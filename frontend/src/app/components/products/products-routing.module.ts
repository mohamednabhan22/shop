import { productsComponent } from './products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';


const routes: Routes = [
  {path:"",component:productsComponent },
  {path:":id",component:ProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class productsRoutingModule { }
