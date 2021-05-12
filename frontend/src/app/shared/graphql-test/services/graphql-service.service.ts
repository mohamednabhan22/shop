import { Query,Post } from './../types';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular-boost';
import { Observable } from 'rxjs';
import { map ,tap} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

 


  constructor(private apollo: Apollo) { }

  
  allPosts=gql`
  query posts($pagination:PaginationInput){
    posts(pagination:$pagination){
     data{
      id
      body
      title
      author{
        name
      }
    }
     
    }
  }
  `;
  
  
  


    posts(): Observable<any> { return this.apollo.watchQuery({
      query:this.allPosts,
      variables:{pagination:{limit: 20,
    page: 0
  }}
    })
      .valueChanges
      .pipe(map(result => result));}
    


  updatePost=gql`
  mutation updatePost($id:ID!,
    $data:PostUpdateInput!){
    updatePost(postId:$id,data:$data){
      id
      title
      body
    }
  }
`

deletePostMutation=gql`
mutation deletePosts($id:ID!){
  deletePost(postId:$id){
   id
 }
 }

`
addPostM=gql`
mutation addPost($data:PostInput!){
  addPost(data:$data){
id
 title
 body
 }
 }`

 addPost(id:number,title:string,body:string):Observable<any>{
   return this.apollo.mutate({
     mutation:this.addPostM,
     variables:{
       data:{userId:id,title,body}
     }
   })
 }
deletePost(id:number):Observable<any>{
 return this.apollo.mutate({
  mutation:this.deletePostMutation,
  variables:{
    id
  }
})
}
updatedPost(id:number,title:string,body:string):Observable<any> {
   return this.apollo.mutate({
    mutation:this.updatePost,
    variables: {
      id: id,data:{userId:id,title,body}
    },
  })
}

}



