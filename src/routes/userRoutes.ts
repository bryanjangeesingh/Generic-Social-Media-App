import { Router } from 'express';
import { createUser } from '../controllers/userController';
import { UserService } from '../services/userService';

// Define a Router function for users that accepts the Express Router class and the UserService class which provides functions on users 

export function userRoutes(router: Router, userService: UserService) {
  // Route for creating a user. When the endpoint is /users, execute the callback. 
  router.post('/users', (req, res) => createUser(req, res, userService));
}