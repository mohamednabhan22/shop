import {  Observable, Subject,BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Apollo, gql} from 'apollo-angular';
import { map ,tap} from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user:{}
  
  isAdmin=new BehaviorSubject<any>(!!localStorage.getItem('isAdmin'))

  isloged=new BehaviorSubject(!!localStorage.getItem('access_token'))
  error=new Subject

togleShow= new Subject<boolean>()

toglleShow(v:boolean){
  this.togleShow.next(v)
}

isAdminGuard(): boolean {
  let admin = localStorage.getItem('isAdmin');
  return (admin !== null) ? true : false;
}

 isLoggedIn(): boolean {
  let authToken = localStorage.getItem('access_token');
  return (authToken !== null) ? true : false;
}
  constructor(private router:Router,private http:HttpClient,private apollo: Apollo) { }

  signup=gql`
mutation register($data:RegisterInput!){
  register(registerInput:$data)
  {
    id
    token
    username
    isAdmin
  }
}`
  
   Signup(username,email,password,confirmPassword):Observable<any>{
     return this.apollo.mutate({
       mutation:this.signup,
       variables:{
        data:{username,email,password,confirmPassword}
       }
     })
   }

  /*signup(username,email,password,confirmPassword):Observable<any>{
    let data={
      username,email,password,confirmPassword
    }
 return this.http.post('http://localhost:3000/signup',data)
  }
*/

login=gql`
mutation login($email:String!,$password:String!){
  login(email:$email,password:$password){
   token
    isAdmin
    id
    username
  }
}`
  
   Login(email,password){
      this.apollo.mutate<any>({
       mutation:this.login,
       variables:{
      email,password
       }
     }).subscribe(

      (res:any)=>{
       
        console.log(res)
        this.isloged.next(true)
        localStorage.setItem('access_token', res.data.login.token)
        this.router.navigate(['products'])

        if(res.data.login.isAdmin==true){    localStorage.setItem('isAdmin', res.data.login.isAdmin)
      
        this.isAdmin.next(true)
      }
    
       
      },
      (err)=>{
        console.log(err)
        this.error.next(err.error.error)
        this.router.navigate(['login'])}
     )}

 
  getToken() {
    return localStorage.getItem('access_token');
  }
  logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('isAdmin');

    this.isloged.next(false)
    this.isAdmin.next(false)

  }



}