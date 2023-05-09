import { CQMetadata } from '@aurora-ts/core';

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