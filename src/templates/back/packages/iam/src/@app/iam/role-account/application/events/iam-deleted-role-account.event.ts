export class IamDeletedRoleAccountEvent
{
    constructor(
        public readonly roleId: string,
        public readonly accountId: string,
    ) {}
}
