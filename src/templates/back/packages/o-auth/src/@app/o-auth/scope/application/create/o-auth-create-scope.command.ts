import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthCreateScopeCommand
{
    constructor(
        public readonly payload: {
            id: string;
            code: string;
            name: string;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
