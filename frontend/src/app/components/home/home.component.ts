import { AuthServiceService } from './../auth/auth-service.service';
import { productService } from './../products/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../products/models/products';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  subscription: Subscription;
  delSubscription: Subscription;
  addSubscription: Subscription;
  isAdminsubscription: Subscription;
  isLogeddelSubscription: Subscription;
  toggleaddSubscription: Subscription;
  isAdmin
  count:number=8
  selectedCatogry:any=0
  selectedPrice:number=0
  togleShow=true
  isLoged


prices:number[]=[2.5,1.5,6.5,5.5,3.5]
  
  products: Product[];
filterProducts

     catogries:{id:number,name:string}[]=[

{id:6,name:"fruit"},     {id:3,name:"dairy"},{id:4,name:"meat"}, {id:1,name:"bakery"},
{id:7,name:"drinks"}, {id:2,name:"takeaway"},{id:5,name:"seafood"}
]

  constructor(private productService: productService,private AuthServiceService:AuthServiceService,) {
               
  }

  ngOnInit() {

  this.isAdminsubscription= this.AuthServiceService.isAdmin.subscribe(s=>{this.isAdmin=s
      console.log(s)
      })
   this.isLogeddelSubscription= this.AuthServiceService.isloged.subscribe(s=>{this.isLoged=s
      console.log(s)
      })

   this.toggleaddSubscription= this.AuthServiceService.togleShow.subscribe(s=>{this.togleShow=s
        console.log(s)
        })
   
     
        this.subscription= this.productService.getProducts().subscribe((res)=>{
          console.log(res)
        this.products=res.getProducts
        this.filterProducts=res.getProducts
        
        },(err)=>{
          console.log(err)
        })
   
  }

  filter(name){
    this.products=this.filterProducts.filter(p=>p.category===name)
    this.selectedCatogry=0
    this.selectedPrice=0
  
  }
  
    filterByPrice(){
      
     if(this.selectedCatogry!==0){
          this.products = this.filterProducts.filter(p=>{
        return p.price==this.selectedPrice
        &&p.category==this.selectedCatogry
        })
      }else{this.products = this.filterProducts.filter(p=>{
        return p.price==this.selectedPrice})}
  
    }
    filterByCatogry(){
  
      console.log(this.selectedCatogry)
    if(this.selectedPrice>0){
      this.products = this.filterProducts.filter(p=>{return p.category==this.selectedCatogry
        &&p.price==this.selectedPrice}
      )}else{  this.products = this.filterProducts.filter(p=>{return p.category==this.selectedCatogry})
  
    }
   
    
  }
  
  AddToCart(name,price,amount,productId){
    
  this.addSubscription=this.productService.AddToCart(name,price,amount,productId).subscribe((res)=>{
    console.log(res)
   /* let existCarts
    this.productService.cartItems.subscribe(res=>existCarts=res)
    this.productService.cartItems.next([...existCarts,res.data.AddToCart])*/
  },(err)=>{
    console.log(err)
  })
  }

  deleteProduct(i,id){
   this.delSubscription= this.productService.deleteProduct(id).subscribe((res)=>{
      console.log(res)
      this.products.splice(i,1)
    },(err)=>{console.log(err)})
    }


    ngOnDestroy() {
      this.subscription.unsubscribe();
      if( this.delSubscription){ this.delSubscription.unsubscribe();}
      if( this.addSubscription){  this.addSubscription.unsubscribe();}

    
     this.isAdminsubscription.unsubscribe();
     this.isLogeddelSubscription.unsubscribe();
     this.toggleaddSubscription.unsubscribe();
    
    }
}
/*AddToCart(name,price,amount,productId){
    
  this.addSubscription=this.productService.AddToCart(name,price,amount,productId).subscribe((res)=>{
    console.log(res)
    this.productService.cartO$.pipe(take(1)).subscribe(val => {console.log(val)
      const newArr = [...val, res.data.addToCart];
      this.productService.cartItems.next(newArr)
    })*/
   /* let existCarts
    this.productService.cartItems.subscribe(res=>existCarts=res)
    this.productService.cartItems.next([...existCarts,res.data.AddToCart])
    */
  /*},(err)=>{
    console.log(err)
  })
  }*/