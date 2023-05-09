import { CQMetadata } from '@aurora-ts/core';

export class CreateQueueCommand
{
    constructor(
        public readonly payload: {
            id: string;
            prefix: string;
            name: string;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}