import {User} from '../user/user.model';
import {ActivityStateEnum} from './enums/activity-state.enum';
import {Invitation} from '../invitation/invitation.model';
import {Pot} from '../pot/pot.model';
import {Participation} from 'core/api/participation/participation.model';
import {ActivityUserJunction} from 'core/api/activity-user-junction/activity-user-junction.model';

export interface Activity {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly state: ActivityStateEnum;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly user: User;
  readonly pots?: Pot[];
  readonly invitations?: Invitation[];
  readonly participations?: Participation[];
  readonly activityUserJunctions?: ActivityUserJunction[];
}
