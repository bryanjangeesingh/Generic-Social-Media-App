import { Database } from 'sqlite3';

export class CommentService {
  // Avoid representation exposure by making the database private. 
  private db: Database; 

  constructor(db: Database) {
    this.db = db;
  }

  createComment(postId: number, userId: number, content: string, onComplete: (err: Error | null, commentId?: number) => void) {
    // Insert into the comment table. Update the post_id, user_id and content columns within this table. Define the VALUES (?, ?, ?) placeholder for those specified columns. 
    const stmt = this.db.prepare("INSERT INTO comment (post_id, user_id, content) VALUES (?, ?, ?)"); // create a statement that will be executed later
    stmt.run(postId, userId, content, function (this: any) {
      onComplete(this.lastID ? null : new Error("Failed to create comment"), this.lastID); //check whether we were able to sucessfully add the comment by checking the truthy value of lastID
    });
    stmt.finalize();
  }

  // Additional comment-related operations may be defined here. 
}