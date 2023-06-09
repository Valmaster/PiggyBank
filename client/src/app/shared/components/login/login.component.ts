import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngxs/store';
import {Login} from 'core/store/auth/auth.actions';
import {Validators} from 'core/utilities/validators';
import {take} from 'rxjs/operators';
import {ApolloError} from 'apollo-client';
import {getErrorMessage} from 'core/utilities/errors';

@Component({
    selector: 'shared-login',
    templateUrl: './login.component.html',
})
export class LoginComponent {
    @Output() cancel = new EventEmitter();
    @Output() result = new EventEmitter();
    public error: ApolloError;
    public form: FormGroup;
    public getErrorMessage = getErrorMessage;

    constructor(private fb: FormBuilder, private store: Store) {
        this.form = this.fb.group({
            email: ['', [
                Validators.required(),
                Validators.isEmail(),
            ]],
            password: ['', Validators.required()],
        });
    }

    public submit(): void {
        this.store.dispatch(new Login(this.form.value))
            .pipe(take(1))
            .subscribe(
                result => {
                    this.result.emit();
                    this.cancel.emit();
                },
                error => this.error = error
            );
    }


}
