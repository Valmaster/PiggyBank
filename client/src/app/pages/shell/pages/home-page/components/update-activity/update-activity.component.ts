import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngxs/store';
import {Validators} from 'core/utilities/validators';
import {UpdateActivity} from 'core/store/activities/activities.actions';
import {Activity} from 'core/api/activity/activity.model';

@Component({
    selector: 'homepage-update-activity',
    templateUrl: './update-activity.component.html',
})
export class UpdateActivityComponent implements OnInit{
    @Output() cancel = new EventEmitter();
    @Input() activity: Activity;
    public form: FormGroup;
    public pending: boolean;
    public error: string;

    constructor(private fb: FormBuilder, private store: Store) {
        this.form = this.fb.group({
            title: ['', [
                Validators.required(),
                Validators.maxLength(80)
            ]],
            description: [''],
        });
    }

    ngOnInit() {
        if (!this.activity) return this.cancel.emit();
        this.form.patchValue({
            title: this.activity.title,
            description: this.activity.description,
        });
    }

    public submit(): void {
        this.error = null;
        this.pending = true;
        this.store.dispatch(new UpdateActivity(this.activity.id, this.form.value))
            .subscribe(
                () => this.cancel.emit(),
                error => this.error = error
            ).add(() => this.pending = false);
    }
}
