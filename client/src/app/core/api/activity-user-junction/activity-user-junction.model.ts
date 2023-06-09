import {User} from 'core/api/user/user.model';
import {Activity} from 'core/api/activity/activity.model';

export interface ActivityUserJunction {
    readonly id: number;
    readonly user: User;
    readonly activity: Activity;
    readonly createdAt: Date;
}
