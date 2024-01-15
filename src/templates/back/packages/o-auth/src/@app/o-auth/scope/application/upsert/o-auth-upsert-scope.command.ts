import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthUpsertScopeCommand
{
    constructor(
        public readonly payload: {
            id: string;
            code?: string;
            name?: string;
            roleIds?: string[];
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
