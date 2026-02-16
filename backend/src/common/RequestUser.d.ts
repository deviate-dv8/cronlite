import { Request } from 'express';
import { User } from 'src/database/entities/User';

declare interface RequestUser extends Request {
  user: Omit<User, 'password' | 'createdAt'>;
}
