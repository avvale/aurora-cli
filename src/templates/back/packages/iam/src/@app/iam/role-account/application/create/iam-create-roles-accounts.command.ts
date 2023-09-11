import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreateRolesAccountsCommand
{
    constructor(
        public readonly payload: {
            roleId: string;
            accountId: string;
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
