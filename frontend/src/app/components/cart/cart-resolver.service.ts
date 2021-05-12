import { productService } from './../products/products.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';




@Injectable()
export class cartResolver implements Resolve<any> {
  cartItems
  constructor(private productService: productService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.productService.getCart().subscribe( (res)=>{
      console.log(res.data.getCarts)
      return res.data.getCarts
    return this.cartItems
//  for(let p of this.cartItems){
//  this.totalPrice+=p.totalPrice;
//  //this.totalPrice=this.totalPrice.toFixed(2)
// }

    
    
    },(err)=>{
      console.log(err)
    })  ;;
  }
}

























