import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Pot} from 'core/api/pot/pot.model';
import {Activity} from 'core/api/activity/activity.model';
import {Participation} from 'core/api/participation/participation.model';
import {Select, Store} from '@ngxs/store';
import {ActivitiesState} from 'core/store/activities/activities.state';
import {UserState} from 'core/store/user/user.state';
import {DeleteParticipation} from 'core/store/activities/participations/participations.actions';
import {DeletePot} from 'core/store/activities/pots/pots.actions';
import {User} from 'core/api/user/user.model';

@Component({
    selector: 'activity-pot-export-pdf',
    templateUrl: './pot-export-pdf.component.html'
})
export class PotExportPdfComponent implements OnInit {

    @Select(UserState) currentUser$: Observable<User>;

    @Input() potId: string;
    @Input() activityId: string;

    currentUserId: string;

    pot$: Observable<Pot>;
    activity$: Observable<Activity>;
    participations$: Observable<Participation[]>;
    amountTotal$: Observable<number>;

    updatePot: Pot;
    updateParticipation: Participation;
    addParticipation: boolean;

    constructor(
        private store: Store,
    ) {
    }

    ngOnInit() {
        if (!this.potId || !this.activityId) {
            return;
        }
        this.pot$ = this.store.select(ActivitiesState.pot(this.potId));
        this.activity$ = this.store.select(ActivitiesState.complete(this.activityId));
        this.participations$ = this.store.select(ActivitiesState.potParticipations(this.potId));
        this.currentUserId = this.store.selectSnapshot(UserState).id;
        this.amountTotal$ = this.store.select(ActivitiesState.totalAmountPotParticipations(this.potId));

    }

    total(participations?: Participation[]): number {
        return participations && participations.length >= 0
            ? participations.map(p => p.amount).reduce((acc, amount) => acc + amount)
            : 0;
    }

    toggleUpdatePot(pot?: Pot): void {
        this.updatePot = pot;
    }

    toggleAddParticipation(): void {
        this.addParticipation = !this.addParticipation;
    }

    toggleUpdateParticipation(participation?: Participation): void {
        this.updateParticipation = participation;
    }

    deletePot(pot: Pot): void {
        confirm('Etes vous sur de vouloir supprimer le pot commun ' + pot.title + '?')
            ? this.store.dispatch(new DeletePot(this.activityId, pot.id))
            : null;
    }

    deleteParticipation(participation: Participation): void {
        confirm('Etes vous sur de vouloir supprimer votre participation de ' + participation.amount + '€ ?')
            ? this.store.dispatch(new DeleteParticipation(this.activityId, participation.id))
            : null;
    }
}
