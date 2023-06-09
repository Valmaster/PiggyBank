import {PaginatedOutput} from '../../paginated.output';
import {Notification} from '../notification.model';

export interface GetNotificationsOutput extends PaginatedOutput<Notification>{}
