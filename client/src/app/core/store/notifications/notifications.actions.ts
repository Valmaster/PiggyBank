import {NotificationsInput} from 'core/api/notification/inputs/notifications.input';
import {Notification} from 'core/api/notification/notification.model';

export class GetNotifications{
  static readonly type = '[Notif] Get';
  constructor(public input: NotificationsInput) {}
}

export class ReadNotification{
  static readonly type = '[Notif] Read';
  constructor(public id: string) {}
}

export class PatchNotification{
  static readonly type = '[Notif] Patch';
  constructor(public notification: Notification) {
  }
}


