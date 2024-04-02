export class IamUpdatedAndIncrementedRoleAccountEvent
{
    constructor(
        public readonly roleId: string,
        public readonly accountId: string,
    ) {}
}
