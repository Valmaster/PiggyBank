export class AddActivityUserJunction{
    static readonly type = '[Activity User Junctions] Add One';
    constructor(public invitationCode: string) {}
}

export class DeleteActivityUserJunction{
    static readonly type = '[Activity User Junctions] Delete One';
    constructor(public id: number) {}
}

export class RemoveActivityUserJunctionByActivityId {
    static readonly type = '[Activity User Junctions] Remove One By Activity Id';
    constructor(public activityId: string) {}
}
