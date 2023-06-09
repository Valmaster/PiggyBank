import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Pot} from 'core/api/pot/pot.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of, Subject} from 'rxjs';
import {GetActivity, GetManyActivities, UpdateActivity} from 'core/store/activities/activities.actions';
import {UserState} from 'core/store/user/user.state';
import {User} from 'core/api/user/user.model';
import {Activity} from 'core/api/activity/activity.model';
import {ActivitiesState} from 'core/store/activities/activities.state';
import {catchError, switchMap, take, tap} from 'rxjs/operators';
import {ActivityStateEnum} from 'core/api/activity/enums/activity-state.enum';
import {Participation} from 'core/api/participation/participation.model';
import {DeleteActivityUserJunction} from 'core/store/activities/activity-user-junctions/activity-user-junctions.actions';
import {ActivityUserJunction} from 'core/api/activity-user-junction/activity-user-junction.model';
import * as jsPDF from 'jspdf';

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html',
    styleUrls: ['/src/assets/styles/pages/activity.css'],
})
export class ActivityComponent implements OnDestroy {
    public popup: string;

    private destroy$ = new Subject();

    @Select(UserState) currentUser$: Observable<User>;

    @ViewChild('content') content: ElementRef;

    pots$: Observable<Pot[]>;
    activity$: Observable<Activity>;
    participations$: Observable<Participation[]>;
    // junctions$: Observable<ActivityUserJunction[]>;

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private router: Router
    ) {

        route.params.pipe(
            take(1),
            switchMap((params: any) => store.dispatch(new GetActivity(params.id)).pipe(
                tap(() => {
                    this.pots$ = store.select(ActivitiesState.pots(params.id));
                    this.activity$ = store.select(ActivitiesState.complete(params.id));
                    this.participations$ = store.select(ActivitiesState.participations(params.id));
                    // this.junctions$ = store.select(ActivitiesState.junctions(params.id));
                }),
                catchError(e => of(router.navigate(['/404'])))
            ))
        ).subscribe();


        store.select(ActivitiesState.total).pipe(
            take(1))
            .subscribe((total: number) => {
                if (total === null) {
                    store.dispatch(new GetManyActivities({take: 30, skip: 0}));
                }
            });
    }

    changeState(activity: Activity): void {
        this.store.dispatch(new UpdateActivity(activity.id, {
            state: activity.state === ActivityStateEnum.Open
                ? ActivityStateEnum.Closed
                : ActivityStateEnum.Open
        }));
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    togglePopUp(popup: string) {
        this.popup = popup === this.popup ? null : popup;
    }

    deleteGuest(junction: ActivityUserJunction): void {
        if (confirm(`Etes-vous sûr de vouloir supprimer ${junction.user.username} de l'activité ?\nCela effacera également ses participations`)) {
            this.store.dispatch(new DeleteActivityUserJunction(junction.id))
                .pipe(take(1))
                .subscribe();
        }
    }

    leaveActivity(junction: ActivityUserJunction): void {
        if (confirm(`Etes-vous sûr de vouloir quitter l'activité`)) {
            this.store.dispatch(new DeleteActivityUserJunction(junction.id))
                .pipe(take(1))
                .subscribe();
        }
    }

    public downloadPDF() {
        const doc = new jsPDF();

        const specialElementHandlers = {
            '#editor'(element, renderer) {
                return true;
            }
        };

        const content = this.content.nativeElement;

        doc.fromHTML(content.innerHTML, 15, 15, {
            width: 190,
            elementHandlers: specialElementHandlers
        });

        doc.save('activite.pdf');
    }
}
