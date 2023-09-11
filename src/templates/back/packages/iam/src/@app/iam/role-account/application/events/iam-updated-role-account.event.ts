export class IamUpdatedRoleAccountEvent
{
    constructor(
        public readonly roleId: string,
        public readonly accountId: string,
    ) {}
}
