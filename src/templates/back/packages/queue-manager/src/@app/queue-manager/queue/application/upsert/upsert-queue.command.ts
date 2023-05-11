import { CQMetadata } from '@aurorajs.dev/core';

export class UpsertQueueCommand
{
    constructor(
        public readonly payload: {
            id: string;
            prefix?: string;
            name?: string;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}