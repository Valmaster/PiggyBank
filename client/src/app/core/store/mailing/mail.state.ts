import {Action, State, StateContext} from '@ngxs/store';
import {Mail} from '../../api/mail/mail.model';
import {Injectable} from '@angular/core';
import {MailService} from '../../api/mail/mail.service';
import * as actions from './mail.actions';

@State<Mail>({
  name: 'mail',
  defaults: {
    name: null,
    email: null,
    message: null,
  },
})

@Injectable()
export class MailState{

  constructor(private mailService: MailService) {}

  @Action(actions.SendMail)
  send(ctx: StateContext<Mail>, action: actions.SendMail) {
    return this.mailService.sendMessage(action.payload);
  }


}
