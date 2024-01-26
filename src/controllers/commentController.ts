import { Request, Response } from 'express';
import { CommentService } from '../services/commentService';

export function createComment(req: Request, res: Response, commentService: CommentService) {
  const { postId, userId, content } = req.body;

  // First perform data validation. 
  if (!postId || !userId || !content) {
    return res.status(400).send('Error 400, all fields are required! Missing one or multiple of postId, userId and/or content.'); 
  }

  // Call the relevant service if all fields are provided; in this case call the createComment service 
  commentService.createComment(postId, userId, content, (err, commentId) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (commentId) {
      res.status(201).send({ commentId });
    } else {
      res.status(500).send("Comment creation failed");
    }
  });
}
