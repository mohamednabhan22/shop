import { AuthServiceService } from './../../auth/auth-service.service';
import { Product } from './../models/products';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { productService } from'../products.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  isAdmin
  isLoged
product
quantity:number=0
total:number=0
id
cartItem
  products:Product[];

  constructor(private productService: productService,private AuthServiceService:AuthServiceService, private route: ActivatedRoute,
              private router: Router) {

              
  }



  ngOnInit() {

    this.AuthServiceService.isAdmin.subscribe(s=>{this.isAdmin=s
      console.log(s)
      })
   
   this.route.params
       .subscribe(
         (params: Params) => {
         this.id = params['id'];
         
          

         }
       );
    
       this.productService.getProduct(this.id).subscribe((res)=>{
         console.log(res)
         this.product=res.getProduct
       },(err)=>{console.log(err)})


       this.productService.getCartItem(this.id).subscribe((res)=>{
        console.log(res.item)
        this.cartItem=res.item
        this.quantity=res.item.amount
        this.total=res.item.totalPrice

      },(err)=>{console.log(err)})
      this.AuthServiceService.isloged.subscribe(s=>{this.isLoged=s
        console.log(s)
        })
   
  }

removeFromCart(){
this.productService.deleteCartItem(this.cartItem._id).subscribe((res)=>{
  console.log(res)
  this.quantity=0
  this.total=0
},(err)=>{console.log(err)})
}  
AddToCart(name,price,amount,productId){
  this.productService.AddToCart(name,price,amount,productId).subscribe((res)=>{
    console.log(res)
    this.quantity+=1
    this.total=this.total+(price*amount)
  },(err)=>{
    console.log(err)
  })
  }
  

 

}
