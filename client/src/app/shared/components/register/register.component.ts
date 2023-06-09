import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Validators} from 'core/utilities/validators';
import {take} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {Register} from 'core/store/auth/auth.actions';

@Component({
    selector: 'shared-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
    public form: FormGroup;
    public success: boolean;
    @Output() cancel = new EventEmitter();
    @Output() result = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private store: Store,
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            email: ['', [
                Validators.required(),
                Validators.isEmail(),
            ]],
            username: ['', [
                Validators.required(),
                Validators.alphanumNospace(),
                Validators.maxLength(20),
                Validators.minLength(3)
            ]],
            password: ['', [
                Validators.required(),
                Validators.maxLength(128),
                Validators.minLength(6)
            ]],
        });
    }


    public submit(): void {

        this.store.dispatch(new Register(this.form.value))
            .pipe(take(1))
            .subscribe(
                () => {
                this.success = true;
                this.result.emit();
            },
            error => console.log(error)
        );
    }

}
