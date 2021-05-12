import { Query,Post } from './../types';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular-boost';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class GraphqlServiceService {

  constructor(private apollo: Apollo) { }
  postQuery= gql`
  query allPosts {
    posts {
      id
      title
      votes
      author {
        id
        firstName
        lastName
      }
    }
  }
  `  

  posts: Observable<Post[]> = this.apollo.watchQuery<Query>({
    query:this.postQuery
  })
    .valueChanges
    .pipe(
      map(result => result.data.posts)
    );
  
;

  upvotePost=gql`
  mutation upvotePost($postId: Int!) {
    upvotePost(postId: $postId) {
      id
      votes
    }
  }
`


upvote(postId:number) {
  this.apollo.mutate({
    mutation:this.upvotePost,
    variables: {
      postId: postId,
    },
  }).subscribe();
}
}

