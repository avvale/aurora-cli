import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';

export class UpdateUsersCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            accountId?: string;
            name?: string;
            surname?: string;
            avatar?: string;
            mobile?: string;
            langId?: string;
            username?: string;
            password?: string;
            rememberToken?: string;
            meta?: any;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}