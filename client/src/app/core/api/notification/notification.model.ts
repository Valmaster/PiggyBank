import {NotificationTypeEnum} from './enums/notification-type.enum';
import {User} from '../user/user.model';

export interface Notification {
  readonly id: string;
  readonly type: NotificationTypeEnum;
  readonly message: string;
  readonly relatedId?: string;
  readonly readAt?: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly user: User;
}
