import {ActivityStateEnum} from '../enums/activity-state.enum';

export interface UpdateActivityInput {
    readonly title?: string;
    readonly description?: string;
    readonly state?: ActivityStateEnum;
}
