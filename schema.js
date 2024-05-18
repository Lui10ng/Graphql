const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Comment {
    id: ID!
    content: String!
    post: Post!
    author: User!
  }

  type Query {
    users: [User!]!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    createPost(title: String!, content: String!, authorId: ID!): Post!
    createComment(content: String!, postId: ID!, authorId: ID!): Comment!
    deleteUser(id: ID!): User!
    deletePost(id: ID!): Post!
    deleteComment(id: ID!): Comment!
  }
`;

module.exports = typeDefs;
