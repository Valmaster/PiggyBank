import {Activity} from 'core/api/activity/activity.model';
import {Pot} from 'core/api/pot/pot.model';
import {Participation} from 'core/api/participation/participation.model';
import {ActivityUserJunction} from 'core/api/activity-user-junction/activity-user-junction.model';

export interface ActivitiesModel {
  readonly total: number;
  readonly hasMore: boolean;
  readonly partials: Activity[];
  readonly completes: Activity[];
  readonly pots: Pot[];
  readonly participations: Participation[];
  readonly activityUserJunctions: ActivityUserJunction[];
}
