import { AuthGuardGuard } from './components/auth/auth-guard.guard';

import { HomeComponent } from './components/home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuardGuard } from './components/admin/add-product/admin-guard.guard';


const routes: Routes = [

  {path:"",component:HomeComponent},
{
  path: "service",
  loadChildren: () => import("./components/service/service.module").then(m => m.serviceModule)
},
{
  path: "addProduct",
  loadChildren: () => import("./components/admin/admin.module").then(m => m.adminModule),canActivate:[AdminGuardGuard]
},
{
  path: "about",
  loadChildren: () => import("./components/about/about.module").then(m => m.aboutModule)
},
{
  path: "auth",
  loadChildren: () => import("./components/auth/auth.module").then(m => m.AuthModule)
},{
  path: "products",
  loadChildren: () => import("./components/products/products.module").then(m => m.productsModule)
},{
  path: "contact",
  loadChildren: () => import("./components/contact/contact.module").then(m => m.contactModule)
},
{
  path: "cart",
  loadChildren: () => import("./components/cart/cart.module").then(m => m.cartModule)
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
