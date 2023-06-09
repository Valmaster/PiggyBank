import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Validators} from 'core/utilities/validators';
import {Store} from '@ngxs/store';
import {AddParticipation} from 'core/store/activities/participations/participations.actions';

@Component({
    selector: 'activity-add-participation',
    templateUrl: './add-participation.component.html'
})

export class AddParticipationComponent{
    @Output() cancel = new EventEmitter();
    @Input() potId: string;
    @Input() activityId: string;
    public form: FormGroup;
    public pending: boolean;
    public error: string;

    constructor(
        private fb: FormBuilder,
        private store: Store
    ) {
        this.form = this.fb.group({
            amount: ['', [
                Validators.required(),
            ]],
            description: ['', []],
        });
    }

    public submit(): void {
        this.pending = true;
        this.error = null;
        this.store.dispatch(new AddParticipation(this.activityId, this.potId, this.form.value))
            .subscribe(
                () => this.cancel.emit(),
                error => this.error = error,
            ).add(() => this.pending = false);

    }
}
