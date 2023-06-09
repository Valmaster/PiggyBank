import {LoginInput} from '../../api/public/inputs/login.input';
import {RegisterInput} from 'core/api/public/inputs/register.input';

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public input: LoginInput ) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class Refresh {
  static readonly type = '[Auth] Refresh';
}

export class Register {
  static readonly type = '[Auth] Register';
  constructor(public input: RegisterInput) {}
}
