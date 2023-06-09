import {AddParticipationInput} from 'core/api/participation/inputs/add-participation.input';
import {UpdateParticipationInput} from 'core/api/participation/inputs/update-participation.input';

export class AddParticipation {
    static readonly type = '[Participation] Add Participation';
    constructor(public activityId: string, public potId: string, public input: AddParticipationInput) {}
}

export class UpdateParticipation {
    static readonly type = '[Participation] Update Participation';
    constructor(public id: string, public input: UpdateParticipationInput) {}
}

export class DeleteParticipation {
    static readonly type = '[Participation] Delete Participation';
    constructor(public activityId: string, public id: string) {}
}

export class RemoveParticipationsByActivityId {
    static readonly type = '[Participation] Remove By Activity Id';
    constructor(public activityId: string) {}
}

export class RemoveParticipationsByUserId {
    static readonly type = '[Participation] Remove By User Id';
    constructor(public userId: string) {}
}

