import {Activity} from '../activity/activity.model';
import {Participation} from 'core/api/participation/participation.model';

export interface Pot {
  readonly id: string;
  readonly title?: string;
  readonly description?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly activity?: Activity;
  readonly participations?: Participation[];
}
