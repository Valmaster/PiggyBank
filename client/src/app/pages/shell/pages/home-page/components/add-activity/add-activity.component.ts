import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngxs/store';
import {Validators} from 'core/utilities/validators';
import {AddActivity} from 'core/store/activities/activities.actions';

@Component({
    selector: 'homepage-add-activity',
    templateUrl: './add-activity.component.html',
})
export class AddActivityComponent {
    @Output() cancel = new EventEmitter();
    public form: FormGroup;
    public pending: boolean;
    public error: string;

    constructor(private fb: FormBuilder, private store: Store) {
        this.form = this.fb.group({
            title: ['', [
                Validators.required(),
            ]],
            description: [''],
        });
    }

    public submit(): void {
        this.pending = true;
        this.store.dispatch(new AddActivity(this.form.value))
            .subscribe(
                () => this.cancel.emit(),
                error => this.error = error
            ).add(() => this.pending = false);
    }
}
