import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Component, OnInit,AfterViewInit, ElementRef, OnDestroy} from '@angular/core';
import { productService } from'../products/products.service';
import { Subscription } from 'rxjs';
import { subscribe } from 'graphql';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,AfterViewInit,OnDestroy  {
  subscription: Subscription;
  decSubscription: Subscription;
  addSubscription: Subscription;

  cartItems:any[]=[]
  totalPrice:any=0

  constructor(public productService: productService, private Router:Router , private route:ActivatedRoute
   ) {
     // this.productCart=this.productService.getProductsCart()

      
     

}
check(){
this.Router.navigate(['./checkout'])
}
shop(){
  this.Router.navigate(['./products'])

}




ngAfterViewInit(){
  
 // setTimeout(()=>{ this.router.navigate(['products'])},1000)
}


  ngOnInit():void {
 
    this.productService.getCart().subscribe( (res)=>{
      console.log(res.data.getCarts)
      this.cartItems= res.data.getCarts
 for(let p of this.cartItems){
 this.totalPrice+=p.totalPrice;
 //this.totalPrice=this.totalPrice.toFixed(2)
}

    
    
    },(err)=>{
      console.log(err)
    this.cartItems=[]

    }) 
   /* this.productService.getCarttt()
    this.subscription = this.productService.cartItems.subscribe((res)=>{
      console.log(res)
    this.cartItems=res
 for(let p of this.cartItems){
 this.totalPrice+=p.totalPrice;
 //this.totalPrice=this.totalPrice.toFixed(2)
}

    
    
    },(err)=>{
      console.log(err)
    })
  */  

  }

  
  decreaseItem(id){console.log(id)
 

   this.decSubscription= this.productService.decreaseCartItem(id).subscribe((res)=>{
      console.log(res)
      let item =this.cartItems.find(item=>item.id=id)
      console.log(item)
      setTimeOut(()=>{         this.totalPrice-=item.price;;
      },2000)
        
     
    },(err)=>{console.log(err)})
    }  
  AddToCart(name,price,amount,productId){
    this.addSubscription= this.productService.AddToCart(name,price,amount,productId).subscribe((res)=>{
      console.log(res)
  
      this.totalPrice+=price;
    },(err)=>{
      console.log(err)
    })

}

clear(){
  this.productService.deleteAllCarts().subscribe((res)=>{console.log(res)
  this.cartItems=[]
  this.totalPrice=0},(err)=>{console.log(err)  });
  }

ngOnDestroy() {
  // this.subscription.unsubscribe();
 if(this.decSubscription){this.decSubscription.unsubscribe();} 
 if(this.addSubscription){this.addSubscription.unsubscribe();}

}
}

/*
getCarts(){
     this.productService.cartO$.subscribe((res)=>{console.log(res)
      this.cartItems=res
      for(let p of this.cartItems){
        this.totalPrice+=p.totalPrice;
        //this.totalPrice=this.totalPrice.toFixed(2)
        }    },(err)=>{console.log(err)})
     
     
  }
*/