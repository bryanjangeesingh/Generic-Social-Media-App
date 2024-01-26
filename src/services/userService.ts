import { Database } from 'sqlite3';

export class UserService {
   // Avoid representation exposure by making the database private. 
   private db: Database; 

   constructor(db: Database) {
     this.db = db;
   }
 

  createUser(name: string, onComplete: Function) {
    const stmt = this.db.prepare("INSERT INTO user (name) VALUES (?)");
    stmt.run(name, function(this: any, err: Error | null) {
      onComplete(err, this.lastID);
    });
    stmt.finalize();
  }

  // Additional user-related operations may be defined here. 
}