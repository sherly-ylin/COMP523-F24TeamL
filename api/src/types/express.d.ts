import { User } from '../models/userSchema.js';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}