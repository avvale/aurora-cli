import { CQMetadata } from '@aurorajs.dev/core';

export class CreateQueuesCommand
{
    constructor(
        public readonly payload: {
            id: string;
            prefix: string;
            name: string;
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}