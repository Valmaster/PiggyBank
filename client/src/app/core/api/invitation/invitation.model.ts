import {Activity} from '../activity/activity.model';

export interface Invitation {
  readonly id: string;
  readonly code: string;
  readonly expiresAt?: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly activity: Activity;
}
