import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InvitationResolver} from 'core/api/invitation/invitation.resolver';
import {take} from 'rxjs/operators';

@Component({
    selector: 'activity-add-invitation',
    templateUrl: './add-invitation.component.html'
})

export class AddInvitationComponent implements OnInit {
    @Output() cancel = new EventEmitter();
    @Input() activityId: string;
    public code: string;

    constructor(private invitationResolver: InvitationResolver) {
    }

    ngOnInit() {
        if (!this.activityId) {
            return;
        }
        this.invitationResolver.addInvitation(this.activityId)
            .pipe(take(1))
            .subscribe(({data}) => {
                if (data && data.addInvitation) {
                    this.code = data.addInvitation.code;
                }
            });
    }

    getLink(): string {
        return this.code
            ? window.location.origin + '/join/' + this.code
            : 'chargement...';
    }

    copy(): void {
        if (!this.code) return;
        navigator.clipboard.writeText(this.getLink());
    }

}
