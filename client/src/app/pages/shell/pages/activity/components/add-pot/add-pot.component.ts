import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngxs/store';
import {Validators} from 'core/utilities/validators';
import {AddPot} from 'core/store/activities/pots/pots.actions';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';

@Component({
    selector: 'activity-add-pot',
    templateUrl: './add-pot.component.html'
})
export class AddPotComponent {
    @Output() cancel = new EventEmitter();
    public form: FormGroup;
    public pending: boolean;
    public error: string;
    @Input() activityId: string;

    constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute) {
        this.form = this.fb.group({
            title: ['', [
                Validators.required(),
            ]],
            description: [''],
        });
    }

    public submit(): void {
        this.pending = true;
        this.store.dispatch(new AddPot(this.activityId, this.form.value))
            .pipe(take(1))
            .subscribe(
                () => this.cancel.emit(),
                error => this.error = error
            ).add(() => this.pending = false);
    }
}
