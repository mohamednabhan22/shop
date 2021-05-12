const productsResolvers = require('./products');
const usersResolvers = require('./users');
//const commentsResolvers = require('./comments');

module.exports = {
 
  Query: {
    ...productsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...productsResolvers.Mutation,
    //...commentsResolvers.Mutation
  },
  
};
