import {Mail} from '../../api/mail/mail.model';

export class SendMail {
  static readonly type = '[mail] - SendMail';
  constructor(public payload: Mail) {}
}
