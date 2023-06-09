import {Component} from '@angular/core';
import {FormBuilder, FormGroup } from '@angular/forms';
import {Store} from '@ngxs/store';
import {SendMail} from '../../../core/store/mailing/mail.actions';
import {Validators} from '../../../core/utilities/validators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
contactForm: FormGroup;


  constructor(fb: FormBuilder, private store: Store) {
    this.contactForm = fb.group({
      contactFormName: ['', Validators.required()],
      contactFormEmail: ['', [Validators.required(), Validators.isEmail()]],
      contactFormMessage: ['', Validators.required()],
    });
  }

  get name(){
    return this.contactForm.get('contactFormName');
  }

  get email(){
    return this.contactForm.get('contactFormEmail');
  }

  get message(){
    return this.contactForm.get('contactFormMessage');
  }

  public submit(): void {
    this.store.dispatch(new SendMail(this.contactForm.value));
  }
}
