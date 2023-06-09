import { User } from '../api/user/user.model';

export interface JwtToken {
  isAuthenticated: boolean;
  tokens: string;
  user?: User;
}
