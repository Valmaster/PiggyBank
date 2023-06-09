import {UserModel} from './user.model';

export class PatchUser {
  static readonly type = '[User] Patch';
  constructor(public payload: Partial<UserModel>) {}
}

