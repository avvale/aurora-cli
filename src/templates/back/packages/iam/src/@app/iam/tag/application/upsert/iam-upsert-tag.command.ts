import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpsertTagCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name?: string;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
