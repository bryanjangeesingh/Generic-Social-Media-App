import { Router } from 'express';
import { createPost } from '../controllers/postController';
import { PostService } from '../services/postService';
import { getPostAndComments } from '../controllers/postController';

// Define a Router function for posts that accepts the Express Router class and the PostService class which provides functions on posts 

export function postRoutes(router: Router, postService: PostService) {
  // Route for creating a post. When the endpoint is /comments, execute the callback. 
  // Use post method since we are sending data. 
  router.post('/posts', (req, res) => createPost(req, res, postService));

  // Route for getting a post and its comments 
  // Use get method since since are attempting to retrieve data. 
  router.get('/posts/:id', (req, res) => getPostAndComments(req, res, postService));

  // Potentially add more routes for posts here. For example, getting posts for a particular user or deleting a post. 


}