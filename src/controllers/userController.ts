import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export function createUser(req: Request, res: Response, userService: UserService) {
  const { name } = req.body;

  // First perform data validation. 
  if (!name) {
    return res.status(400).send('Name is required');
  }

  // Call the relevant service if all fields are provided; in this case call the createUser service 
  userService.createUser(name, (err: Error | null, userId?: number) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (userId) {
      res.status(201).send({ userId });
    } else {
      res.status(500).send("User creation failed");
    }
  });
}