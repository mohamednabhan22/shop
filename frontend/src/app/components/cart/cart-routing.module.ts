import { cartResolver } from './cart-resolver.service';
import { CartComponent } from './cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {path:"",component:CartComponent, resolve: {carts: cartResolver} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class cartRoutingModule { }
