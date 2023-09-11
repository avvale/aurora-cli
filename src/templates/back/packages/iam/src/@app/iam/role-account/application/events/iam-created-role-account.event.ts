export class IamCreatedRoleAccountEvent
{
    constructor(
        public readonly roleId: string,
        public readonly accountId: string,
    ) {}
}
