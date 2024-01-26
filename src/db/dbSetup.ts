import { Database } from 'sqlite3';
import {faker} from "@faker-js/faker"


export function setupDatabase(db: Database) {
  db.serialize(() => {
    // Create a user table with 1 column that stores the names. 
    db.run("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");

    // Create a post table with columns user_id, title, content, and created_at timestamps. 
    // Reference the user_ids from the user table
    db.run(`CREATE TABLE IF NOT EXISTS post (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      title TEXT,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES user(id)
    )`);

    // Create a comment table with columns post_id, user_id, content, and created_at timestamps. 
    // Reference the post_ids from the post table. 
    // Reference the user_ids from the user table. 
    db.run(`CREATE TABLE IF NOT EXISTS comment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER,
      user_id INTEGER,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(post_id) REFERENCES post(id),
      FOREIGN KEY(user_id) REFERENCES user(id)
    )`);

    // Add seed data to user table using faker
    const userStmt = db.prepare("INSERT INTO user (name) VALUES (?)");
    for (let i = 0; i < 10; i++) {
      const userName = String(faker.internet.userName()); // Generate a fake username
      userStmt.run(userName);
    }
    userStmt.finalize();

    // Add seed data to post table using faker
    const postStmt = db.prepare("INSERT INTO post (user_id, title, content) VALUES (?, ?, ?)");
    for (let i = 0; i < 5; i++) {
      const userId = i; // Random user_id
      const postTitle = faker.lorem.sentence(); 
      const postContent = faker.lorem.paragraph();
      postStmt.run(userId, postTitle, postContent);
    }
    postStmt.finalize();

    // Add seed data to comment table using faker
    const commentStmt = db.prepare("INSERT INTO comment (post_id, user_id, content) VALUES (?, ?, ?)");
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 2; j++) {
        const postId = i + 1;
        const userId = j + 1;
        const commentContent = faker.lorem.sentence(); // Generate fake comment content
        commentStmt.run(postId, userId, commentContent);
      }
    }
    commentStmt.finalize();
  });
}
