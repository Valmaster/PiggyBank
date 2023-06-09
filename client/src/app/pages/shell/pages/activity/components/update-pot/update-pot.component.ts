import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngxs/store';
import {Validators} from 'core/utilities/validators';
import {UpdatePot} from 'core/store/activities/pots/pots.actions';
import {Pot} from 'core/api/pot/pot.model';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'activity-update-pot',
    templateUrl: './update-pot.component.html'
})
export class UpdatePotComponent implements OnInit{
    @Output() cancel = new EventEmitter();
    @Input() pot: Pot;
    public form: FormGroup;
    public pending: boolean;
    public error: string;

    constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute) {
        this.form = this.fb.group({
            title: ['', [
                Validators.required(),
                Validators.maxLength(80)
            ]],
            description: [''],
        });
    }

    ngOnInit() {
        if (!this.pot) return this.cancel.emit();
        this.form.patchValue({
            title: this.pot.title,
            description: this.pot.description,
        });
    }

    public submit(): void {
        this.error = null;
        this.pending = true;
        this.store.dispatch(new UpdatePot(this.pot.id, this.form.value))
            .subscribe(
                () => this.cancel.emit(),
                error => this.error = error
            ).add(() => this.pending = false);
    }
}