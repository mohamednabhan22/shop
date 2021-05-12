const { AuthenticationError, UserInputError } = require('apollo-server');
const Cart=require('../../models/cart.model')
const Product= require('../../models/products.model');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Query: {
    async getProducts() {
      try {
        const products = await Product.find();
        return products.map(product=>{
          return{
            ...product._doc,
            price:parseFloat(product.price),
            id:product._doc._id
            
          }
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    async getProduct(_, { productId }) {
      try {
        const product = await Product.findById(productId);
        if (product) {
          return product;
        } else {
          throw new Error('product not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getCarts(_, __, context){
      try {
        const { email } = checkAuth(context);
        const carts = await Cart.find({ userId: email });
        if (carts.length>0) {
          return carts.map(cart=>{
            return{
              ...cart._doc,
              id:cart.id,
              price:parseInt(cart.price),
              totalPrice:parseInt(cart.totalPrice),
             
            }
          });
        } else {
          throw new Error('user do not have carts');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getCartByUserAndProduct(_,{ productId }, context){
      try {
        const { email } = checkAuth(context);
        const carts = await Cart.findOne({ userId: email,productId:productId });
        if (carts) {
            return{
              ...carts._doc,
              price:parseInt(carts.price),
              totalPrice:parseInt(carts.totalPrice),
             
            };
         
        } else {
          throw new Error('user do not have carts');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async AddToCart(_, {name, price,amount,productId}, context) {
      const { email } = checkAuth(context);


     let item=await Cart.findOne({ userId: email,productId:productId });
     if(item){
      item.amount= parseInt(item.amount)+parseInt(amount)
      item.price=parseFloat(price)

      item.totalPrice=parseInt(item.price)*parseInt(item.amount)
      await item.save();
      return item;

     }else{const newCart = new Cart({
      name:name,
      userId: email,
      amount:amount,
      price:parseFloat(price),
      productId:productId,
      totalPrice:parseInt(price)*parseInt(amount),
     
    });

    const newcartItem = await newCart.save();

  return newcartItem ;}
      
    },
    async deleteCart(_, { cartId }, context) {
      const user = checkAuth(context);

      try {
        const cart = await Cart.findById(cartId);
        if (user.email === cart.userId) {
         let deletedCart= await cart.delete();
          return deletedCart;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async decreaseCart(_, { cartId }, context) {
      const user = checkAuth(context);

      try {
        const cart = await Cart.findById(cartId);

        if (cart) {
      
      if (user.email === cart.userId){
          cart.amount= parseInt(cart.amount)-parseInt(1)
          cart.totalPrice=parseInt( cart.totalPrice)-parseInt(cart.price)
        let updatedCart= await cart.save();
      return updatedCart;

        } else {
          throw new AuthenticationError('Action not allowed');
        }
      }else{  throw new Error('cart not found');
      
      }} catch (err) {
        throw new Error(err);
      }
    },
    async deleteAllCarts(_, __, context){
      try {
        const { email } = checkAuth(context);
        const carts = await Cart.find({ userId: email });
        if (carts) {
          let deletedCarts= await Cart.deleteMany({userId:email});
          return carts.map(cart=>{
            return{
              ...cart._doc,
              price:parseInt(cart.price),
              totalPrice:parseInt(cart.totalPrice),
             
            }
          });
        } else {
          throw new Error('user do not have carts');
        }
      } catch (err) {
        throw new Error(err);
      }
    },

   /* async createPost(_, { body }, context) {
      const user = checkAuth(context);

      if (body.trim() === '') {
        throw new Error('Post body must not be empty');
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });

      const post = await newPost.save();

      context.pubsub.publish('NEW_POST', {
        newPost: post
      });

      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return 'Post deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // Post already likes, unlike it
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // Not liked, like post
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          });
        }

        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    }*/
  },
 
};
