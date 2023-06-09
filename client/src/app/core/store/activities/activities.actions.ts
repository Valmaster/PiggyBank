import {ActivitiesInput} from 'core/api/activity/inputs/activities.input';
import {AddActivityInput} from 'core/api/activity/inputs/add-activity.input';
import {UpdateActivityInput} from 'core/api/activity/inputs/update-activity.input';

export class GetActivity {
  static readonly type = '[Activities] Get One';
  constructor(public id: string) {}
}

export class GetManyActivities {
  static readonly type = '[Activities] Get many';
  constructor(public input: ActivitiesInput) {}
}

export class AddActivity {
  static readonly type = '[Activities] Add One';
  constructor(public input: AddActivityInput) {}
}

export class UpdateActivity {
  static readonly type = '[Activities] Update One';
  constructor(public id: string, public input: UpdateActivityInput) {}
}

export class DeleteActivity {
  static readonly type = '[Activities] Delete One';
  constructor(public id: string) {}
}

export class RemoveActivityById {
  static readonly type = '[Activities] Remove One By Id';
  constructor(public id: string) {}
}

export class PushPartialPot {
  static readonly type = '[Activities] Push Partial Pot';
  constructor(public activityId: string, public id: string) {}
}

export class RemovePartialPot {
    static readonly type = '[Activities] Remove Partial Pot';
    constructor(public activityId: string, public id: string) {}
}

export class PushPartialParticipation {
    static readonly type = '[Activities] Push Partial Participation';
    constructor(public activityId: string, public amount: number) {}
}

export class RemovePartialParticipation {
    static readonly type = '[Activities] Remove Partial Participation';
    constructor(public activityId: string, public amount: number) {}
}

