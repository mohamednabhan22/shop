const { gql } = require('apollo-server');

module.exports = gql`
 
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    isAdmin:Boolean!
  }
  type Product {
    id:ID!
    name: String!
    img: String!
    price: Float!
    description: String!
    category: String!
  }
  type Cart {
    id:ID!

    name: String!
    price: Float!
    amount:Int!
    totalPrice:Int!
    userId: String!
    productId: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getProducts: [Product!]!
    getCarts: [Cart!]!
    getCartByUserAndProduct(productId: ID!):Cart!
    getProduct(productId: ID!): Product!
   
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    AddToCart(name: String!, price: Float!,amount: Int!,productId:String!):Cart!
    deleteCart(cartId:ID!): Cart!
    decreaseCart(cartId:ID!): Cart!
    deleteAllCarts: [Cart!]!

   
  }
 
`;
/* 
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  */
 //
 /*
 mutation
 createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!*/