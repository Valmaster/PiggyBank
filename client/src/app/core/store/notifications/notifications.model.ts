import {Notification} from '../../api/notification/notification.model';

export interface NotificationsModel {
  readonly total: number;
  readonly hasMore: boolean;
  readonly items: Notification[];
}
