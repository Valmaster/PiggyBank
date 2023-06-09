import {User} from '../../user/user.model';

export interface LoginOutput {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly user: User;
}
