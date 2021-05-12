import { Product } from './models/products';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Apollo, gql,QueryRef} from 'apollo-angular';
import { map ,tap} from 'rxjs/operators';
import { OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class productService  {
token
isAdmin=new BehaviorSubject<any>(!!localStorage.getItem('isAdmin'))

cartItems=new BehaviorSubject<any>([])
postsQuery:QueryRef<any>;

 constructor(private http:HttpClient,private apollo:Apollo){
   
 }
  
 
  
 

 
  
    
getToken() {
  return localStorage.getItem('access_token');
  
}
products=gql`
query{
  getProducts{
    name
    price
    id
    img
    description
    category
    
  }
}
`;





  getProducts(): Observable<any> { return this.apollo.watchQuery<any>({
    query:this.products
   
}).valueChanges
    .pipe(map(res => res.data));}
  
    
/*getProducts():Observable<any>{
  return this.http.get('http://localhost:3000')

}*/
product=gql`
query getProduct($id:ID!){
 getProduct(productId:$id){
  id
  name
  img
  price
  description
  category
}
}
`;





  getProduct(id): Observable<any> { return this.apollo.watchQuery<any>({
    query:this.product,
    variables:{ id}
    
   
}).valueChanges
    .pipe(map(res =>res.data));}
  

 /* getProduct(id):Observable<any>{
   return this.http.get<any>(`http://localhost:3000/product/${id}`)
   
  }*/


  carts=gql`
query{
getCarts{
  id
  name
  price
  amount
  totalPrice
  userId
  productId
  
}  
}
`;


/*
getCarttt(){  this.apollo.watchQuery<any>({
  query:this.carts

}).valueChanges
  .pipe(map(res =>res.data)).subscribe((res)=>{
    console.log(res.getCarts)
  this.cartItems.next([...res.getCarts])
  
  //this.totalPrice=this.totalPrice.toFixed(2)
  
  
  
  
  },(err)=>{
    console.log(err)
  })}*/




  getCart():Observable<any>{ return   this.postsQuery =this.apollo.watchQuery<any>({
    query:this.carts,
    pollInterval: 500,
  
}).valueChanges
    }
    
    refresh() {
      this.postsQuery.refetch()
    }
  /*
getCart():Observable<any>{

  return this.http.get<any>(`http://localhost:3000/cart`,{ headers: new HttpHeaders({'x-access-token':this.getToken()})})
}
*/
getCartItem(id):Observable<any>{
  let productId=id

   return this.http.get<any>(`http://localhost:3000/cart/${productId}`,{ headers: new HttpHeaders({'x-access-token':this.getToken()})})
 }

 deleteCartItem(id):Observable<any>{
  let cartId={cartId:id}

   return this.http.post<any>(`http://localhost:3000/cart/delete`,cartId,{ headers: new HttpHeaders({'x-access-token':this.getToken()})})
 }


 addToCart=gql`
 mutation AddToCart($name:String!,$productId:String!,$amount:Int!,$price:Float!){
  AddToCart(name:$name,productId:$productId,amount:$amount,price:$price){
    name
    userId
    totalPrice
    price
    amount
    productId
    
  }
}`
   
    AddToCart(name,price,amount,productId):Observable<any>{
      return this.apollo.mutate({
        mutation:this.addToCart,
        variables:{
          name,price,amount,productId
        }, refetchQueries: []
      })
    }

    decreaseCart=gql`
 mutation decreaseCart($cartId:ID!){
  decreaseCart(cartId:$cartId){
  name
  amount
}
}`

decreaseCartItem(id):Observable<any>{
  return this.apollo.mutate({
    mutation:this.decreaseCart,
    variables:{
      cartId: id
    }
  })
}

    deleteallcarts=gql`

    mutation{
      deleteAllCarts{
        price
        amount
      }
      }`

deleteAllCarts():Observable<any>{
  return this.apollo.mutate({
    mutation:this.deleteallcarts,
  
  })
} 
/*AddToCart(name,price,amount,productId):Observable<any>{
  let data={
    name,price,amount,productId
  }
   return this.http.post<any>(`http://localhost:3000/cart`,data,{ headers: new HttpHeaders({'x-access-token':this.getToken()})})
 }
*/
 decreaseItem(id):Observable<any>{
  let data={
    cartId:id
  }
   return this.http.post<any>(`http://localhost:3000/cart/decrease`,data,{ headers: new HttpHeaders({'x-access-token':this.getToken()})})
 }
 deleteAllItems():Observable<any>{
  
   return this.http.delete<any>(`http://localhost:3000/cart/deleteAll`,{ headers: new HttpHeaders({'x-access-token':this.getToken()})})
 }


 addProduct(name,price,description, category,file):Observable<any>{
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', name);
  formData.append('price',price);
  formData.append('description',description);

  formData.append('category',category);


   return this.http.post<any>(`http://localhost:3000/admin/add`,formData,{ headers: new HttpHeaders({'x-access-token':this.getToken()})})
 }

 deleteProduct(id):Observable<any>{
  
  return this.http.delete<any>(`http://localhost:3000/admin/delete/${id}`,{ headers: new HttpHeaders({'x-access-token':this.getToken()})})
}
}

/*
getCart(){  this.apollo.query<any>({
    query:this.carts
  
}).subscribe( (res:any)=>{
  console.log(res.data.getCarts)
this.cartItems.next(res.data.getCarts) 




},(err)=>{
  console.log(err)
})}
*/