import { Database } from 'sqlite3';

// Define the Post type
interface Post {
  id: number;
  userId: number;
  title: string;
  content: string;
  created_at: string; 
}

export class PostService {
  // Avoid representation exposure by making the database private. 
  private db: Database; 

  constructor(db: Database) {
    this.db = db;
  }

  createPost(userId: number, title: string, content: string, onComplete: (err: Error | null, postId?: number) => void) {
    const stmt = this.db.prepare("INSERT INTO post (user_id, title, content) VALUES (?, ?, ?)");
    stmt.run(userId, title, content, function (this: any) {
      onComplete(this.lastID ? null : new Error("Failed to create post"), this.lastID);
    });
    stmt.finalize();
  }

  // Add a get post and comments function
  getPostAndComments(postId: number, onComplete: (err: Error | null, postAndComments?: any) => void) {
    // Logic to fetch the post and its comments from the database
    const query = `
      SELECT p.*, c.*
      FROM post AS p
      LEFT JOIN comment AS c ON p.id = c.post_id
      WHERE p.id = ?
    `;
    this.db.all(query, [postId], (err, rows) => {
      if (err) {
        return onComplete(err);
      }
      // Format the returned query
      const postAndComments = {
        post: rows[0], // First row contains post details
        comments: rows.slice(1), // The rest of the rows are comments
      };
      onComplete(null, postAndComments);
    });
  }

  // Add a get most recent posts function
  getMostRecentPosts(onComplete: (err: Error | null, posts?: Post[]) => void) {
    // Query the database to fetch posts by most recent insertion date
    this.db.all("SELECT * FROM post ORDER BY created_at DESC", [], (err, rows) => {
      if (err) {
        return onComplete(err);
      }
      
      // Explicitly cast 'rows' to 'Post[]'
      const posts = rows as Post[];
      
      onComplete(null, posts);
    });
  }


  // Additional post-related operations may be defined here. 

}
