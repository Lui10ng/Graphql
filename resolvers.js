let users = [];
let posts = [];
let comments = [];

const resolvers = {
  Query: {
    users: () => users,
    posts: () => posts,
    comments: () => comments,
  },
  Mutation: {
    createUser: (_, { name, email }) => {
      const user = { id: `${users.length + 1}`, name, email };
      users.push(user);
      return user;
    },
    createPost: (_, { title, content, authorId }) => {
      const author = users.find(user => user.id === authorId);
      if (!author) throw new Error('Author not found');
      const post = { id: `${posts.length + 1}`, title, content, author };
      posts.push(post);
      return post;
    },
    createComment: (_, { content, postId, authorId }) => {
      const post = posts.find(post => post.id === postId);
      const author = users.find(user => user.id === authorId);
      if (!post) throw new Error('Post not found');
      if (!author) throw new Error('Author not found');
      const comment = { id: `${comments.length + 1}`, content, post, author };
      comments.push(comment);
      return comment;
    },
    deleteUser: (_, { id }) => {
      const userIndex = users.findIndex(user => user.id === id);
      if (userIndex === -1) throw new Error('User not found');
      const deletedUser = users.splice(userIndex, 1)[0];
      posts = posts.filter(post => post.author.id !== id);
      comments = comments.filter(comment => comment.author.id !== id);
      return deletedUser;
    },
    deletePost: (_, { id }) => {
      const postIndex = posts.findIndex(post => post.id === id);
      if (postIndex === -1) throw new Error('Post not found');
      const deletedPost = posts.splice(postIndex, 1)[0];
      comments = comments.filter(comment => comment.post.id !== id);
      return deletedPost;
    },
    deleteComment: (_, { id }) => {
      const commentIndex = comments.findIndex(comment => comment.id === id);
      if (commentIndex === -1) throw new Error('Comment not found');
      return comments.splice(commentIndex, 1)[0];
    },
  },
};

module.exports = resolvers;
