import { Router } from 'express';
import { CommentService } from '../services/commentService';
import { createComment } from '../controllers/commentController';

// Define a Router function for comments that accepts the Express Router class and the CommentService class which provides functions on comments 
export function commentRoutes(router: Router, commentService: CommentService) {
  // Route for creating a comment. When the endpoint is /comments, execute the callback. 
  router.post('/comments', (req, res) => createComment(req, res, commentService));

  // Potentially add more routes for comments here. For example, getting comments for a particular post or deleting a comment. 

}
