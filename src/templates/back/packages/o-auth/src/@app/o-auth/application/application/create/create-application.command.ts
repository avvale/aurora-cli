import { CQMetadata } from '@aurora-ts/core';

export class CreateApplicationCommand
{
    constructor(
        public readonly payload: {
            id: string;
            code: string;
            name: string;
            secret: string;
            isMaster: boolean;
            clientIds?: string[];
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}