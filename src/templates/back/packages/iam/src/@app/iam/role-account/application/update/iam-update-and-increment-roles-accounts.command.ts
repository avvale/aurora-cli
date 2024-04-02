import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamUpdateAndIncrementRolesAccountsCommand
{
    constructor(
        public readonly payload: {
            roleId?: string;
            accountId?: string;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
