import { CQMetadata } from '@aurorajs.dev/core';

export class UpsertUserCommand
{
    constructor(
        public readonly payload: {
            id: string;
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
        public readonly cQMetadata?: CQMetadata,
    ) {}
}