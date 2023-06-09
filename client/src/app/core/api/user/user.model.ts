import {Activity} from 'core/api/activity/activity.model';
import {UserRoleEnum} from 'core/api/user/enums/user-role.enum';
import {ActivityUserJunction} from 'core/api/activity-user-junction/activity-user-junction.model';

export interface User {
  readonly id: string;
  readonly email: string;
  readonly password: string;
  readonly username: string;
  readonly roles: UserRoleEnum[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly myActivities?: Activity[];
  readonly notifications?: Notification[];
  readonly activityUserJunctions?: ActivityUserJunction[];
}
