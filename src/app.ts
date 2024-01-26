import express from 'express';
import { initDb } from './db/db';

// Import all Routes
import { userRoutes } from './routes/userRoutes';
import { postRoutes } from './routes/postRoutes';
import { commentRoutes } from './routes/commentsRoutes';

// Import all Services
import { UserService } from './services/userService';
import { PostService } from './services/postService';
import { CommentService } from './services/commentService';

const app = express();
const db = initDb();

app.use(express.json());

// Instantiate services
const userService = new UserService(db);
const postService = new PostService(db);
const commentService = new CommentService(db);

// Setup routes
userRoutes(app, userService);
postRoutes(app, postService);
commentRoutes(app, commentService);


// Define the "/feed" route
app.get('/feed', (req, res) => {
  // Fetch the feed data by most recent posts
  postService.getMostRecentPosts((err, posts) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    res.status(200).json(posts);
  });
});


export default app;
