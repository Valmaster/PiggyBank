import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngxs/store';
import {Validators} from 'core/utilities/validators';
import {Participation} from 'core/api/participation/participation.model';
import {UpdateParticipation} from 'core/store/activities/participations/participations.actions';

@Component({
    selector: 'activity-update-participation',
    templateUrl: './update-participation.component.html'
})
export class UpdateParticipationComponent implements OnInit{
    @Output() cancel = new EventEmitter();
    @Input() participation: Participation;
    public form: FormGroup;
    public pending: boolean;
    public error: string;

    constructor(private fb: FormBuilder, private store: Store) {
        this.form = this.fb.group({
            amount: ['', [
                Validators.required(),
            ]],
            description: [''],
        });
    }

    ngOnInit() {
        if (!this.participation) return this.cancel.emit();
        this.form.patchValue({
            amount: this.participation.amount,
            description: this.participation.description,
        });
    }

    public submit(): void {
        this.error = null;
        this.pending = true;
        this.store.dispatch(new UpdateParticipation(this.participation.id, this.form.value))
            .subscribe(
                () => this.cancel.emit(),
                error => this.error = error
            ).add(() => this.pending = false);
    }
}
