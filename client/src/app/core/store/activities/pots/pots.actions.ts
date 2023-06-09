import {AddPotInput} from 'core/api/pot/inputs/add-pot.input';
import {UpdatePotInput} from 'core/api/pot/inputs/update-pot.input';
import {AddParticipationInput} from 'core/api/participation/inputs/add-participation.input';
import {UpdateParticipationInput} from 'core/api/participation/inputs/update-participation.input';

export class AddPot {
    static readonly type = '[Pots] Add One';
    constructor(public activityId: string, public input: AddPotInput) {
    }
}

export class UpdatePot {
    static readonly type = '[Pots] Update One';
    constructor(public id: string, public input: UpdatePotInput) {
    }
}

export class DeletePot {
    static readonly type = '[Pots] Delete One';
    constructor(public activityId: string, public id: string) {
    }
}

export class RemovePotsByActivityId {
    static readonly type = '[Pots] Remove By Activity Id';
    constructor(public activityId: string) {}
}
