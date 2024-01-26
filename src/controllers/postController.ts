import { Request, Response } from 'express';
import { PostService } from '../services/postService';


export function createPost(req: Request, res: Response, postService: PostService) {
  const { userId, title, content } = req.body;

  // First perform data validation. 
  if (!userId || !title || !content) {
    return res.status(400).send('All fields are required');
  }

  // Call the relevant service if all fields are provided; in this case call the createPost service 
  postService.createPost(userId, title, content, (err: Error | null, postId?: number) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (postId) {
      res.status(201).send({ postId });
    } else {
      res.status(500).send("Post creation failed");
    }
  });
}

export function getPostAndComments(req: Request, res: Response, postService: PostService) {
  const postId = parseInt(req.params.id, 10); // Parse the postId from the URL params

  // First perform data validation. 
  if (isNaN(postId)) {
    return res.status(400).send('Invalid postId');
  }

  postService.getPostAndComments(postId, (err: Error | null, postAndComments?: any) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (postAndComments) {
      res.status(200).send(postAndComments);
    } else {
      res.status(404).send("Post not found");
    }
  });
}
