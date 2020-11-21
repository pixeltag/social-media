const postResolver = require("./posts");
const userResolver = require("./users");
const commentsResolver = require("./comments");
const likesResolver = require("./likes");

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutations,
    ...commentsResolver.Mutation,
    ...likesResolver.Mutation,
  },
  Subscription: {
    ...postResolver.Subscription,
  },
};
