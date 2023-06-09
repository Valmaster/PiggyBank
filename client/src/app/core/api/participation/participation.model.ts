import {Pot} from 'core/api/pot/pot.model';
import {User} from 'core/api/user/user.model';
import {Activity} from 'core/api/activity/activity.model';

export interface Participation {
    readonly id?: string;
    readonly amount: number;
    readonly description?: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly pot?: Pot;
    readonly user?: User;
    readonly activity?: Activity;
}
