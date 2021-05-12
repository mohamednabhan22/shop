export type Author = {
    id: number;
    firstName: string;
    lastName: string;
  }
  
  export type Post = {
    id: number;
    title: string;
    votes: number;
    author: Author;
  }
  
  export type Query = {
    authors: Author[];
    posts:Post[]
  }
  
  export type Mutation = {
    upvotePost: Post;
  }
  